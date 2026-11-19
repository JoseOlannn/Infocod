"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, Clock, Activity, CalendarDays, LayoutDashboard, Plus, Columns, Settings, Circle, CheckCircle2, MoreHorizontal, PenSquare, Trash2, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import styles from './AgendaPlusContent.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AgendaPlusContent({ active, isTransitioning }: { active: any, isTransitioning: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const dashRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);
  const kanbanRef = useRef<HTMLDivElement>(null);

  // Hero animations
  useEffect(() => {
    if (isTransitioning) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".heroText",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  // Dashboard Cards Animation
  useEffect(() => {
    if (!dashRef.current || isTransitioning) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-dash-card]');
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: dashRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
          id: 'dash-cards'
        }
      });
    }, dashRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  // Calendar Animation
  useEffect(() => {
    if (!calRef.current || isTransitioning) return;
    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray('[data-cal-cell]');
      gsap.to(cells, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: calRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
          id: 'cal-cells'
        }
      });
    }, calRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  // Kanban Cards Animation
  useEffect(() => {
    if (!kanbanRef.current || isTransitioning) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-k-card]');
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: kanbanRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
          id: 'kanban-cards'
        }
      });
    }, kanbanRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  // General Scroll Reveal (All Sections)
  useEffect(() => {
    if (isTransitioning) return;
    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray('[data-scroll-reveal]');
      revealElements.forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  // Snake Unpinned Animation (Scrub as you scroll down)
  useEffect(() => {
    if (isTransitioning) return;
    const ctx = gsap.context(() => {
      const path = document.getElementById('snakePathActive') as unknown as SVGPathElement | null;
      if (!path) return;
      
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      // Draw path over the full section height
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".snake-section",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      // Individual trigger for each snake card
      const cards = gsap.utils.toArray('.snake-step');
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.8, y: 80 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <div ref={containerRef} className={styles.container}>
      
      {/* ── HERO ── */}
      <section 
        ref={heroRef} 
        className={styles.hero} 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(8, 11, 20, 0.75) 0%, rgba(8, 11, 20, 0.4) 45%, rgba(8, 11, 20, 1) 100%), url('/productos/agenda+/agenda inicio.png')` 
        }}
        data-scroll-reveal
      >
        <div className={styles.heroContent}>
          <div className={`${styles.heroTitleWrap} heroText`}>
            <Image 
              src="/productos/agenda+/agenda+.png" 
              alt="Logo Agenda+" 
              width={60} 
              height={60} 
              className={styles.heroLogo}
            />
            <h1 className={styles.heroTitle}>Agenda+</h1>
          </div>
          <p className={`${styles.heroDesc} heroText`}>
            {active.desc} Más que un calendario, es tu centro de operaciones personal.
          </p>
        </div>
      </section>

      {/* ── EXPLAINER ── */}
      <section className={styles.explainerSection} data-scroll-reveal>
        <h2 className={styles.heroTitle} style={{fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '1rem', color: '#fff'}}>
          Tu tiempo es el activo más valioso. <br />
          <span>Agenda+ lo organiza.</span>
        </h2>
      </section>

      {/* ── DASHBOARD SIMULADO ── */}
      <section className={styles.mockupSection} ref={dashRef} data-scroll-reveal>
        <div className={styles.mockupContainer}>
          
          {/* Top Row */}
          <div className={styles.dashTop}>
            <div className={styles.dashGreeting}>
              <span className={styles.dashDate}>Viernes, 28 de Agosto de 2026</span>
              <span className={styles.dashHello}>Buenas noches.</span>
            </div>
            <div className={styles.dashClock}>
              <Clock size={20} />
              <span>19:42</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className={styles.dashStats}>
            <div data-dash-card className={`${styles.dashCard} ${styles.cardGreen}`}>
              <span className={styles.statLabel}>Progreso Diario</span>
              <span className={styles.statValue}>0%</span>
              <span className={styles.statDesc}>0 de 7 completadas</span>
            </div>
            <div data-dash-card className={`${styles.dashCard} ${styles.cardOrange}`}>
              <span className={styles.statLabel}>Alta Prioridad</span>
              <span className={styles.statValue}>0</span>
              <span className={styles.statDesc}>Pendientes</span>
            </div>
            <div data-dash-card className={`${styles.dashCard} ${styles.cardPurple}`}>
              <span className={styles.statLabel}>Eventos Hoy</span>
              <span className={styles.statValue}>0</span>
              <span className={styles.statDesc}>Eventos programados</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className={styles.dashBottom}>
            <div data-dash-card className={styles.dashChart}>
              <div className={styles.dashChartHeader}>
                <Activity size={18} /> Productividad Semanal (Últimos 7 días)
              </div>
              <div className={styles.emptyState}>Generando métricas...</div>
            </div>
            <div data-dash-card className={styles.dashAgenda}>
              <div className={styles.dashAgendaHeader}>
                <CalendarDays size={18} /> Agenda Próxima
              </div>
              <div className={styles.emptyState}>Sin eventos próximos</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEPARADOR DE TEXTO ── */}
      <section className={styles.explainerSection} style={{padding: '2rem 5% 4rem'}} data-scroll-reveal>
        <p className={styles.heroDesc} style={{margin: '0 auto', fontSize: '1.25rem', color: '#fff', textAlign: 'center'}}>
          Con <strong>Agenda+</strong> podrás organizar tu calendario sin esfuerzo y vincularlo 
          directamente con tus plataformas favoritas para mantener todo sincronizado en un solo lugar.
        </p>
      </section>

      {/* ── CALENDARIO SIMULADO ── */}
      <section className={styles.mockupSection} ref={calRef} data-scroll-reveal>
        <div className={styles.mockupContainer}>
          
          <div className={styles.mockupTopBar}>
            <div className={styles.mockupHeaderInfo}>
              <div className={styles.mockupIcon}><CalendarDays size={24} /></div>
              <div className={styles.mockupTitleWrap}>
                <span className={styles.mockupTitle}>Calendario</span>
                <span className={styles.mockupSubtitle}>Planifica tu tiempo y eventos</span>
              </div>
            </div>
            <button className={styles.mockupBtnPrimary}>
              <Plus size={18} /> Nuevo evento
            </button>
          </div>

          <div className={styles.calBanner}>
            <div className={styles.calBannerLeft}>
              <div className={styles.calBannerIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                  <path d="M12 18V12L7 12"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <div className={styles.calBannerText}>
                <span className={styles.calBannerTitle}>Conectar cuenta de Google Calendar</span>
                <span className={styles.calBannerDesc}>Importa y sincroniza todos tus eventos automáticamente</span>
              </div>
            </div>
            <ArrowRight size={18} color="#9CA3AF" />
          </div>

          <div className={styles.calBody}>
            {/* Grid Area */}
            <div className={styles.calGridArea}>
              <div className={styles.calGridHeader}>
                <h3 className={styles.calMonthTitle}>Agosto De 2026</h3>
                <div className={styles.calControls}>
                  <button className={styles.calBtn}>HOY</button>
                  <button className={styles.calBtn}><ChevronLeft size={14}/></button>
                  <button className={styles.calBtn}><ChevronRight size={14}/></button>
                </div>
              </div>
              <div className={styles.calGrid}>
                {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                  <div key={d} className={styles.calDayName}>{d}</div>
                ))}
                {/* Vacíos (para que el día 1 empiece, por ejemplo, el sábado) */}
                {[1,2,3,4,5].map(i => <div key={`v-${i}`} className={styles.calCell} style={{opacity:0}}></div>)}
                {/* Días (sólo mostrando algunos para efecto visual) */}
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(d => (
                  <div key={d} data-cal-cell className={`${styles.calCell} ${d === 28 ? styles.calToday : ''}`} style={{ position: 'relative' }}>
                    <span className={styles.calDayNum} style={d === 28 ? { position: 'relative', zIndex: 10 } : {}}>{d}</span>
                    {d === 26 && <div className={styles.calEventBadge} style={{background: '#3B82F6'}}>Reunión</div>}
                    {d === 28 && (
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', zIndex: 5 }}>
                        <Image src="/productos/agenda+/chuy 1.png" alt="Chuy" width={80} height={80} style={{ objectFit: 'contain', width: '100%', height: '100%', transform: 'scale(1.2)' }} />
                      </div>
                    )}
                    {d === 31 && <div className={styles.calEventBadge} style={{background: '#10B981'}}>Entrega</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.calSide}>
              <h4 className={styles.calSideTitle}>Agenda del día</h4>
              <span className={styles.calSideDate}>Viernes, 28 de Agosto</span>
              
              <div className={styles.calSideEmpty}>
                <div style={{ width: '140px', height: '140px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/productos/agenda+/chuy 1.png" alt="Chuy" width={160} height={160} style={{ objectFit: 'contain', transform: 'scale(1.8)' }} />
                </div>
                <div className={styles.mockupTitleWrap} style={{alignItems:'center'}}>
                  <span className={styles.calSideEmptyTitle}>Cita con Chuy</span>
                  <span className={styles.calSideEmptyDesc}>Todo el día</span>
                </div>
                <button className={styles.calSideBtn}>Editar Evento</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEPARADOR DE TEXTO (Kanban) ── */}
      <section className={styles.explainerSection} style={{padding: '2rem 5% 4rem'}} data-scroll-reveal>
        <p className={styles.heroDesc} style={{margin: '0 auto', fontSize: '1.25rem', color: '#fff', textAlign: 'center'}}>
          No dejes que los proyectos se estanquen. Usa el <strong>Tablero Kanban</strong> para 
          visualizar tu flujo de trabajo, arrastrar tareas y ver tu progreso en tiempo real.
        </p>
      </section>

      {/* ── KANBAN SIMULADO ── */}
      <section className={styles.mockupSection} ref={kanbanRef} data-scroll-reveal>
        <div className={styles.mockupContainer}>
          
          <div className={styles.mockupTopBar}>
            <div className={styles.mockupHeaderInfo}>
              <div className={styles.mockupIcon}><Columns size={24} /></div>
              <div className={styles.mockupTitleWrap}>
                <span className={styles.mockupTitle}>Tablero Kanban</span>
                <span className={styles.mockupSubtitle}>Arrastra las tareas para cambiar su estado</span>
              </div>
            </div>
            <button className={styles.mockupBtnPrimary}>
              <Plus size={18} /> Añadir tarea
            </button>
          </div>

          <div className={styles.kanbanBoard}>
            
            {/* Col 1 */}
            <div className={styles.kCol}>
              <div className={styles.kColHeader}>
                <span>Pendientes</span>
                <span className={styles.kBadge}>(3)</span>
              </div>
              
              <div data-k-card className={styles.kCard}>
                <div className={styles.kCardHeader}>
                  <span className={styles.kCardTitle}>Preparar Reporte Trimestral</span>
                  <div className={styles.kCardActions}>
                    <PenSquare size={14} />
                    <Trash2 size={14} />
                  </div>
                </div>
                <p className={styles.kCardDesc}>Objetivo:<br/>Recopilar métricas de ventas y armar presentación para directivos.</p>
                <div className={styles.kCardMeta}>
                  <span className={styles.kMetaBadge}>Inicio: 2026-10-01 09:00</span>
                  <span className={styles.kMetaBadge}>Fin: 2026-10-05 17:00</span>
                </div>
                <div className={styles.kCardFooter}>
                  <span className={styles.kPriority} style={{color: '#F87171', background: 'rgba(248,113,113,0.1)'}}>ALTA</span>
                  <div className={styles.kChecks}>
                    <Circle size={14} />
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </div>

              <div data-k-card className={styles.kCard}>
                <div className={styles.kCardHeader}>
                  <span className={styles.kCardTitle}>Revisión de Correos</span>
                  <div className={styles.kCardActions}>
                    <PenSquare size={14} />
                    <Trash2 size={14} />
                  </div>
                </div>
                <div className={styles.kCardMeta}>
                  <span className={styles.kMetaBadge}>Inicio: Hoy 08:00</span>
                  <span className={styles.kMetaBadge}>Fin: Hoy 09:00</span>
                </div>
                <div className={styles.kCardFooter}>
                  <span className={styles.kPriority}>MEDIA</span>
                  <div className={styles.kChecks}>
                    <Circle size={14} />
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </div>

              <div data-k-card className={styles.kCard}>
                <div className={styles.kCardHeader}>
                  <span className={styles.kCardTitle}>Planificar semana</span>
                  <div className={styles.kCardActions}>
                    <PenSquare size={14} />
                    <Trash2 size={14} />
                  </div>
                </div>
                <div className={styles.kCardFooter} style={{marginTop: '0.5rem'}}>
                  <span className={styles.kPriority} style={{color: '#60A5FA', background: 'rgba(96,165,250,0.1)'}}>BAJA</span>
                  <div className={styles.kChecks}>
                    <Circle size={14} />
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </div>

            </div>

            {/* Col 2 */}
            <div className={styles.kCol}>
              <div className={styles.kColHeader}>
                <span>En Progreso</span>
                <span className={styles.kBadge}>(1)</span>
              </div>
              <div data-k-card className={styles.kCard}>
                <div className={styles.kCardHeader}>
                  <span className={styles.kCardTitle}>Reunión de Sincronización</span>
                  <div className={styles.kCardActions}>
                    <PenSquare size={14} />
                    <Trash2 size={14} />
                  </div>
                </div>
                <p className={styles.kCardDesc}>Objetivo:<br/>Alinear expectativas con el equipo de ventas.</p>
                <div className={styles.kCardMeta}>
                  <span className={styles.kMetaBadge}>Inicio: Hoy 10:00</span>
                  <span className={styles.kMetaBadge}>Fin: Hoy 11:30</span>
                </div>
                <div className={styles.kCardFooter}>
                  <span className={styles.kPriority} style={{color: '#F87171', background: 'rgba(248,113,113,0.1)'}}>ALTA</span>
                  <div className={styles.kChecks}>
                    <Circle size={14} />
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className={styles.kCol} style={{background: 'rgba(16, 185, 129, 0.03)'}}>
              <div className={styles.kColHeader}>
                <span>Completadas</span>
                <span className={styles.kBadge}>(2)</span>
              </div>
              
              <div data-k-card className={styles.kCard} style={{ opacity: 0.5 }}>
                <div className={styles.kCardHeader}>
                  <span className={styles.kCardTitle} style={{textDecoration: 'line-through', color: '#6B7280'}}>Actualizar CRM</span>
                  <div className={styles.kCardActions}>
                    <Trash2 size={14} />
                  </div>
                </div>
                <div className={styles.kCardFooter} style={{marginTop: '0.5rem'}}>
                  <span className={styles.kPriority}>MEDIA</span>
                  <div className={styles.kChecks}>
                    <CheckCircle2 size={14} color="#10B981" />
                  </div>
                </div>
              </div>

              <div data-k-card className={styles.kCard} style={{ opacity: 0.5 }}>
                <div className={styles.kCardHeader}>
                  <span className={styles.kCardTitle} style={{textDecoration: 'line-through', color: '#6B7280'}}>Pagar servicios</span>
                  <div className={styles.kCardActions}>
                    <Trash2 size={14} />
                  </div>
                </div>
                <div className={styles.kCardFooter} style={{marginTop: '0.5rem'}}>
                  <span className={styles.kPriority}>MEDIA</span>
                  <div className={styles.kChecks}>
                    <CheckCircle2 size={14} color="#10B981" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECCIÓN SERPIENTE (SNAKE ANIMATION) ── */}
      <section className={`${styles.snakeSection} snake-section`} data-scroll-reveal>
        <div className={styles.snakeTitleWrap}>
          <h3 className={styles.snakeTitle}>Y mucho más que un simple gestor...</h3>
          <p className={styles.snakeSubtitle}>Descubre todo el poder que tienes a un clic.</p>
        </div>
        
        <div className={styles.snakeContainer}>
          <svg className={styles.snakeSvg} viewBox="0 0 800 2200" preserveAspectRatio="xMidYMin slice">
            <path 
              id="snakePath"
              d="M 400 0 Q 700 275 400 550 T 400 1100 T 400 1650 T 400 2200" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="4" 
            />
            <path 
              id="snakePathActive"
              d="M 400 0 Q 700 275 400 550 T 400 1100 T 400 1650 T 400 2200" 
              fill="none" 
              stroke="url(#snakeGrad)" 
              strokeWidth="8" 
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="snakeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          <div className={`${styles.snakeStep} ${styles.stepLeft} snake-step`} style={{top: '12%'}}>
            <div className={styles.snakeImageWrap}>
              <Image src="/productos/agenda+/card1.png" alt="Notificaciones" width={300} height={200} style={{objectFit: 'contain', width: '100%', height: '100%'}} />
            </div>
            <div className={styles.snakeTextContent}>
              <h4>Notificaciones Inteligentes</h4>
              <p>Avisos proactivos y recordatorios dinámicos para que nunca pierdas el ritmo de tu día.</p>
            </div>
          </div>

          <div className={`${styles.snakeStep} ${styles.stepRight} snake-step`} style={{top: '37%'}}>
            <div className={styles.snakeImageWrap}>
              <Image src="/productos/agenda+/card2.png" alt="Sincronización" width={300} height={200} style={{objectFit: 'contain', width: '100%', height: '100%'}} />
            </div>
            <div className={styles.snakeTextContent}>
              <h4>Sincronización Total</h4>
              <p>Conecta con Google Calendar, Outlook y Apple Calendar al instante, sin conflictos ni retrasos.</p>
            </div>
          </div>

          <div className={`${styles.snakeStep} ${styles.stepLeft} snake-step`} style={{top: '62%'}}>
            <div className={styles.snakeImageWrap}>
              <Image src="/productos/agenda+/card3.png" alt="Analíticas" width={300} height={200} style={{objectFit: 'contain', width: '100%', height: '100%'}} />
            </div>
            <div className={styles.snakeTextContent}>
              <h4>Analíticas de Productividad</h4>
              <p>Entiende cómo inviertes tu tiempo. Gráficas claras que te ayudan a optimizar tu semana laboral.</p>
            </div>
          </div>

          <div className={`${styles.snakeStep} ${styles.stepRight} snake-step`} style={{top: '87%'}}>
            <div className={styles.snakeIcon}><Target size={32}/></div>
            <div className={styles.snakeTextContent}>
              <h4>Gestión de Tareas Flexible</h4>
              <p>Asigna prioridades, establece fechas límite y desglosa grandes proyectos en pasos manejables.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={styles.ctaSection} data-scroll-reveal>
        <h2 className={styles.ctaTitle}>Toma el control de tu productividad hoy mismo.</h2>
        <a href="https://agendamas.infocod.codes/" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
          Ir a Agenda+ <ArrowRight size={20} strokeWidth={2.5} />
        </a>
      </section>

    </div>
  );
}
