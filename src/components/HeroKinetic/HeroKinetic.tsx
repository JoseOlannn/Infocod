"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroKinetic.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TICKER_TEXT = "SOFTWARE · SISTEMAS · IA · CLOUD · DEVOPS · APPS MOVILES · RPA · SAAS · QA · ";

export default function HeroKinetic() {
  const heroRef    = useRef<HTMLElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const codRef     = useRef<HTMLDivElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const blobRef    = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const statRef    = useRef<HTMLDivElement>(null);
  const topBarRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Mouse parallax (kept outside gsap.context for proper cleanup) ──
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      gsap.to(infoRef.current, {
        x: x * -45,
        y: y * -18,
        duration: 2.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(codRef.current, {
        x: x * 45,
        y: y * 18,
        duration: 2.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(blobRef.current, {
        x: x * 130,
        y: y * 100,
        duration: 3,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX - 200,
          y: e.clientY - 200,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ── GSAP context for all other animations ──
    const ctx = gsap.context(() => {

      // ── 1. Set initial states ──
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set([taglineRef.current, ctaRef.current, scrollRef.current, statRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(badgeRef.current, {
        opacity: 0,
        scale: 0.65,
      });
      gsap.set(topBarRef.current, { opacity: 0, y: -16 });
      gsap.set(gridRef.current, { opacity: 0 });

      // ── 2. Load timeline ──
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      });

      tl
        // Grid lines fade in (very subtle)
        .to(gridRef.current, { opacity: 1, duration: 0.6, ease: "none" }, 0)

        // Top bar slides in
        .to(topBarRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.1)

        // INFO word rises (clip reveal via overflow:hidden parent)
        .from(infoRef.current, {
          yPercent: 115,
          duration: 1.25,
          ease: "power4.out",
        }, 0.2)

        // COD word rises (slight overlap)
        .from(codRef.current, {
          yPercent: 115,
          duration: 1.25,
          ease: "power4.out",
        }, 0.42)

        // Rule draws left → right
        .to(ruleRef.current, {
          scaleX: 1,
          duration: 1.0,
          ease: "power3.inOut",
        }, 0.55)

        // Tagline
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.75 }, 0.95)

        // CTAs
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.65 }, 1.1)

        // Stat left
        .to(statRef.current, { opacity: 1, y: 0, duration: 0.55 }, 1.15)

        // Badge spins in with back ease
        .to(badgeRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.8)",
          onComplete: () => {
            // Start infinite rotation AFTER load animation
            gsap.to(badgeRef.current, {
              rotation: "+=360",
              duration: 20,
              repeat: -1,
              ease: "none",
            });
          },
        }, 0.7)

        // Scroll hint
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.3);

      // ── 3. Scroll-driven exit ──
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=65%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      exitTl
        .to(infoRef.current,    { yPercent: -12, opacity: 0, ease: "none" }, 0)
        .to(codRef.current,     { yPercent: -8,  opacity: 0, ease: "none" }, 0.04)
        .to(ruleRef.current,    { opacity: 0, ease: "none" }, 0)
        .to([taglineRef.current, ctaRef.current, statRef.current, topBarRef.current],
                                { opacity: 0, ease: "none" }, 0.02)
        .to(scrollRef.current,  { opacity: 0, ease: "none" }, 0)
        .to(heroRef.current,    { backgroundColor: "#f8fafc", ease: "none" }, 0);

    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>

      {/* ── Gradient blob ── */}
      <div ref={blobRef} className={styles.blob} aria-hidden="true" />

      {/* ── Cursor glow ── */}
      <div ref={glowRef} className={styles.cursorGlow} aria-hidden="true" />

      {/* ── Subtle grid lines ── */}
      <div ref={gridRef} className={styles.gridLines} aria-hidden="true">
        {[16.6, 33.3, 50, 66.6, 83.3].map((left) => (
          <div key={left} className={styles.gridLine} style={{ left: `${left}%` }} />
        ))}
      </div>

      {/* ── Top bar: tag + year + badge ── */}
      <div ref={topBarRef} className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.topBarTag}>Infocod™</span>
          <div className={styles.topBarDivider} />
          <span className={styles.topBarYear}>Est. 2016</span>
        </div>

        {/* Rotating circular badge */}
        <div ref={badgeRef} className={styles.badge} aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none">
            <defs>
              <path
                id="hk-badge-path"
                d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
              />
            </defs>
            <text
              fontFamily="var(--font-jetbrains)"
              fontSize="11"
              fill="#0f172a"
              letterSpacing="2.5"
            >
              <textPath href="#hk-badge-path" startOffset="0%">
                {`INFOCOD · SISTEMAS · SOFTWARE · IA · `}
              </textPath>
            </text>
            {/* Center dot */}
            <circle cx="100" cy="100" r="4" fill="#4F8EF7" />
            <circle cx="100" cy="100" r="7" fill="none" stroke="#4F8EF7" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* ── Left stat decoration ── */}
      <div ref={statRef} className={styles.statLeft} aria-hidden="true">
        <div className={styles.statLine} />
        <span className={styles.statNumber}>10+</span>
        <span className={styles.statLabel}>Años</span>
      </div>

      {/* ── Main content ── */}
      <div className={styles.content}>
        <div className={styles.titleBlock}>

          {/* INFO — overflow:hidden wrapper for clip-reveal */}
          <div className={styles.wordRow}>
            <div ref={infoRef} className={styles.wordInfo} aria-hidden="true">
              Info
            </div>
          </div>

          {/* Animated gradient rule */}
          <div ref={ruleRef} className={styles.rule} />

          {/* COD — overflow:hidden wrapper for clip-reveal */}
          <div className={styles.wordRow}>
            <div ref={codRef} className={styles.wordCod} aria-hidden="true">
              cod
            </div>
          </div>

          {/* Accessible h1 (visually hidden, for SEO) */}
          <h1 className="sr-only">Infocod — Sistemas de información a medida</h1>
        </div>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          Transformamos datos en decisiones.
          <br />
          Software <em>a medida</em>, construido para durar.
        </p>

        {/* CTAs */}
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

      {/* ── Decorative ghost number ── */}
      <div className={styles.ghostNum} aria-hidden="true">∞</div>

      {/* ── Bottom ticker ── */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={styles.tickerItem}>
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div ref={scrollRef} className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollHintLine} />
        <span className={styles.scrollHintLabel}>scroll</span>
      </div>

    </section>
  );
}
