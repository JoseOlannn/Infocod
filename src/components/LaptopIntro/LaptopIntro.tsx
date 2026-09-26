"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LaptopIntro.module.css";
import ScrambleText from "@/components/ScrambleText/ScrambleText";

// Defer heavy CyberGrid import until needed
import dynamic from "next/dynamic";
const CyberGrid = dynamic(() => import("@/components/CyberGrid/CyberGrid"), {
  ssr: false,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCRAMBLE_PHRASES = [
  "Tu negocio genera datos todos los días. Nosotros los convertimos en decisiones.",
  "Sistemas web invencibles y software de alto rendimiento.",
  "Arquitectura diseñada para el escrutinio.",
];

export default function LaptopIntro() {
  /* ── Refs ── */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const svgScreenRef = useRef<SVGRectElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const introLogoRef = useRef<HTMLDivElement>(null);
  const introSubtitleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const realHeroRef = useRef<HTMLDivElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);

  /* Mount CyberGrid only when the swap is near */
  const [showCyberGrid, setShowCyberGrid] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          /* 400vh of scroll space drives the whole sequence */
          end: "+=400%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            /* Pre-load CyberGrid when 60% through the animation */
            if (self.progress > 0.6 && !showCyberGrid) {
              setShowCyberGrid(true);
            }
          },
        },
      });

      /*
       * PHASE 1 [0 → 0.35]: Lid opens (rotateX -100 → 0)
       *                       Logo + subtitle fade out
       *                       Scroll hint fades out
       */
      tl.to(
        lidRef.current,
        {
          rotateX: 0,
          ease: "none",
          duration: 0.35,
          onStart: () => {
            if (lidRef.current) lidRef.current.style.willChange = "transform";
          },
          onComplete: () => {
            if (lidRef.current) lidRef.current.style.willChange = "auto";
          },
        },
        0
      )
        .to(
          introLogoRef.current,
          { opacity: 0, y: -20, ease: "none", duration: 0.25 },
          0
        )
        .to(
          introSubtitleRef.current,
          { opacity: 0, y: -10, ease: "none", duration: 0.2 },
          0
        )
        .to(
          scrollHintRef.current,
          { opacity: 0, ease: "none", duration: 0.15 },
          0
        );

      /*
       * PHASE 2 [0.35 → 0.45]: Crossfade SVG screen ↔ HTML overlay
       *                          SVG screen rect → opacity 0
       *                          HTML overlay → opacity 1 (dark)
       */
      tl.to(
        svgScreenRef.current,
        { attr: { opacity: 0 }, ease: "none", duration: 0.05 },
        0.35
      ).to(
        overlayRef.current,
        { opacity: 1, ease: "none", duration: 0.05 },
        0.35
      );

      /*
       * PHASE 3 [0.45 → 0.6]: Screen glows white
       */
      tl.to(
        overlayRef.current,
        {
          backgroundColor: "#ffffff",
          boxShadow:
            "0 0 120px 60px rgba(255,255,255,0.95), 0 0 300px 120px rgba(200,220,255,0.4)",
          ease: "power2.inOut",
          duration: 0.15,
        },
        0.45
      );

      /*
       * PHASE 4 [0.6 → 0.82]: Screen zooms to fill viewport
       *                         Laptop SVG fades out
       */
      tl.to(
        overlayRef.current,
        {
          scale: 30,
          ease: "power3.in",
          duration: 0.22,
        },
        0.6
      ).to(
        lidRef.current,
        { opacity: 0, ease: "none", duration: 0.1 },
        0.65
      );

      /*
       * PHASE 5 [0.82 → 1.0]: Swap — white flash then real hero appears
       */
      tl.to(
        whiteFlashRef.current,
        { opacity: 1, ease: "none", duration: 0.04 },
        0.82
      )
        .to(
          overlayRef.current,
          { opacity: 0, ease: "none", duration: 0.01 },
          0.84
        )
        .to(
          realHeroRef.current,
          { opacity: 1, ease: "power2.out", duration: 0.16 },
          0.84
        )
        .to(
          whiteFlashRef.current,
          { opacity: 0, ease: "power1.out", duration: 0.08 },
          0.9
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* ── PINNED STAGE ── */}
      <div ref={stageRef} className={styles.stage}>

        {/* ══════════════ LAPTOP SCENE ══════════════ */}
        <div className={styles.laptopScene}>
          <div className={styles.laptopSvgWrapper}>

            {/* BASE + KEYBOARD (static, always visible) */}
            <svg
              className={styles.laptopBase}
              viewBox="0 0 520 363"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Base body */}
              <rect
                x="20"
                y="220"
                width="480"
                height="130"
                rx="14"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Hinge accent */}
              <rect x="200" y="218" width="120" height="8" rx="4" fill="#94a3b8" />
              {/* Keyboard area */}
              <rect
                x="50"
                y="238"
                width="420"
                height="80"
                rx="8"
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              {/* Keyboard rows – decorative */}
              {[0, 1, 2, 3].map((row) =>
                Array.from({ length: row === 0 ? 14 : row === 3 ? 8 : 13 }).map(
                  (_, i) => (
                    <rect
                      key={`key-${row}-${i}`}
                      x={58 + i * (row === 0 ? 28 : row === 3 ? 38 : 30)}
                      y={244 + row * 16}
                      width={row === 0 ? 24 : row === 3 ? 34 : 26}
                      height={12}
                      rx={3}
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth="0.5"
                    />
                  )
                )
              )}
              {/* Trackpad */}
              <rect
                x="200"
                y="328"
                width="120"
                height="14"
                rx="6"
                fill="#cbd5e1"
                stroke="#94a3b8"
                strokeWidth="0.8"
              />
              {/* Bottom feet */}
              {[60, 460].map((x) => (
                <rect key={x} x={x} y={346} width={40} height={6} rx={3} fill="#94a3b8" />
              ))}
            </svg>

            {/* LID (rotates on scroll) */}
            <div ref={lidRef} className={styles.laptopLid}>
              <svg
                ref={undefined /* lid SVG — we access children via ref */}
                className={styles.laptopLidSvg}
                viewBox="0 0 520 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Lid shell */}
                <rect
                  x="20"
                  y="0"
                  width="480"
                  height="210"
                  rx="14"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                {/* Bezel */}
                <rect x="34" y="10" width="452" height="192" rx="8" fill="#1e293b" />
                {/* Screen rect — fades out when overlay takes over */}
                <rect
                  ref={svgScreenRef}
                  x="44"
                  y="13"
                  width="432"
                  height="183"
                  rx="6"
                  fill="#0a0a0a"
                  opacity="1"
                />
                {/* Apple-style notch (decorative) */}
                <rect x="247" y="2" width="26" height="5" rx="2.5" fill="#94a3b8" />
                {/* Subtle logo on back (lid outer) — not visible face-on */}
              </svg>
            </div>

            {/* SCREEN OVERLAY (HTML div, zero 3D transform at swap time) */}
            <div ref={overlayRef} className={styles.screenOverlay} />
          </div>
        </div>

        {/* ══════════════ INTRO TEXT ══════════════ */}
        <div className={styles.introTextLayer}>
          <div ref={introLogoRef} className={styles.introLogo}>
            INFOCOD
          </div>
          <div ref={introSubtitleRef} className={styles.introSubtitle}>
            Sistemas de información a medida
          </div>
        </div>

        {/* ══════════════ SCROLL HINT ══════════════ */}
        <div ref={scrollHintRef} className={styles.scrollHint}>
          <span className={styles.scrollHintText}>Scroll</span>
          <div className={styles.scrollHintArrow} />
        </div>

        {/* ══════════════ REAL HERO ══════════════ */}
        <div ref={realHeroRef} className={styles.realHero}>
          {/* CyberGrid — only mounted when close to the swap */}
          {showCyberGrid && (
            <div className={styles.cyberGridWrapper}>
              <CyberGrid />
            </div>
          )}

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleInfo}>Info</span>
              <span className={styles.titleCod}>cod</span>
            </h1>

            <div className={styles.heroSubtitle}>
              <ScrambleText phrases={SCRAMBLE_PHRASES} interval={4500} />
            </div>

            <div className={`${styles.heroCtaGroup} hero-anim`}>
              <Link href="/contacto" className="corePrimaryBtnGlobal">
                Cotizar proyecto
              </Link>
              <Link href="/productos" className="coreSecondaryBtnLightGlobal">
                Ver productos
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════ WHITE FLASH ══════════════ */}
        <div ref={whiteFlashRef} className={styles.whiteFlash} />
      </div>
    </div>
  );
}
