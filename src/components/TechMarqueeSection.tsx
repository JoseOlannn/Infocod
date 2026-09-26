"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TechMarquee.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Tech stack entries — clean monochrome ── */
const TECH = [
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "Java",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "TypeScript",
  "TailwindCSS",
  "Docker",
  "GraphQL",
];

export default function TechMarqueeSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(bottomRef.current, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      tl.to(lineRef.current, { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* ── Top divider line ── */}
      <div ref={lineRef} className={styles.dividerLine} />

      {/* ── Heading ── */}
      <div className={styles.header}>
        <h2 ref={headingRef} className={styles.heading}>
          Construimos con las
          <br />
          <span className={styles.headingOutline}>mejores herramientas</span>
        </h2>
      </div>

      {/* ── Marquee row 1 (left to right) ── */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div className={styles.marqueeTrack} data-direction="ltr">
          {[...TECH, ...TECH].map((name, i) => (
            <span key={`a-${i}`} className={styles.techItem}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Marquee row 2 (right to left, offset) ── */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div className={styles.marqueeTrack} data-direction="rtl">
          {[...TECH.slice(6), ...TECH, ...TECH.slice(0, 6)].map((name, i) => (
            <span key={`b-${i}`} className={styles.techItem}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom small text ── */}
      <p ref={bottomRef} className={styles.bottomNote}>
        Siempre estamos actualizando nuestro stack para tu imaginación
      </p>
    </section>
  );
}

