"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { observeActive, prefersReducedMotion } from "@/utils/animation";
import styles from "./HeroTech.module.css";

const CyberGrid = dynamic(() => import("@/components/CyberGrid/CyberGrid"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDE_DURATION_MS = 4000;

const SLIDES = [
  {
    src: "/inicio/agenda+.jpg",
    alt: "Agenda+ en uso desde una oficina moderna",
    highlight: "ordena tu operación.",
  },
  {
    src: "/inicio/masticod.jpg",
    alt: "Masticod punto de venta en negocio real",
    highlight: "impulsa tus ventas.",
  },
  {
    src: "/inicio/datapilot.jpg",
    alt: "DataPilot en sala de juntas ejecutiva",
    highlight: "guía tus decisiones.",
  },
] as const;

export default function HeroTech() {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const slidesWrapRef = useRef<HTMLDivElement>(null);
  const chuyCornerRef = useRef<HTMLDivElement>(null);

  /* ── Entrada coreografiada de la columna izquierda + Chuy en la esquina + scroll ── */
  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>("[data-brand-char]", content);
      const brackets = gsap.utils.toArray<HTMLElement>("[data-brand-bracket]", content);

      gsap.set(brackets, { scale: 0.5, opacity: 0 });
      gsap.set(letters, { y: 38, opacity: 0, rotateX: -45 });
      gsap.set(headlineRef.current, { y: 20, opacity: 0 });
      gsap.set(descRef.current, { y: 18, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });
      gsap.set(chuyCornerRef.current, { y: 40, opacity: 0, scale: 0.92 });

      gsap
        .timeline({ delay: 0.1, defaults: { ease: "power3.out" } })
        .to(brackets, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(2)",
        })
        .to(
          letters,
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.04,
            ease: "back.out(1.6)",
          },
          "-=0.42"
        )
        .to(
          headlineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
          },
          "-=0.32"
        )
        .to(
          descRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          "-=0.35"
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          "-=0.35"
        )
        .to(
          chuyCornerRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        })
        .to(
          slidesWrapRef.current,
          {
            yPercent: 10,
            scale: 1.04,
            ease: "none",
          },
          0
        )
        .to(
          content,
          {
            y: -40,
            opacity: 0.2,
            ease: "none",
          },
          0
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Animación suave cada vez que cambia la frase sincronizada con la imagen ── */
  useEffect(() => {
    const el = highlightRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [activeIndex]);

  /* ── Rotación automática de las 3 imágenes cada 4 segundos ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % SLIDES.length);
      }, SLIDE_DURATION_MS);
    };

    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    const stopObserving = observeActive(hero, (isActive) => {
      if (isActive) start();
      else stop();
    });

    return () => {
      stop();
      stopObserving();
    };
  }, []);

  const currentSlide = SLIDES[activeIndex];

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* 1. Lado izquierdo: fondo blanco con cuadrícula muy sutil */}
      <div className={styles.gridLayer} aria-hidden="true">
        <CyberGrid />
      </div>

      {/* 2. Lado derecho: las 3 imágenes cambiando cada 4s con difuminado blanco */}
      <div ref={slidesWrapRef} className={styles.slidesSide} aria-hidden="true">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={slide.src}
              className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                preload={idx === 0}
                sizes="(max-width: 768px) 100vw, 68vw"
                className={styles.slideImage}
              />
            </div>
          );
        })}

        <div className={styles.fadeBlend} />
      </div>

      {/* 3. Esquina inferior derecha: Franjas curvas morada y verde + Chuy con laptop */}
      <div ref={chuyCornerRef} className={styles.chuyCorner} aria-hidden="true">
        {/* Franjas diagonales curvas morado + verde como la referencia */}
        <svg
          className={styles.cornerRibbons}
          viewBox="0 0 620 260"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ribbon-purple" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6C2BFF" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="ribbon-green" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#00C96B" />
            </linearGradient>
          </defs>

          {/* Franja superior morada */}
          <path
            d="M 10 260 C 175 215, 360 128, 620 28 L 620 260 Z"
            fill="url(#ribbon-purple)"
          />

          {/* Franja inferior verde */}
          <path
            d="M 215 260 C 345 215, 470 165, 620 132 L 620 260 Z"
            fill="url(#ribbon-green)"
          />
        </svg>

        {/* Destellos verdes junto a la oreja derecha de Chuy */}
        <svg
          className={styles.chuySparkles}
          viewBox="0 0 56 56"
          fill="none"
        >
          <path d="M14 34L22 8L32 24L14 34Z" fill="#22C55E" />
          <path d="M26 46L48 34L44 48L26 46Z" fill="#22C55E" />
        </svg>

        {/* Imagen de Chuy sentado con su laptop */}
        <div className={styles.chuyWrapper}>
          <Image
            src="/inicio/chuy1.png"
            alt="Chuy mascota de Infocod con laptop"
            width={300}
            height={360}
            sizes="(max-width: 768px) 170px, 245px"
            className={styles.chuyImg}
          />
        </div>
      </div>

      {/* 4. Columna izquierda limpia: <Infocod•> + titular + texto + botones */}
      <div className={styles.container}>
        <div ref={contentRef} className={styles.leftContent}>
          <div className={styles.brandLockup} aria-label="Infocod">
            <svg
              data-brand-bracket
              className={styles.bracketLeft}
              viewBox="0 0 36 52"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M31 7L7 26L31 45"
                stroke="currentColor"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className={styles.brandWord}>
              {["I", "n", "f", "o"].map((ch, i) => (
                <span key={i} data-brand-char className={styles.charInfo}>
                  {ch}
                </span>
              ))}
              {["c", "o", "d"].map((ch, i) => (
                <span key={i + 4} data-brand-char className={styles.charCod}>
                  {ch}
                </span>
              ))}
            </span>

            <svg
              data-brand-bracket
              className={styles.bracketRight}
              viewBox="0 0 48 52"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 7L29 26L6 45"
                stroke="currentColor"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="40" cy="26" r="5.5" fill="currentColor" />
            </svg>
          </div>

          <h1 ref={headlineRef} className={styles.headline}>
            Software a medida que{" "}
            <span ref={highlightRef} className={styles.headlineHighlight}>
              {currentSlide.highlight}
            </span>
          </h1>

          <p ref={descRef} className={styles.description}>
            Desarrollamos sistemas para tu empresa y productos propios pensados para
            simplificar y hacer crecer tu operación diaria.
          </p>

          <div ref={ctaRef} className={styles.ctaGroup}>
            <Link href="/contacto" className={styles.ctaPrimary}>
              <span>Cotizar proyecto</span>
              <svg
                className={styles.arrowIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/servicios" className={styles.ctaSecondary}>
              Ver servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
