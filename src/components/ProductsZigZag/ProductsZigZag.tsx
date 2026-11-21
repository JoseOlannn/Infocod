"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import styles from './ProductsZigZag.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: "agenda",
    number: "01",
    title: "Agenda+",
    category: "Productividad & Proyectos",
    desc: "Dashboard premium para tareas, proyectos y hábitos, diseñado para potenciar tu concentración sin distracciones con análisis de tiempo real.",
    img: "/servicios/agenda+.png",
    badge: "App Oficial",
    link: "/productos#agenda",
    imgScale: 1.25,
    colorVar: "var(--color-brand-blue)"
  },
  {
    id: "masticod",
    number: "02",
    title: "Masticod",
    category: "Sistemas & Puntos de Venta",
    desc: "Un ecosistema de software especializado. Elige la versión exacta para tu industria (Abarrotes, Farmacia, Ferretería, etc.) lista para usarse, sin opciones de relleno.",
    img: "/productos/masticod/chuymasti.png",
    badge: "En desarrollo",
    link: "/productos?p=masticod",
    imgScale: 1.2,
    colorVar: "var(--color-brand-green)"
  },
  {
    id: "datapilot",
    number: "03",
    title: "DataPilot",
    category: "Business Intelligence & IA",
    desc: "Plataforma Inteligente de Gestión. Transforma los datos crudos de tu empresa en gráficas interactivas y decisiones estratégicas respaldadas por Inteligencia Artificial.",
    img: "/productos/datapilot/datachuy.png",
    badge: "En desarrollo",
    link: "/productos?p=datapilot",
    imgScale: 1.05,
    colorVar: "var(--color-brand-purple)"
  },
  {
    id: "cvforge",
    number: "04",
    title: "CVforge",
    category: "Carrera Profesional & IA",
    desc: "Plataforma diseñada para crear currículums de alto impacto y superar los filtros automáticos de inteligencia artificial (ATS) al postularte a tus próximas oportunidades.",
    img: "/productos/cvforge/cvchuy.png",
    badge: "En desarrollo",
    link: "/productos?p=cvforge",
    imgScale: 1.08,
    colorVar: "#F59E0B"
  }
];

export default function ProductsZigZag() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const numCards = products.length;
  const slideDuration = numCards - 1;
  const endHold = 0.6;
  const slideEndProgress = slideDuration / (slideDuration + endHold);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;

      // Animación de entrada "Reveal" (se sube)
      gsap.from(sectionRef.current, {
        y: 150,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      const tl = gsap.timeline();
      tl.to(track, {
        xPercent: -((numCards - 1) / numCards) * 100,
        duration: slideDuration,
        ease: "none"
      }).to(track, {
        xPercent: -((numCards - 1) / numCards) * 100,
        duration: endHold,
        ease: "none"
      });

      // Pin de la sección y animación de desplazamiento horizontal
      ScrollTrigger.create({
        id: "products-pin",
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${(numCards + 0.6) * 100}%`,
        scrub: 0.25,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => {
          const slideProgress = Math.min(1, self.progress / slideEndProgress);
          const calculatedIndex = Math.min(
            numCards - 1,
            Math.round(slideProgress * (numCards - 1))
          );
          if (calculatedIndex !== activeIndexRef.current) {
            activeIndexRef.current = calculatedIndex;
            setActiveIndex(calculatedIndex);
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [numCards, slideDuration, endHold, slideEndProgress]);

  const scrollToCard = (index: number) => {
    const st = ScrollTrigger.getById("products-pin");
    if (st) {
      const start = st.start;
      const end = st.end;
      const totalScroll = end - start;
      const targetProgress = (index / (numCards - 1)) * slideEndProgress;
      const targetScroll = start + targetProgress * totalScroll;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < products.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section className={styles.section} ref={sectionRef} id="productos">
      {/* Texto lateral vertical izquierdo enmarcando el scroll */}
      <div className={styles.sideTextWrapperLeft}>
        <span className={styles.sideTextLeft}>NUESTROS</span>
      </div>

      {/* Texto lateral vertical derecho enmarcando el scroll */}
      <div className={styles.sideTextWrapperRight}>
        <span className={styles.sideTextRight}>PRODUCTOS</span>
      </div>

      {/* Viewport y Pista Horizontal */}
      <div className={styles.viewport}>
        <div
          className={styles.cardsTrack}
          ref={trackRef}
          style={{ width: `${numCards * 100}%`, minWidth: `${numCards * 100}%` }}
        >
          {products.map((product) => {
            const slideWidth = `${100 / numCards}%`;
            return (
              <div
                key={product.id}
                className={styles.cardSlide}
                style={{ width: slideWidth, minWidth: slideWidth, maxWidth: slideWidth, flex: `0 0 ${slideWidth}` }}
              >
                <div className={styles.cardInner}>
                  
                  {/* Columna de Información */}
                  <div className={styles.textCol}>
                    <div className={styles.metaRow}>
                      <span className={styles.numberBadge} style={{ color: product.colorVar }}>
                        {product.number}
                      </span>
                      {product.badge && (
                        <span className={styles.statusBadge}>{product.badge}</span>
                      )}
                    </div>
                    
                    <span className={styles.category}>{product.category}</span>
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.desc}>{product.desc}</p>

                    <div className={styles.btnGroup}>
                      <Link href={product.link} className={styles.primaryBtn}>
                        Saber más <ExternalLink size={16} style={{ marginLeft: '0.4rem' }} />
                      </Link>
                      {product.id === "agenda" && (
                        <Link href="https://agendamas.infocod.codes/" className={styles.secondaryBtn} target="_blank" rel="noopener noreferrer">
                          Ir a la app
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Columna Visual de la Imagen */}
                  <div className={styles.imgCol}>
                    <div className={styles.imgCardGlow} style={{ 
                      background: `radial-gradient(circle, ${product.colorVar} 0%, transparent 70%)`,
                      opacity: 0.15 
                    }}></div>
                    <Image 
                      src={product.img}
                      alt={product.title}
                      className={styles.productImage}
                      style={{ transform: `scale(${product.imgScale || 1})` }}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 90vw, 50vw"
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cápsula de Navegación e Indicadores (01 / 02 / 03) */}
      <div className={styles.paginationNav}>
        <button 
          className={styles.arrowBtn} 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Producto anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.dotsContainer}>
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => scrollToCard(idx)}
              className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ''}`}
              aria-label={`Ver ${p.title}`}
            />
          ))}
        </div>

        <span className={styles.stepCounter}>
          0{activeIndex + 1} / 0{products.length}
        </span>

        <button 
          className={styles.arrowBtn} 
          onClick={handleNext}
          disabled={activeIndex === products.length - 1}
          aria-label="Producto siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
