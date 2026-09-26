"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesHorizontal.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  title: string;
  icon: React.ReactNode;
}

interface ServicesHorizontalProps {
  services: Service[];
}

export default function ServicesHorizontalScroll({ services }: ServicesHorizontalProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const brandColors = [
    "var(--color-brand-blue)",
    "var(--color-brand-green)",
    "var(--color-brand-purple)",
  ];

  const getServiceData = (title: string) => {
    switch (title) {
      case "Sitios Web": return "Diseño profesional y corporativo con arquitectura responsiva y SEO optimizado.";
      case "Sistemas Web": return "Software a medida para digitalizar y optimizar la gestión interna de tu empresa.";
      case "Apps Móviles": return "Lleva tu negocio al bolsillo de tus clientes con apps nativas o multiplataforma.";
      case "Business Intelligence": return "Convierte tus datos en decisiones estratégicas con dashboards en tiempo real.";
      case "Inteligencia Artificial": return "Automatiza respuestas y optimiza procesos usando IA generativa y Machine Learning.";
      case "Automatización (RPA)": return "Elimina tareas manuales repetitivas interconectando tus sistemas actuales.";
      case "Cloud y DevOps": return "Migración, servidores seguros y escalabilidad en AWS, Google Cloud o Azure.";
      case "Consultoría IT": return "Auditorías de código, arquitectura de software y asesoría tecnológica experta.";
      case "Plataformas SaaS": return "Construimos tu producto digital desde cero, listo para comercializarse.";
      default: return `Descubre cómo optimizamos tu negocio con ${title.toLowerCase()}.`;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const totalWidth = wrapper.scrollWidth - window.innerWidth;

      gsap.to(wrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Hover glow effect on cards
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      cards.forEach((card) => {
        const glow = card.querySelector(`.${styles.cardGlow}`);
        card.addEventListener("mouseenter", () => {
          gsap.to(glow, { opacity: 1, duration: 0.3 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(glow, { opacity: 0, duration: 0.3 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background gradients */}
      <div className={styles.bgGlow} />

      {/* Sticky Header inside the pinned section */}
      <div className={styles.header}>
        <h2 className={styles.title}>Lo que hacemos</h2>
        <p className={styles.subtitle}>
          Soluciones digitales creadas con precisión. 
          Desliza para explorar.
        </p>
      </div>

      <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
        <div className={styles.cardsTrack}>
          {services.map((service, idx) => {
            const color = brandColors[idx % brandColors.length];
            const desc = getServiceData(service.title);

            return (
              <div key={idx} className={styles.card}>
                <div 
                  className={styles.cardGlow} 
                  style={{ background: `radial-gradient(circle at top right, ${color}33, transparent 70%)` }} 
                />
                <div className={styles.cardBorder} style={{ borderColor: `${color}40` }} />
                
                <div className={styles.iconBox} style={{ color }}>
                  {service.icon}
                </div>
                
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{desc}</p>
                
                <div className={styles.cardFooter}>
                  <div className={styles.decorativeLine} style={{ backgroundColor: color }} />
                  <span className={styles.serviceNumber}>0{idx + 1}</span>
                </div>
              </div>
            );
          })}

          {/* Final CTA Card */}
          <div className={`${styles.card} ${styles.ctaCard}`}>
            <h3 className={styles.ctaTitle}>¿Tienes un proyecto en mente?</h3>
            <Link href="/servicios" className={styles.btn}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
