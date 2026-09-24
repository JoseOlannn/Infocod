'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmail from '@/components/emails/ContactEmail';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Crear instancia del Rate Limiter (Limita a 3 peticiones por hora por usuario)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
});

// Schema de validación
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export async function sendContactEmail(formData: FormData) {
  try {
    // 1. ESCUDO DE SEGURIDAD (Rate Limiting)
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
    
    // Verificamos si la IP ha excedido el límite
    const { success } = await ratelimit.limit(`ratelimit_contact_${ip}`);
    
    if (!success) {
      console.warn(`[RATE LIMIT] IP ${ip} bloqueada temporalmente por exceso de peticiones.`);
      return { 
        success: false, 
        error: 'Has enviado demasiados mensajes de prueba. Por favor, intenta de nuevo en 1 hora.' 
      };
    }

    // 2. Extraer datos
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // 3. Validación estricta con Zod
    const validatedData = contactSchema.parse(data);

    // 4. Guardar en Base de Datos (Supabase)
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
        }
      ]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      // No detenemos la ejecución, intentamos mandar el email de todas formas
    }

    // 5. Envío de correo
    const { error } = await resend.emails.send({
      from: 'Infocod Contacto <onboarding@resend.dev>', // Resend default test email
      to: ['alexadominguez049@gmail.com'], 
      subject: `Nuevo Mensaje de ${validatedData.name}`,
      react: ContactEmail({ 
        name: validatedData.name, 
        email: validatedData.email, 
        message: validatedData.message 
      }),
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: 'Hubo un error enviando el mensaje. Inténtalo más tarde.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Validation or Server Error:', error);
    return { success: false, error: 'Datos inválidos o error interno.' };
  }
}
