"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './ServicesAccordion.module.css';
import Image from 'next/image';

interface Service {
  title: string;
  icon: React.ReactNode;
}

interface ServicesAccordionProps {
  services: Service[];
}

export default function ServicesAccordion({ services }: ServicesAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Paleta Sci-Fi / Cyber (Tonos muy oscuros con mucha profundidad)
  const premiumColors = [
    '#0B0C10', // Muy oscuro
    '#0F172A', // Slate dark
    '#170F1C', // Purple dark
    '#0A192F', // Navy
    '#13151A', // Gunmetal
    '#1A0B2E', // Deep purple (coincide con el hero)
    '#0D1117', // Github dark
    '#120E15', // Dark violet
    '#081214', // Deep teal
  ];

  const brandColors = [
    'var(--color-brand-blue)',
    'var(--color-brand-green)',
    'var(--color-brand-purple)',
  ];

  const getServiceData = (title: string) => {
    switch (title) {
      case "Sitios Web": return {
        desc: "Diseño profesional y corporativo con arquitectura responsiva y SEO optimizado.",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
      };
      case "Sistemas Web": return {
        desc: "Software a medida para digitalizar y optimizar la gestión interna de tu empresa.",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      };
      case "Apps Móviles": return {
        desc: "Lleva tu negocio al bolsillo de tus clientes con apps nativas o multiplataforma.",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
      };
      case "Business Intelligence": return {
        desc: "Convierte tus datos en decisiones estratégicas con dashboards en tiempo real.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      };
      case "Inteligencia Artificial": return {
        desc: "Automatiza respuestas y optimiza procesos usando IA generativa y Machine Learning.",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
      };
      case "Automatización (RPA)": return {
        desc: "Elimina tareas manuales repetitivas interconectando tus sistemas actuales.",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
      };
      case "Cloud y DevOps": return {
        desc: "Migración, servidores seguros y escalabilidad en AWS, Google Cloud o Azure.",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      };
      case "Consultoría IT": return {
        desc: "Auditorías de código, arquitectura de software y asesoría tecnológica experta.",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      };
      case "Plataformas SaaS": return {
        desc: "Construimos tu producto digital desde cero, listo para comercializarse.",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      };
      default: return {
        desc: `Descubre cómo optimizamos tu negocio con ${title.toLowerCase()}.`,
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
      };
    }
  };

  useEffect(() => {
    // GSAP animations triggered on active index change
    const ctx = gsap.context(() => {
      // Elements of the newly active card
      const activeCard = document.querySelectorAll(`.${styles.card}`)[activeIndex];
      const img = activeCard.querySelector(`.${styles.bgImage}`);
      const textElements = activeCard.querySelectorAll(`.${styles.title}, .${styles.desc}, .${styles.btn}`);

      // Reset and animate image (subtle zoom out effect)
      gsap.fromTo(img, 
        { scale: 1.15, opacity: 0 }, 
        { scale: 1, opacity: 0.6, duration: 1.2, ease: 'power3.out' }
      );

      // Stagger text fade and slide up
      gsap.fromTo(textElements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className={styles.accordionContainer} ref={containerRef}>
      {services.map((service, index) => {
        const isActive = activeIndex === index;
        const data = getServiceData(service.title);
        const activeColor = brandColors[index % brandColors.length];
        
        return (
          <div 
            key={index} 
            className={`${styles.card} ${isActive ? styles.active : ''}`}
            style={{ backgroundColor: premiumColors[index % premiumColors.length] }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            {/* Imagen de fondo (solo visible y animada con GSAP cuando está activa) */}
            <div className={styles.bgImageContainer}>
              <Image 
                src={data.img}
                alt={service.title}
                fill
                style={{ objectFit: 'cover' }}
                className={`${styles.bgImage} ${isActive ? styles.bgImageActive : ''}`}
                unoptimized
              />
              <div className={styles.bgOverlay}></div>
            </div>

            {/* Ícono de la tarjeta */}
            <div className={styles.iconContainer} style={{ color: isActive ? activeColor : 'inherit' }}>
              {service.icon}
            </div>

            {/* Título Vertical en Desktop cuando está inactiva */}
            <div className={styles.verticalTitle}>
              {service.title}
            </div>

            {/* Título en móvil cuando está inactiva */}
            <div className={styles.mobileTitle}>
              {service.title}
            </div>

            {/* Contenido principal (solo visible si está activa) */}
            <div className={styles.contentContainer}>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>
                {data.desc}
              </p>
              <Link 
                href={`/servicios`} 
                className={styles.btn} 
                style={{ 
                  borderColor: activeColor, 
                  color: activeColor 
                }}
              >
                Ver servicio
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
