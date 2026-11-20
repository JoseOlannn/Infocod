"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, Layers, LayoutDashboard, CheckSquare, Columns, FolderOpen, CalendarDays, Wallet, Timer, Repeat2, LineChart, StickyNote, MessageSquare, Home, FileText, Users, Briefcase, Package, CalendarRange, HeadphonesIcon, Settings, Database, Sparkles, Rocket } from 'lucide-react';
import styles from './Productos.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURE_ICONS: Record<string, any> = {
  dashboard: LayoutDashboard, tareas: CheckSquare, kanban: Columns,
  proyectos: FolderOpen, calendario: CalendarDays, finanzas: Wallet,
  pomodoro: Timer, habitos: Repeat2, analiticas: LineChart,
  notas: StickyNote, feedback: MessageSquare,
  inicio: Home, cotizaciones: FileText, clientes: Users,
  trabajos: Briefcase, materiales: Package, agenda: CalendarRange,
  soporte: HeadphonesIcon, ajustes: Settings,
  centralizar: Database, transformar: Sparkles, agilizar: Rocket,
};

function getCardSize(index: number, total: number): 'featured' | 'normal' | 'tall' {
  if (index === 0) return 'featured';
  if (total > 4 && index === total - 1 && total % 3 === 2) return 'featured';
  if (index === 4) return 'tall';
  return 'normal';
}

export default function DefaultProductContent({ active, isTransitioning }: { active: any, isTransitioning: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Hero animate-in on mount
  useEffect(() => {
    if (isTransitioning) return;
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
    );
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out', delay: 0.08 }
    );
  }, [active.id, isTransitioning]);

  // Hero image subtle parallax
  useEffect(() => {
    if (!imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -6, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });
    });
    return () => ctx.revert();
  }, [active.id]);

  // Bento cards scroll reveal
  useEffect(() => {
    if (!gridRef.current || isTransitioning) return;
    
    const ctx = gsap.context(() => {
      // Section header
      const header = sectionRef.current?.querySelector('[data-section-header]');
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 88%', id: `bento-header-${active.id}` }
          }
        );
      }

      // Cards staggered
      const cards = gridRef.current!.querySelectorAll('[data-bento-card]');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.55,
            delay: (i % 3) * 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              id: `bento-card-${active.id}-${i}`
            }
          }
        );

        // The colored top bar inside each card slides in
        const bar = card.querySelector('[data-card-bar]');
        if (bar) {
          gsap.fromTo(bar,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 0.7, ease: 'power3.out',
              delay: (i % 3) * 0.07 + 0.15,
              transformOrigin: 'left center',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
                id: `bento-bar-${active.id}-${i}`
              }
            }
          );
        }
      });

      // CTA section
      const cta = sectionRef.current?.querySelector('[data-cta-section]');
      if (cta) {
        gsap.fromTo(cta,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: cta, start: 'top 92%', id: `bento-cta-${active.id}` }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [active.id, isTransitioning]);

  return (
    <>
      {/* ══════════════════════════════
          HERO
         ══════════════════════════════ */}
      <section ref={heroRef} className={styles.hero}>
        {/* Left */}
        <div ref={contentRef} className={styles.heroLeft}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroNum}>{active.number || "00"}</span>
            <span className={styles.heroDivider} />
            <span className={styles.heroTagline}>{active.tagline || active.title}</span>
          </div>

          <h1 className={styles.heroName}>{active.name}</h1>

          <p className={styles.heroDesc}>{active.desc}</p>

          <div className={styles.heroActions}>
            <Link href="/contacto" id={`cta-hero-${active.id}`} className={styles.heroCta}>
              {active.btnText || "Saber más"} <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            {active.isDev && (
              <span className={styles.heroDevNote}>
                En desarrollo activo
              </span>
            )}
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{active.features?.length || 0}</span>
              <span className={styles.heroStatLabel}>módulos</span>
            </div>
            <span className={styles.heroStatSep} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>Web</span>
              <span className={styles.heroStatLabel}>plataforma</span>
            </div>
            <span className={styles.heroStatSep} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>SaaS</span>
              <span className={styles.heroStatLabel}>modelo</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className={styles.heroRight}>
          {/* Decorative color ring */}
          <div className={styles.heroRing} />
          <div className={styles.heroImgFrame}>
            <Image
              ref={imgRef}
              src={active.image}
              alt={active.name}
              fill
              className={styles.heroImg}
              preload
            />
            {/* Floating label */}
            <div className={styles.heroLabel}>
              {active.Icon ? <active.Icon size={15} /> : <Layers size={15} />}
              <span>{active.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURES BENTO
         ══════════════════════════════ */}
      {(active.features && active.features.length > 0) && (
        <section ref={sectionRef} className={styles.featSection}>

          {/* Header */}
          <div data-section-header className={styles.featHeader}>
            <div className={styles.featHeaderLeft}>
              <span className={styles.featLabel}>Lo que incluye</span>
              <h2 className={styles.featTitle}>{active.name === 'Masticod' ? 'Qué incluye Masticod' : 'Cómo funciona DataPilot'}</h2>
            </div>
            <div className={styles.featHeaderRight}>
              <span className={styles.featCount}>
                <span className={styles.featCountNum}>{active.features?.length || 0}</span>
                <span className={styles.featCountLabel}>módulos incluidos</span>
              </span>
            </div>
          </div>

          {/* Bento Grid */}
          <div ref={gridRef} className={styles.bentoGrid}>
            {active.features.map((f: any, i: number) => {
              const size = getCardSize(i, active.features.length);
              const FeatIcon = FEATURE_ICONS[f.id] || Layers;

              return (
                <div
                  key={f.id}
                  data-bento-card
                  id={`feat-${active.id}-${f.id}`}
                  className={`${styles.bentoCard} ${size === 'featured' ? styles.bentoFeatured : ''} ${size === 'tall' ? styles.bentoTall : ''}`}
                >
                  {/* Colored top bar */}
                  <div data-card-bar className={styles.cardBar} />

                  <div className={styles.cardInner}>
                    {/* Icon bubble */}
                    <div className={styles.cardIconWrap}>
                      <FeatIcon size={20} strokeWidth={1.8} />
                    </div>

                    {/* Index */}
                    <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>

                    {/* Title */}
                    <h3 className={`${styles.cardTitle} ${size === 'featured' ? styles.cardTitleLg : ''}`}>
                      {f.title}
                    </h3>

                    {/* Description */}
                    <p className={styles.cardDesc}>{f.desc}</p>

                    {/* Ghost number decoration */}
                    <span className={styles.cardGhost}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA strip */}
          <div data-cta-section className={styles.ctaStrip}>
            <div className={styles.ctaStripLeft}>
              <p className={styles.ctaStripTitle}>¿Listo para empezar?</p>
              <p className={styles.ctaStripSub}>Habla con nosotros y te ayudamos a elegir la solución ideal.</p>
            </div>
            <Link href="/contacto" id={`cta-feat-${active.id}`} className={styles.ctaStripBtn}>
              Contactar ahora <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

        </section>
      )}
    </>
  );
}
