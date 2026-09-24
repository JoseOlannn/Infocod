"use client";

import { useEffect, useRef, useState } from 'react';
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
  }
];

export default function ProductsZigZag() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const numCards = products.length;

      // Pin de la sección y animación de desplazamiento horizontal
      ScrollTrigger.create({
        id: "products-pin",
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${numCards * 100}%`,
        scrub: 0.8,
        anticipatePin: 1,
        animation: gsap.to(track, {
          xPercent: -((numCards - 1) / numCards) * 100,
          ease: "none"
        }),
        onUpdate: (self) => {
          const progress = self.progress;
          const calculatedIndex = Math.min(
            numCards - 1,
            Math.floor(progress * numCards)
          );
          if (calculatedIndex !== activeIndexRef.current) {
            activeIndexRef.current = calculatedIndex;
            setActiveIndex(calculatedIndex);
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCard = (index: number) => {
    const st = ScrollTrigger.getById("products-pin");
    if (st) {
      const start = st.start;
      const end = st.end;
      const totalScroll = end - start;
      const targetProgress = index / (products.length - 1);
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
        <div className={styles.cardsTrack} ref={trackRef}>
          {products.map((product) => {
            return (
              <div key={product.id} className={styles.cardSlide}>
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
                      unoptimized
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
