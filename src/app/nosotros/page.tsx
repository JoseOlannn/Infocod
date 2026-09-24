"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Lightbulb, ShieldCheck, Star, Users, Lock, HeartHandshake } from 'lucide-react';
import styles from './Nosotros.module.css';

const TABS = [
  "Quiénes somos",
  "Por qué Infocod",
  "Nuestra Misión",
  "Nuestra Visión",
  "Cultura"
];

const VALORES = [
  { title: "Innovación", desc: "Nuevas formas de resolver problemas mediante tecnología de punta.", icon: <Lightbulb size={24} /> },
  { title: "Integridad", desc: "Transparencia, responsabilidad y confidencialidad.", icon: <Users size={24} /> },
  { title: "Calidad", desc: "Estándares estrictos de la industria del software.", icon: <Star size={24} /> },
  { title: "Compromiso", desc: "Honramos los acuerdos adquiridos con clientes.", icon: <HeartHandshake size={24} /> },
  { title: "Seguridad", desc: "Arquitecturas Zero-Trust y prácticas internacionales.", icon: <Lock size={24} /> },
  { title: "Transparencia", desc: "Trazabilidad absoluta y reportes claros.", icon: <ShieldCheck size={24} /> }
];

export default function NosotrosSPA() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // 1. Draw top line
      tl.to('.topLine', { width: '10vw', duration: 0.8, ease: 'power3.inOut', delay: 0.2 })
      // 2. Draw vertical line
      .to('.verticalLine', { height: '70vh', duration: 1, ease: 'power3.inOut' })
      // 3. Reveal menu items
      .to('.menuItem', { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.5")
      // 4. Reveal initial content
      .fromTo('.activeContentWrapper', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.5"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Scribble animation when activeTab changes
  useEffect(() => {
    if (window.innerWidth < 992) return; // Disable scribble on mobile
    
    gsap.fromTo(`.${styles.scribblePath}`, 
      { strokeDashoffset: 1000, strokeDasharray: 1000 },
      { strokeDashoffset: 0, duration: 1.8, ease: "power1.inOut" }
    );
    gsap.to(`.${styles.scribbleContainer}`, { opacity: 1, duration: 0.2 });
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    if (index === activeTab || isAnimating) return;
    setIsAnimating(true);
    
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });
    
    // Fast fade out and shrink slightly
    tl.to('.activeContentWrapper', { opacity: 0, scale: 0.95, duration: 0.15, ease: 'power2.in' })
      .call(() => {
        setActiveTab(index);
      })
      // Pop in effect (scale up with a bounce)
      .fromTo('.activeContentWrapper', 
         { opacity: 0, scale: 0.85 }, 
         { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <div className={`${styles.textContent} textContent`}>
              <h2 className={styles.sectionTitle}>¿QUIÉNES<br/>SOMOS?</h2>
              <p className={styles.sectionText}>
                Más que una agencia, somos tus aliados estratégicos en ingeniería de software. Convertimos datos en decisiones y código en infraestructura escalable.
              </p>
            </div>
            <div className={`${styles.mascotRight} mascotRight`}>
              <div className={styles.mascotFloat}>
                <Image src="/nosotros/quienes somos.png" alt="Zorro Chuy (Feliz)" fill style={{ objectFit: 'contain', objectPosition: 'bottom' }} unoptimized />
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <div className={styles.porqueContainer}>
            <div className={styles.porqueBlock}>
              <div className={styles.neumorphicCard}>
                <span className={styles.neumorphicText}>INFO</span>
              </div>
              <p className={styles.porqueText}>
                "Info" por información que todos los días procesamos
              </p>
            </div>
            <div className={styles.porquePlus}>+</div>
            <div className={styles.porqueBlock}>
              <div className={styles.neumorphicCard}>
                <span className={styles.neumorphicText}>COD</span>
              </div>
              <p className={styles.porqueText}>
                "Cod" las instrucciones escritas por un lenguaje de programación
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.misionContainer}>
            <div className={styles.misionMascot}>
              <div className={styles.misionMascotFloat}>
                <Image src="/nosotros/nuestra mision.png" alt="Zorro Chuy (Decidido)" fill style={{ objectFit: 'contain', objectPosition: 'bottom' }} unoptimized />
              </div>
            </div>
            <div className={styles.misionText}>
              <h2 className={styles.misionTitle}>NUESTRA MISIÓN</h2>
              <p className={styles.misionParagraph}>
                Diseñar, desarrollar e implementar soluciones tecnológicas de alta ingeniería que impulsen la transformación digital corporativa. Integramos arquitecturas en la nube, inteligencia artificial y automatización profunda para maximizar la eficiencia operativa.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.visionContainer}>
            <div className={styles.visionText}>
              <h2 className={styles.misionTitle}>NUESTRA VISIÓN</h2>
              <p className={styles.misionParagraph}>
                Consolidarnos como una firma líder en innovación y desarrollo, reconocida globalmente por construir infraestructura digital de clase mundial que garantice resiliencia, escalabilidad y crecimiento continuo para nuestros socios comerciales.
              </p>
            </div>
            <div className={styles.visionMascot}>
              <div className={styles.visionMascotFloat}>
                <Image src="/nosotros/nuestra vision.png" alt="Zorro Chuy (Lupa)" fill style={{ objectFit: 'contain', objectPosition: 'bottom right', transform: 'scaleX(-1)' }} unoptimized />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.visionContainer}>
            <div className={styles.visionText}>
              <h2 className={styles.misionTitle}>CULTURA</h2>
              <p className={styles.misionParagraph}>
                Operamos bajo un modelo estricto de Transparencia Absoluta y Mejora Continua. Creemos firmemente que el Clean Code no sirve de nada sin una ética profesional intachable. Cuidamos el activo digital de nuestros clientes como infraestructura crítica.
              </p>
            </div>
            <div className={styles.visionMascot}>
              <div className={styles.visionMascotFloat}>
                <Image src="/nosotros/cultura.png" alt="Zorro Chuy (Meditando)" fill style={{ objectFit: 'contain', objectPosition: 'bottom right' }} unoptimized />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={styles.nosotrosPage}>
      
      {/* Background Ambient Glows */}
      <div className={`${styles.ambientGlow} ${styles.glow1}`}></div>
      <div className={`${styles.ambientGlow} ${styles.glow2}`}></div>

      {/* Structural Animated Lines */}
      <div className={`${styles.topLine} topLine`}></div>
      <div className={`${styles.verticalLine} verticalLine`}></div>

      {/* LEFT SIDEBAR MENU */}
      <div className={styles.sidebar}>
        <div className={styles.menuList}>
          {TABS.map((tab, idx) => (
            <button 
              key={idx}
              className={`${styles.menuItem} menuItem ${activeTab === idx ? styles.menuItemActive : ''}`}
              onClick={() => handleTabClick(idx)}
            >
              {tab}
              {activeTab === idx && (
                <svg className={styles.scribbleContainer} viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path className={styles.scribblePath} d="M5,15 Q30,5 50,15 T95,15" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className={styles.contentArea}>
        {/* LA MANTA - Animates via GSAP */}
        <div className={`${styles.manta} manta`}></div>
        
        <div className={`${styles.activeContentWrapper} activeContentWrapper`}>
          {renderContent()}
        </div>
      </div>

    </div>
  );
}
