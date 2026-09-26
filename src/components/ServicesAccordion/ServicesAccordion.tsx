"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicesAccordion.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
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

  // Paleta Sci-Fi / Cyber original que el usuario prefería
  const premiumColors = [
    '#0B0C10',
    '#0F172A',
    '#170F1C',
    '#0A192F',
    '#13151A',
    '#1A0B2E',
    '#0D1117',
    '#120E15',
    '#081214',
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

  // 1. Entrance animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for entrance
      gsap.set(containerRef.current, { opacity: 0 });
      const cards = document.querySelectorAll(`.${styles.card}`);
      // Start cards from way above with 0 opacity
      gsap.set(cards, { opacity: 0, y: -150 });

      // Animate container fade in, then cards falling rapidly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Triggers when the top of the accordion is 80% down the screen
          toggleActions: "play none none none",
        }
      });

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.3,
      }).to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05, // Fast stagger to look like they are stacking rapidly
        ease: "back.out(1.5)" // Gives a little bounce as they fall into place
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Tab change animations
  useEffect(() => {
    // GSAP animations triggered on active index change
    const ctx = gsap.context(() => {
      // Find the active card
      const activeCard = document.querySelectorAll(`.${styles.card}`)[activeIndex];
      if (!activeCard || activeCard.classList.contains(styles.ctaCardWrapper)) return; // Skip animation if it's the CTA card

      const img = activeCard.querySelector(`.${styles.bgImage}`);
      const textElements = activeCard.querySelectorAll(`.${styles.title}, .${styles.desc}, .${styles.btn}`);

      // Reset and animate image
      if (img) {
        gsap.fromTo(img, 
          { scale: 1.15, opacity: 0 }, 
          { scale: 1, opacity: 0.6, duration: 1.2, ease: 'power3.out' }
        );
      }

      // Stagger text fade and slide up
      if (textElements.length) {
        gsap.fromTo(textElements,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
        );
      }

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
            {/* Imagen de fondo */}
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

            {/* Título Vertical en Desktop */}
            <div className={styles.verticalTitle}>
              {service.title}
            </div>

            {/* Título en móvil */}
            <div className={styles.mobileTitle}>
              {service.title}
            </div>

            {/* Contenido principal */}
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

      {/* FINAL CTA CARD inside accordion */}
      <div 
        className={`${styles.card} ${styles.ctaCardWrapper} ${activeIndex === services.length ? styles.active : ''}`}
        style={{ backgroundColor: '#130822' }}
        onMouseEnter={() => setActiveIndex(services.length)}
        onClick={() => setActiveIndex(services.length)}
      >
        {/* Ícono */}
        <div className={styles.iconContainer} style={{ color: 'var(--color-brand-blue)' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        {/* Título Vertical */}
        <div className={styles.verticalTitle} style={{ color: 'var(--color-brand-blue)' }}>
          Empezar Proyecto
        </div>
        
        <div className={styles.mobileTitle} style={{ color: 'var(--color-brand-blue)' }}>
          Empezar Proyecto
        </div>

        {/* Contenido */}
        <div className={styles.contentContainer}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>¿Tienes un proyecto en mente?</h3>
            <p className={styles.ctaDesc}>Hablemos sobre cómo podemos ayudarte a escalar tu negocio con tecnología a medida.</p>
            <Link href="/servicios" className={styles.ctaBtn}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
