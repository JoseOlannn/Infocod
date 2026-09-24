"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Home.module.css';
import { 
  Globe, Monitor, Smartphone, Database, Brain, Cpu, Cloud, Briefcase, Layers
} from 'lucide-react';
import ServicesAccordion from '@/components/ServicesAccordion/ServicesAccordion';
import ProductsZigZag from '@/components/ProductsZigZag/ProductsZigZag';
import ScrambleText from '@/components/ScrambleText/ScrambleText';
import PrinciplesFanScroll from '@/components/PrinciplesFanScroll/PrinciplesFanScroll';
import TechMarqueeSection from '@/components/TechMarqueeSection';
import CyberGrid from '@/components/CyberGrid/CyberGrid';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.1
      });

      // Hero Pinned "Fade + Zoom" (Esfumación + Zoom Agrandado) on Scroll
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.heroCenteredVideo}`,
          start: "top top",
          end: "+=70%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      });

      heroTl.to(`.${styles.centeredContentWrapper}`, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        ease: "power1.inOut",
      }, 0)
      .to(`.${styles.videoOverlay}`, {
        backgroundColor: "#050505",
        opacity: 0.98,
        ease: "none",
      }, 0);


      
      // Refresh ScrollTrigger positions after all dynamic components render
      const timer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ctaHeadlineText = "¿Listo para transformar tu negocio?";

  const services = [
    { title: "Sitios Web", icon: <Globe size={32} /> },
    { title: "Sistemas Web", icon: <Monitor size={32} /> },
    { title: "Apps Móviles", icon: <Smartphone size={32} /> },
    { title: "Business Intelligence", icon: <Database size={32} /> },
    { title: "Inteligencia Artificial", icon: <Brain size={32} /> },
    { title: "Automatización (RPA)", icon: <Cpu size={32} /> },
    { title: "Cloud y DevOps", icon: <Cloud size={32} /> },
    { title: "Consultoría IT", icon: <Briefcase size={32} /> },
    { title: "Plataformas SaaS", icon: <Layers size={32} /> },
  ];

  return (
    <div ref={containerRef}>
      
      {/* 1. HERO CENTRADO CON VIDEO DE FONDO */}
      <section className={styles.heroCenteredVideo}>
        {/* Fondo interactivo Malla Cibernética */}
        <CyberGrid />
        
        {/* Capa de oscurecimiento on scroll */}
        <div className={styles.scrollDimmer}></div>

        {/* Contenido Centrado */}
        <div className={`${styles.centeredContentWrapper} hero-anim`}>
          
          <h1 className={styles.centeredTitle}>
            <span style={{ color: '#000000' }}>Info</span>
            <span style={{ color: '#888888' }}>cod</span>
          </h1>
          
          <div className={styles.centeredSubtitle}>
            <ScrambleText 
              phrases={[
                "Tu negocio genera datos todos los días. Nosotros los convertimos en decisiones.",
                "Sistemas web invencibles y software de alto rendimiento.",
                "Arquitectura diseñada para el escrutinio."
              ]}
              interval={4500}
            />
          </div>
          
          <div className={`${styles.centeredCtaGroup} hero-anim`}>
            <Link href="/contacto" className={styles.corePrimaryBtn}>
              Cotizar proyecto
              <div className={styles.btnSweep}></div>
            </Link>
            <Link href="/productos" className={styles.coreSecondaryBtnLight}>
              Ver productos
            </Link>
          </div>
          
        </div>
      </section>

      {/* 2. TECH MARQUEE (Tecnologías) */}
      <TechMarqueeSection />

      {/* 3. SERVICIOS (9 Áreas) */}
      <section id="servicios-section" className={`${styles.section} ${styles.sectionPurple}`} style={{ overflow: 'hidden', paddingTop: '4rem' }}>
        <div className="max-w-7xl mx-auto px-4 w-full bg-transparent">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.textWhite}`}>Lo que hacemos</h2>
          </div>
          
          {/* Nuevo componente Acordeón Horizontal */}
          <div className="services-anim">
            <ServicesAccordion services={services} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/servicios" className={styles.coreSecondaryBtn}>
              Ver todos los servicios &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTOS PROPIOS (ZIG ZAG) */}
      <ProductsZigZag />


      {/* 6. POR QUÉ INFOCOD - GSAP 075 Pinned Scroll Fan */}
      <PrinciplesFanScroll />

      {/* 7. CTA FINAL (Fondo Blanco Limpio, Sin Card, Letras GSAP y Chuy a la Derecha) */}
      <section id="cta-final-section" className={styles.ctaCleanSection}>
        <div className={styles.ctaCleanContainer}>
          
          {/* Lado Izquierdo: Texto Animado caracter por caracter en GSAP + Botón Contáctanos */}
          <div className={styles.ctaCleanLeft}>
            <h2 className={styles.ctaHeadline}>
              {ctaHeadlineText.split(" ").map((word, wIdx) => (
                <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.35em' }}>
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="cta-split-char" style={{ display: 'inline-block' }}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <Link href="/contacto" className={styles.ctaButtonClean}>
              Contáctanos
            </Link>
          </div>

          {/* Lado Derecho: Imagen sin fondo de Chuy (chuy_contac.png) */}
          <div className={styles.ctaCleanRight}>
            <Image 
              src="/images/chuy_contac.png" 
              alt="Zorro Chuy - Contacto Infocod" 
              width={440} 
              height={440} 
              className={styles.chuyContactImg}
              priority
            />
          </div>

        </div>
      </section>
      
    </div>
  );
}
