'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmail from '@/components/emails/ContactEmail';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Instancia opcional de Rate Limiter (solo si Upstash está configurado)
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = (upstashUrl && upstashToken)
  ? new Redis({ url: upstashUrl, token: upstashToken })
  : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
    })
  : null;

// Schema de validación
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z.string().optional().default('No proporcionado'),
  company: z.string().optional().default('No especificada'),
  service: z.string().optional().default('General'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export async function sendContactEmail(formData: FormData) {
  try {
    // 1. Rate Limiting (si está configurado Upstash)
    if (ratelimit) {
      try {
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
        const { success } = await ratelimit.limit(`ratelimit_contact_${ip}`);
        
        if (!success) {
          console.warn(`[RATE LIMIT] IP ${ip} bloqueada temporalmente.`);
          return { 
            success: false, 
            error: 'Has enviado demasiados mensajes. Por favor, intenta de nuevo en 1 hora.' 
          };
        }
      } catch (rlErr) {
        console.warn('[RATE LIMIT] Advertencia al validar rate limit:', rlErr);
      }
    }

    // 2. Extraer datos del formulario
    const rawData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || undefined,
      company: (formData.get('company') as string) || undefined,
      service: (formData.get('service') as string) || undefined,
      message: (formData.get('message') as string) || '',
    };

    // 3. Validación estricta con Zod
    const validatedData = contactSchema.parse(rawData);

    // 4. Guardar en Base de Datos (Supabase si las variables están presentes)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      try {
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
        }
      } catch (dbErr) {
        console.warn('Supabase no configurado o error al insertar:', dbErr);
      }
    }

    // 5. Envío de correo a la bandeja de Infocod
    const targetEmail = process.env.CONTACT_EMAIL || 'infocod.codes@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Infocod Contacto <onboarding@resend.dev>';

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no está configurada.');
      return { 
        success: false, 
        error: 'El servicio de correo no está disponible en este momento. Por favor contáctanos directamente a infocod.codes@gmail.com.' 
      };
    }

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [targetEmail],
      replyTo: validatedData.email,
      subject: `Nuevo mensaje de ${validatedData.name} - Infocod`,
      react: ContactEmail({ 
        name: validatedData.name, 
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        service: validatedData.service,
        message: validatedData.message,
      }),
    });

    if (error) {
      console.error('Resend Error:', error);
      return { 
        success: false, 
        error: 'Hubo un error al enviar el mensaje. Por favor contáctanos directamente a infocod.codes@gmail.com.' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Validation or Server Error:', error);
    return { success: false, error: 'Datos inválidos o error interno.' };
  }
}
