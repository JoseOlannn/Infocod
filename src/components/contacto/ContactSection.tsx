"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendContactEmail } from '@/app/actions/contact';
import styles from './ContactSection.module.css';
import CustomSelect from './CustomSelect';

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un correo válido'),
  phone: z.string().min(8, 'Ingresa un teléfono válido'),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecciona un servicio de interés'),
  message: z.string().min(10, 'El mensaje debe ser más detallado (min. 10 caracteres)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone || '');
      if (data.company) formData.append('company', data.company);
      formData.append('service', data.service || '');
      formData.append('message', data.message);

      const result = await sendContactEmail(formData);

      if (result && result.success) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 6000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result?.error || 'Ocurrió un error al enviar el mensaje. Escríbenos a infocod.codes@gmail.com.');
      }
    } catch (err: any) {
      console.error('Error al enviar formulario:', err);
      setSubmitStatus('error');
      setErrorMessage('Error al conectar con el servidor. Por favor intenta de nuevo o escríbenos directamente a infocod.codes@gmail.com.');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const elements = sectionRef.current?.querySelectorAll('.anim-up');
      
      if (elements) {
        gsap.from(elements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="contacto">
      <div className={styles.container}>
        
        <div className={styles.grid}>
          
          {/* COLUMNA IZQUIERDA: Textos y Contacto Directo */}
          <div className={styles.headerCol}>
            <h2 className={`${styles.hugeTitle} anim-up`}>
              Hablemos<br/>de tu<br/>proyecto.
            </h2>
            <p className={`${styles.subtitle} anim-up`}>
              Nuestro equipo está listo para asesorarte. Cuéntanos qué necesitas y te responderemos a la brevedad con una solución a medida.
            </p>

            <div className={`${styles.infoList} anim-up`}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Escríbenos</span>
                <a href="mailto:infocod.codes@gmail.com" className={styles.infoValue}>infocod.codes@gmail.com</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Llámanos</span>
                <a href="tel:+5219999999999" className={styles.infoValue}>+52 1 999 999 9999</a>
              </div>
            </div>

            <div className={`${styles.socialIcons} anim-up`}>
              <Link 
                href="https://www.linkedin.com/company/infocodmx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={24} />
              </Link>
              <Link 
                href="https://www.facebook.com/profile.php?id=61596698644304" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FacebookIcon size={24} />
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario Editorial */}
          <div className={styles.formCol}>
            <form onSubmit={handleSubmit(onSubmit)} className="anim-up">
              
              <div className={styles.inputGroupRow}>
                {/* Nombre */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nombre completo</label>
                  <input 
                    {...register('name')}
                    type="text" 
                    className={styles.input}
                    placeholder="Ej. Juan Pérez" 
                  />
                  {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </div>
                
                {/* Correo */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Correo electrónico</label>
                  <input 
                    {...register('email')}
                    type="email" 
                    className={styles.input}
                    placeholder="juan@empresa.com" 
                  />
                  {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
              </div>

              <div className={styles.inputGroupRow}>
                {/* Teléfono */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Teléfono / WhatsApp</label>
                  <input 
                    {...register('phone')}
                    type="text" 
                    className={styles.input}
                    placeholder="+52 1 999 999 9999" 
                  />
                  {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                </div>

                {/* Empresa */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Empresa (Opcional)</label>
                  <input 
                    {...register('company')}
                    type="text" 
                    className={styles.input}
                    placeholder="Nombre de tu empresa" 
                  />
                </div>
              </div>

              {/* Servicio de Interés */}
              <div className={styles.inputGroup} style={{ zIndex: 10 }}>
                <label className={styles.label}>¿En qué te podemos ayudar?</label>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={[
                        { group: 'Servicios', value: 'Desarrollo de Sitios Web', label: 'Desarrollo de Sitios Web' },
                        { group: 'Servicios', value: 'Desarrollo de Sistemas Web', label: 'Desarrollo de Sistemas Web' },
                        { group: 'Servicios', value: 'Apps Móviles', label: 'Apps Móviles' },
                        { group: 'Servicios', value: 'Business Intelligence', label: 'Business Intelligence' },
                        { group: 'Servicios', value: 'Inteligencia Artificial', label: 'Inteligencia Artificial' },
                        { group: 'Servicios', value: 'Automatización de Procesos', label: 'Automatización de Procesos' },
                        { group: 'Servicios', value: 'Cloud y DevOps', label: 'Cloud y DevOps' },
                        { group: 'Servicios', value: 'Consultoría Tecnológica', label: 'Consultoría Tecnológica' },
                        { group: 'Servicios', value: 'Plataformas SaaS', label: 'Plataformas SaaS' },
                        { group: 'Productos Propios', value: 'Agenda+', label: 'Agenda+' },
                        { group: 'Productos Propios', value: 'Masticod', label: 'Masticod' },
                        { group: 'Productos Propios', value: 'DataPilot', label: 'DataPilot' },
                        { group: 'Productos Propios', value: 'CVforge', label: 'CVforge' },
                        { group: 'Otros', value: 'Otro', label: 'Otro requerimiento' },
                      ]}
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={!!errors.service}
                    />
                  )}
                />
                {errors.service && <p className={styles.error}>{errors.service.message}</p>}
              </div>

              {/* Mensaje */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Cuéntanos los detalles</label>
                <textarea 
                  {...register('message')}
                  className={styles.textarea}
                  placeholder="Describe brevemente tu proyecto, necesidades o problemas..."
                ></textarea>
                {errors.message && <p className={styles.error}>{errors.message.message}</p>}
              </div>

              {/* Estados de Envío */}
              {submitStatus === 'success' && (
                <div style={{ backgroundColor: 'rgba(0, 201, 107, 0.1)', color: 'var(--color-brand-green)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  <CheckCircle2 size={20} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>¡Mensaje enviado! Nos pondremos en contacto contigo pronto.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  <AlertCircle size={20} />
                  <p style={{ fontSize: '0.9rem' }}>{errorMessage}</p>
                </div>
              )}

              {/* Botón */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje <ArrowRight size={20} />
                  </>
                )}
              </button>

            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
