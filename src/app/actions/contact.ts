'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createClient } from '@/utils/supabase/server';

// Inicialización diferida para evitar errores de arranque si faltan variables de entorno
function getRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const redis = new Redis({ url, token });
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
    });
  } catch (err) {
    console.warn('[RATE LIMIT] Advertencia al configurar Redis:', err);
    return null;
  }
}

function createSmtpTransporter() {
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '');

  if (!user || !pass) return null;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return { user, transporter };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateContactHtml({
  name,
  email,
  phone,
  company,
  service,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : '';
  const safeCompany = company ? escapeHtml(company) : '';
  const safeService = service ? escapeHtml(service) : '';
  const safeMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nuevo Lead - Infocod</title>
</head>
<body style="background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px 0; margin: 0;">
  <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 28px 32px; border-bottom: 3px solid #4F8EF7;">
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Nuevo mensaje de contacto</h1>
      <p style="color: #94a3b8; margin: 6px 0 0; font-size: 14px;">Enviado desde el formulario web de Infocod</p>
    </div>
    
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px; font-weight: 600;">Nombre:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Correo:</td>
          <td style="padding: 8px 0; color: #4F8EF7; font-size: 15px; font-weight: 600;"><a href="mailto:${safeEmail}" style="color: #4F8EF7; text-decoration: none;">${safeEmail}</a></td>
        </tr>
        ${safePhone && phone !== 'No proporcionado' ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Teléfono:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 15px;"><a href="tel:${safePhone}" style="color: #0f172a; text-decoration: none;">${safePhone}</a></td>
        </tr>` : ''}
        ${safeCompany && company !== 'No especificada' ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Empresa:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 15px;">${safeCompany}</td>
        </tr>` : ''}
        ${safeService && service !== 'General' ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Servicio:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 15px;">${safeService}</td>
        </tr>` : ''}
      </table>
      
      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px;">Mensaje del cliente:</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #4F8EF7; padding: 16px 20px; border-radius: 4px; color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div>
      </div>
    </div>
    
    <div style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">Este correo fue enviado a infocod.codes@gmail.com.</p>
    </div>
  </div>
</body>
</html>`;
}

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
    // 1. Rate Limiting (si Upstash está configurado)
    const ratelimit = getRateLimiter();
    if (ratelimit) {
      try {
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
        const { success } = await ratelimit.limit(`ratelimit_contact_${ip}`);
        
        if (!success) {
          console.warn(`[RATE LIMIT] IP ${ip} bloqueada temporalmente.`);
          return { 
            success: false, 
            error: 'Has enviado demasiados mensajes. Por favor, intenta de nuevo más tarde.' 
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
    const parsed = contactSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Por favor revisa los datos del formulario.',
      };
    }
    const validatedData = parsed.data;

    // 4. Guardar en Base de Datos (Supabase si las credenciales están configuradas)
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
        console.warn('Supabase no disponible o error al insertar:', dbErr);
      }
    }

    // 5. Envío de correo vía SMTP (Gmail / Nodemailer)
    const smtp = createSmtpTransporter();
    if (!smtp) {
      console.warn('Configuración SMTP incompleta: faltan SMTP_USER y SMTP_PASS.');
      return { 
        success: false, 
        error: 'El servidor de correos SMTP no está configurado (faltan SMTP_USER y SMTP_PASS en las variables de entorno). Escríbenos directamente a infocod.codes@gmail.com.' 
      };
    }

    const targetEmail =
      process.env.CONTACT_EMAIL ||
      process.env.CONTACT_EMAIL_TO ||
      'infocod.codes@gmail.com';

    const emailHtml = generateContactHtml({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      service: validatedData.service,
      message: validatedData.message,
    });

    const emailText = `Nuevo lead desde Infocod:
Nombre: ${validatedData.name}
Correo: ${validatedData.email}
Teléfono: ${validatedData.phone || 'No proporcionado'}
Empresa: ${validatedData.company || 'No especificada'}
Servicio: ${validatedData.service || 'General'}

Mensaje:
${validatedData.message}`;

    const cleanSubjectName = validatedData.name.replace(/[\r\n]+/g, ' ').trim();

    try {
      await smtp.transporter.sendMail({
        from: `"Infocod Contacto" <${smtp.user}>`,
        to: targetEmail,
        replyTo: validatedData.email,
        subject: `Nuevo mensaje de ${cleanSubjectName} - Infocod`,
        html: emailHtml,
        text: emailText,
      });
    } catch (smtpError) {
      console.error('SMTP Send Error:', smtpError);
      return {
        success: false,
        error: 'No se pudo enviar el mensaje en este momento. Por favor intenta más tarde o escríbenos a infocod.codes@gmail.com.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Validation or Server Error:', error);
    return { 
      success: false, 
      error: 'Datos inválidos o error interno en el servidor.' 
    };
  }
}
