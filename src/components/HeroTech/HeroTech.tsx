"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroTech.module.css";

const CyberGrid = dynamic(() => import("@/components/CyberGrid/CyberGrid"), {
  ssr: false,
});

const WireframeGlobe = dynamic(
  () => import("@/components/WireframeGlobe/WireframeGlobe"),
  { ssr: false }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TICKER = "SOFTWARE · SISTEMAS · INTELIGENCIA ARTIFICIAL · CLOUD · DEVOPS · APPS MOVILES · RPA · SAAS · ";

const SIZE = 520;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_ORBIT = CX - 20; // 240
const R_RING = CX - 80;  // 180

export default function HeroTech() {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cyberGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Continuous rotation for the single cool orbit ──
    gsap.to(orbitRef.current, {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    // ── Mouse Parallax (Flat 2D, no 3D clipping issues) ──
    const onMove = (e: MouseEvent) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;

      // Orbit moves slightly opposite to cursor (depth)
      gsap.to(orbitRef.current, {
        x: -px * 30,
        y: -py * 20,
        duration: 2,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Inner elements move with cursor
      gsap.to(innerRef.current, {
        x: px * 15,
        y: py * 10,
        duration: 2.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle tilt of the whole frame
      gsap.to(frameRef.current, {
        rotateX: -py * 8,
        rotateY: px * 8,
        duration: 2.5,
        ease: "power2.out",
        transformPerspective: 1000,
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMove);

    const ctx = gsap.context(() => {
      gsap.set([brandRef.current, ctaRef.current], { opacity: 0, y: 22 });
      gsap.set(frameRef.current, { opacity: 0, scale: 0.85 });

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
      tl.to(frameRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)" })
        .to(brandRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6");

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=75%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      exitTl
        .fromTo(frameRef.current,
          { scale: 1, opacity: 1 },
          { scale: 4, opacity: 0, ease: "power2.in", immediateRender: false }, 0)
        .fromTo([brandRef.current, ctaRef.current],
          { scale: 1, opacity: 1 },
          { scale: 1.5, opacity: 0, ease: "power2.in", immediateRender: false }, 0)
        .fromTo(cyberGridRef.current,
          { scale: 1, opacity: 1 },
          { opacity: 0, scale: 1.2, ease: "power2.in", immediateRender: false }, 0);
    }, heroRef);

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  const orbitCirc = 2 * Math.PI * R_ORBIT;

  return (
    <section ref={heroRef} className={styles.hero}>
      <div ref={cyberGridRef} className={styles.cyberGrid}>
        <CyberGrid />
      </div>

      <div ref={frameRef} className={styles.circleFrame} style={{ width: SIZE, height: SIZE }}>

        {/* ─── SINGLE COOL ORBIT RING ─── */}
        <div ref={orbitRef} className={styles.orbitRing} style={{ zIndex: 10 }}>
          <svg className={styles.circleSvg} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <defs>
              <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              <linearGradient id="comet-tail-1" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0" />
                <stop offset="100%" stopColor="#4F8EF7" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="comet-tail-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6C2BFF" stopOpacity="0" />
                <stop offset="100%" stopColor="#6C2BFF" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Base dashed track */}
            <circle cx={CX} cy={CY} r={R_ORBIT}
              stroke="rgba(100,116,139,0.25)" strokeWidth="1"
              strokeDasharray="4 8" fill="none"
            />
            {/* Inner solid track */}
            <circle cx={CX} cy={CY} r={R_ORBIT - 4}
              stroke="rgba(79,142,247,0.15)" strokeWidth="1" fill="none"
            />

            {/* Comet 1 (Blue) */}
            <g>
              <circle cx={CX} cy={CY} r={R_ORBIT}
                stroke="url(#comet-tail-1)" strokeWidth="3" fill="none"
                strokeLinecap="round"
                strokeDasharray={`180 ${orbitCirc}`}
                strokeDashoffset="200"
                filter="url(#orbit-glow)"
              />
              <circle cx={CX} cy={CY - R_ORBIT} r="6" fill="#4F8EF7" />
              <circle cx={CX} cy={CY - R_ORBIT} r="2.5" fill="#ffffff" />
            </g>

            {/* Comet 2 (Purple) - Offset by 180 degrees */}
            <g transform={`rotate(180 ${CX} ${CY})`}>
              <circle cx={CX} cy={CY} r={R_ORBIT}
                stroke="url(#comet-tail-2)" strokeWidth="3" fill="none"
                strokeLinecap="round"
                strokeDasharray={`180 ${orbitCirc}`}
                strokeDashoffset="200"
                filter="url(#orbit-glow)"
              />
              <circle cx={CX} cy={CY - R_ORBIT} r="6" fill="#6C2BFF" />
              <circle cx={CX} cy={CY - R_ORBIT} r="2.5" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* ─── INNER: 3D WIREFRAME GLOBE + BRAND OVERLAY ─── */}
        <div ref={innerRef} className={styles.circleInner} style={{ zIndex: 15 }}>
          {/* Frosted glass background circle */}
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="ht-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                <stop offset="70%" stopColor="#f8faff" stopOpacity="0.80" />
                <stop offset="100%" stopColor="#eef3ff" stopOpacity="0.55" />
              </radialGradient>
            </defs>
            {/* Frosted fill */}
            <circle cx={CX} cy={CY} r={R_RING} fill="url(#ht-fill)" />
            {/* Border ring */}
            <circle cx={CX} cy={CY} r={R_RING}
              stroke="rgba(100,116,139,0.35)" strokeWidth="1.5" fill="none"
            />
          </svg>

          {/* Three.js Globe (centered) */}
          <div className={styles.globeContainer}>
            <WireframeGlobe size={R_RING * 2 - 20} />
          </div>

          {/* Brand text overlaid on globe */}
          <div ref={brandRef} className={styles.brandBlock}>
            <h1 className={styles.brandName}>Infocod</h1>
            <div className={styles.brandRule} />
            <p className={styles.brandTagline}>
              Información a medida,<br />construida para durar.
            </p>
          </div>
        </div>
      </div>

      <div ref={ctaRef} className={styles.ctaGroup}>
        <Link href="/contacto" className={styles.ctaPrimary}>
          <span>Cotizar proyecto</span>
          <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link href="/servicios" className={styles.ctaSecondary}>
          Ver servicios
        </Link>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={styles.tickerItem}>{TICKER}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
