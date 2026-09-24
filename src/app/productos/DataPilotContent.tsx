"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { 
  Activity, TrendingUp, Zap,
  BarChart3, DollarSign, 
  Brain, ArrowRight,
  Send, MessageSquare, SlidersHorizontal,
  Shield, Clock, Bell, ArrowUpRight, ArrowUp, ArrowDown,
  GripVertical, PieChart, Users, Package, ShoppingCart, Check
} from 'lucide-react';
import styles from './DataPilotContent.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dashboard Widget Types
interface Widget {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'donut' | 'kpi' | 'sparkline' | 'hbar' | 'list' | 'table';
  data: number[];
  label: string;
  color: string;
  colSpan?: number;
  rowSpan?: number;
}

const DASHBOARD_INITIAL_WIDGETS: Widget[] = [
  // Fila 1: 3 KPIs + 1 lista alta
  { id: 'w1', title: 'Ventas Totales', type: 'kpi', data: [522822], label: '+9%', color: '#1D4ED8', colSpan: 1, rowSpan: 1 },
  { id: 'w2', title: 'Artículos Vendidos', type: 'kpi', data: [7822], label: '-5%', color: '#DC2626', colSpan: 1, rowSpan: 1 },
  { id: 'w3', title: 'Compras Totales', type: 'kpi', data: [421400], label: '+4%', color: '#059669', colSpan: 1, rowSpan: 1 },
  { id: 'w4', title: 'Notificaciones', type: 'list', data: [], label: '', color: '#0A0A0A', colSpan: 1, rowSpan: 2 },
  
  // Fila 2: Barras anchas + Dona
  { id: 'w5', title: 'Resumen de Ganancias', type: 'bar', data: [120, 150, 180, 110, 140, 190, 160, 210, 180, 150, 200, 170], label: '', color: '#1D4ED8', colSpan: 2, rowSpan: 1 },
  { id: 'w6', title: 'Inventario General', type: 'donut', data: [42, 34, 24], label: '34.7%', color: '#0A0A0A', colSpan: 1, rowSpan: 1 },

  // Fila 3: Tabla ancha + Linea + Lista pequeña
  { id: 'w7', title: 'Últimas Facturas', type: 'table', data: [], label: '', color: '#0A0A0A', colSpan: 2, rowSpan: 1 },
  { id: 'w8', title: 'Stock de Productos', type: 'line', data: [10, 30, 20, 50, 40, 60, 80], label: '', color: '#1D4ED8', colSpan: 1, rowSpan: 1 },
  { id: 'w9', title: 'Transacciones Recientes', type: 'list', data: [], label: '', color: '#0A0A0A', colSpan: 1, rowSpan: 1 },
];

const DONUT_LABELS = ['Nómina', 'Proveedores', 'Marketing', 'Operación'];
const HBAR_LABELS = ['Electrónica', 'Oficina', 'Mobiliario', 'Accesorios'];

export default function DataPilotContent({ active, isTransitioning }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  // Chat
  const [chatStep, setChatStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // What-If
  const [adSpend, setAdSpend] = useState(5000);
  const [employeeCount, setEmployeeCount] = useState(15);
  const [growthRate, setGrowthRate] = useState(10);
  const projectedRevenue = adSpend * 4.2;
  const costPerEmployee = employeeCount * 12000;
  const projectedGrowth = ((growthRate / 100) * projectedRevenue).toFixed(0);

  // Counters
  const [counters, setCounters] = useState({ c1: 0, c2: 0, c3: 0 });
  const countersAnimated = useRef(false);

  // Ecosystem Graph State
  const [activeNode, setActiveNode] = useState<string>('pos');

  const ECO_MODULES = [
    { 
      id: 'pos', title: 'Ventas y Punto de Venta', icon: ShoppingCart,
      desc: 'Centraliza todas tus operaciones comerciales. Desde la emisión de facturas hasta el análisis del rendimiento de tus vendedores en tiempo real.',
      features: ['Facturación electrónica automática', 'Control centralizado de múltiples sucursales', 'Cortes de caja auditables al instante', 'Análisis de ticket promedio y comisiones']
    },
    { 
      id: 'inv', title: 'Inventario Inteligente', icon: Package,
      desc: 'Mantén el control absoluto de tus existencias. Evita el desabasto y reduce las mermas con un sistema que te avisa cuándo y cuánto comprar.',
      features: ['Control de stock multinivel en tiempo real', 'Transferencias ágiles entre almacenes', 'Alertas automáticas de reabastecimiento', 'Gestión detallada de mermas y caducidades']
    },
    { 
      id: 'fin', title: 'Finanzas y Tesorería', icon: DollarSign,
      desc: 'Obtén claridad financiera inmediata. Automatiza la conciliación y conoce la salud de tu flujo de caja sin depender de hojas de cálculo propensas a errores.',
      features: ['Proyección precisa del flujo de caja', 'Control de cuentas por cobrar y pagar', 'Conciliación bancaria automatizada', 'Estados financieros generados en un clic']
    },
    { 
      id: 'crm', title: 'CRM y Clientes', icon: Users,
      desc: 'Construye relaciones rentables a largo plazo. Conoce los hábitos de compra de tus clientes y personaliza su experiencia para aumentar su fidelidad.',
      features: ['Historial de compras y preferencias centralizado', 'Gestión de programas de fidelización', 'Segmentación avanzada de clientes', 'Seguimiento automatizado de prospectos']
    },
    { 
      id: 'ai', title: 'Motor de Inteligencia Artificial', icon: Brain,
      desc: 'Tu analista financiero personal disponible 24/7. Nuestra IA procesa toda la información de los demás módulos para entregarte recomendaciones estratégicas proactivas.',
      features: ['Predicción precisa de demanda de productos', 'Detección automática de fugas de capital', 'Sugerencia de precios dinámicos para maximizar margen', 'Análisis profundo de tendencias del mercado']
    }
  ];

  // Dashboard drag & drop
  const [dashboardWidgets, setDashboardWidgets] = useState<Widget[]>(DASHBOARD_INITIAL_WIDGETS);
  const [dragId, setDragId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(iv);
  }, []);

  // Chat simulation
  useEffect(() => {
    const t1 = setTimeout(() => setChatStep(1), 1200);
    const t2 = setTimeout(() => setChatStep(2), 2200);
    const t3 = setTimeout(() => setChatStep(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // ── GSAP ──
  useEffect(() => {
    if (isTransitioning) return;
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.dp-hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.dp-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo('.dp-hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.dp-hero-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.dp-hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.dp-hero-chat', { opacity: 0, x: 60, scale: 0.97 }, { opacity: 1, x: 0, scale: 1, duration: 0.9 }, '-=0.7');

      ScrollTrigger.create({
        trigger: statsRef.current, start: 'top 75%', once: true,
        onEnter: () => {
          if (!countersAnimated.current) { countersAnimated.current = true; animateCounters(); }
          gsap.fromTo('.dp-stat-item', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' });
          gsap.fromTo('.dp-stat-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 });
        },
      });

      ScrollTrigger.create({
        trigger: '.dp-problem-section', start: 'top 70%', once: true,
        onEnter: () => {
          gsap.fromTo('.dp-problem-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
          gsap.fromTo('.dp-problem-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' });
        },
      });

      ScrollTrigger.create({
        trigger: featuresRef.current, start: 'top 75%', once: true,
        onEnter: () => {
          gsap.fromTo('.dp-feat-head', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          gsap.fromTo('.dp-feat-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
        }
      });

      ScrollTrigger.create({
        trigger: workflowRef.current, start: 'top 75%', once: true,
        onEnter: () => {
          gsap.fromTo('.dp-wf-step', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' });
          gsap.fromTo('.dp-wf-arrow', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.2, delay: 0.2, ease: 'power2.out' });
        }
      });

      ScrollTrigger.create({
        trigger: dashRef.current, start: 'top 70%', once: true,
        onEnter: () => {
          gsap.fromTo('.dp-dash-head', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          gsap.fromTo('.dp-dash-hint', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' });
          gsap.fromTo('.dp-dash-canvas', { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' });
          gsap.fromTo('.dp-widget', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, delay: 0.4, ease: 'back.out(1.2)' });
        },
      });

      ScrollTrigger.create({
        trigger: simRef.current, start: 'top 70%', once: true,
        onEnter: () => {
          gsap.fromTo('.dp-sim-head', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          gsap.fromTo('.dp-sim-left', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
          gsap.fromTo('.dp-sim-right', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });
        },
      });

      ScrollTrigger.create({
        trigger: ctaRef.current, start: 'top 80%', once: true,
        onEnter: () => {
          gsap.fromTo(ctaRef.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  const animateCounters = useCallback(() => {
    const dur = 2200;
    const targets = { c1: 9, c2: 6, c3: 24 };
    const start = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounters({ c1: Math.round(targets.c1 * e), c2: Math.round(targets.c2 * e), c3: Math.round(targets.c3 * e) });
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, []);

  // Drag & Drop handlers (Internal Reordering)
  const handleDragStart = (id: string) => setDragId(id);
  const handleDragOver = (e: React.DragEvent, id: string) => { e.preventDefault(); setHoverId(id); };
  const handleDragLeave = () => setHoverId(null);
  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setHoverId(null); return; }
    setDashboardWidgets(prev => {
      const arr = [...prev];
      const fromIdx = arr.findIndex(w => w.id === dragId);
      const toIdx = arr.findIndex(w => w.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      [arr[fromIdx], arr[toIdx]] = [arr[toIdx], arr[fromIdx]];
      return arr;
    });
    setDragId(null);
    setHoverId(null);
  };
  const handleDragEnd = () => { setDragId(null); setHoverId(null); };

  // Widget chart renderers
  const renderWidget = (w: Widget) => {
    switch (w.type) {
      case 'bar': {
        const maxVal = Math.max(...w.data, 1);
        return (
          <div className={styles.wChart}>
            <div className={styles.wBars}>
              {w.data.map((v, i) => (
                <div key={i} className={styles.wBarCol}>
                  <div className={styles.wBarFill} style={{ height: `${(v / maxVal) * 100}%`, background: i % 2 === 0 ? '#1D4ED8' : '#0A0A0A' }}></div>
                </div>
              ))}
            </div>
            {w.label && (
              <div className={styles.wChartFooter}>
                <span className={styles.wBigNum}>{w.label}</span>
                <span className={styles.wChange}><ArrowUp size={10} /> +12.5%</span>
              </div>
            )}
          </div>
        );
      }
      case 'line':
        const pts = w.data.map((v, i) => `${(i / (w.data.length - 1)) * 100},${100 - v}`).join(' ');
        const areaPath = `M0,100 L${w.data.map((v, i) => `${(i / (w.data.length - 1)) * 100},${100 - v}`).join(' L')} L100,100 Z`;
        return (
          <div className={styles.wChart}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.wLineSvg}>
              <defs>
                <linearGradient id={`lg-${w.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill={`url(#lg-${w.id})`} />
              <polyline points={pts} fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className={styles.wChartFooter}>
              <span className={styles.wBigNum}>{w.label}</span>
              <span className={styles.wChange}><ArrowUp size={10} /> tendencia positiva</span>
            </div>
          </div>
        );
      case 'donut': {
        const total = w.data.reduce((a, b) => a + b, 0);
        let accum = 0;
        const radius = 35;
        const circum = 2 * Math.PI * radius;
        const labels = w.data.length === 3 ? ['Online', 'Tienda Física', 'Mayoristas'] : DONUT_LABELS;
        return (
          <div className={styles.wChart}>
            <div className={styles.wDonutWrap}>
              <svg viewBox="0 0 100 100" className={styles.wDonutSvg}>
                {w.data.map((v, i) => {
                  const pct = v / total;
                  const offset = circum * (1 - accum / total);
                  accum += v;
                  const colors = ['#1D4ED8', '#0A0A0A', '#6B7280', '#D1D5DB'];
                  return (
                    <circle key={i} cx="50" cy="50" r={radius} fill="none"
                      stroke={colors[i]} strokeWidth="8"
                      strokeDasharray={`${circum * pct} ${circum * (1 - pct)}`}
                      strokeDashoffset={offset}
                      transform="rotate(-90 50 50)"
                    />
                  );
                })}
                <text x="50" y="48" textAnchor="middle" className={styles.donutCenter}>{w.label}</text>
                <text x="50" y="58" textAnchor="middle" className={styles.donutSub}>total</text>
              </svg>
              <div className={styles.wDonutLegend}>
                {labels.slice(0, w.data.length).map((l, i) => (
                  <span key={i} className={styles.wLegendItem}>
                    <span className={styles.wLegendDot} style={{ background: ['#1D4ED8', '#0A0A0A', '#6B7280', '#D1D5DB'][i] }}></span>
                    {l} ({w.data[i]}%)
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 'kpi':
        return (
          <div className={styles.wKpi}>
            <span className={styles.wKpiVal}>
              {w.id === 'w1' || w.id === 'w3' ? '$' : ''}{w.data[0].toLocaleString()}
            </span>
            <span className={`${styles.wKpiLabel} ${w.color === '#DC2626' ? styles.kpiNegative : ''}`} style={{ color: w.color }}>
              {w.label}
            </span>
          </div>
        );
      case 'list':
        return (
          <div className={styles.wList}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.wListItem}>
                <div className={styles.wListIcon}></div>
                <div className={styles.wListText}>
                  <div className={styles.wListTitle}>Transacción #{Math.floor((i * 1337 + 42) % 10000)}</div>
                  <div className={styles.wListSub}>Hace {i * 2} horas</div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'table':
        return (
          <div className={styles.wTableWrap}>
            <table className={styles.wTable}>
              <thead><tr><th>Número</th><th>Fecha</th><th>Cliente</th><th>Monto</th><th>Estado</th></tr></thead>
              <tbody>
                {[1, 2, 3, 4].map(i => (
                  <tr key={i}>
                    <td>#PDK{24500 + i * 13}</td>
                    <td>{i} Ene, 2024</td>
                    <td>Jacob Jones</td>
                    <td>${(73600 - i * 1500).toLocaleString()}</td>
                    <td className={styles.tdPending}>Pendiente</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'hbar':
        return (
          <div className={styles.wChart}>
            <div className={styles.wHbars}>
              {w.data.map((v, i) => (
                <div key={i} className={styles.wHbarRow}>
                  <span className={styles.wHbarLabel}>{HBAR_LABELS[i]}</span>
                  <div className={styles.wHbarTrack}>
                    <div className={styles.wHbarFill} style={{ width: `${v}%`, background: i % 2 === 0 ? '#1D4ED8' : '#0A0A0A' }}></div>
                  </div>
                  <span className={styles.wHbarVal}>{v}%</span>
                </div>
              ))}
            </div>
            <div className={styles.wChartFooter}><span className={styles.wBigNum}>{w.label}</span></div>
          </div>
        );
      case 'sparkline': {
        const sp = w.data.map((v, i) => `${(i / (w.data.length - 1)) * 100},${100 - v}`).join(' ');
        return (
          <div className={styles.wKpi}>
            <span className={styles.wKpiNum}>{w.label}</span>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.wSparkSvg}>
              <polyline points={sp} fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.wKpiChange}><ArrowDown size={12} /> -2.1% vs mes anterior</span>
          </div>
        );
      }
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>

      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroLeft} ref={heroTextRef}>
          <div className={`${styles.devBadge} dp-hero-badge`}><span className={styles.devDot}></span>En Desarrollo</div>
          <h1 className={`${styles.heroTitle} dp-hero-title`}>
            Convierte datos<br/>en <span className={styles.heroHighlight}>decisiones.</span>
          </h1>
          <p className={`${styles.heroDesc} dp-hero-desc`}>
            DataPilot centralizará toda la información de tu empresa —ventas, finanzas, inventario, 
            clientes— y la transformará en conocimiento estratégico mediante Inteligencia Artificial.
          </p>
          <div className={`${styles.heroMeta} dp-hero-meta`}>
            <span><Shield size={14} /> ERP + BI + IA</span>
            <span><Clock size={14} /> Sin configuración compleja</span>
            <span><Zap size={14} /> Para PyMEs</span>
          </div>
          <div className={`dp-hero-cta`}>
            <button className={styles.heroBtn}><Bell size={15} /> Notificarme del lanzamiento</button>
          </div>
        </div>
        <div className={`${styles.heroRight} dp-hero-chat`}>
          <div className={styles.chatLabel}>Así funcionará el Copiloto IA</div>
          <div className={styles.chat}>
            <div className={styles.chatTop}>
              <div className={styles.chatDots}><span></span><span></span><span></span></div>
              <span className={styles.chatName}><Activity size={13} /> DataPilot Copilot</span>
              <span className={styles.chatOnline}><span className={styles.onlineDot}></span>Demo</span>
            </div>
            <div className={styles.chatBody}>
              {chatStep >= 1 && <div className={styles.userMsg}>¿Cuál es el margen de ganancia proyectado si aumentamos la pauta digital un 20%?</div>}
              {chatStep === 2 && (
                <div className={styles.aiMsg}><span className={styles.aiDot}><Brain size={12} /></span>
                  <div className={styles.aiBubble}><div className={styles.typing}><span></span><span></span><span></span></div></div>
                </div>
              )}
              {chatStep >= 3 && (
                <div className={styles.aiMsg}><span className={styles.aiDot}><Brain size={12} /></span>
                  <div className={styles.aiBubble}>
                    <p>He analizado los últimos 24 meses. Un aumento del 20% en pauta proyecta un incremento del <strong>14.5% en ventas brutas</strong>, con margen neto ajustado del 22%.</p>
                    <div className={styles.miniChart}>
                      <span className={styles.miniChartLabel}>Proyección de Ingresos</span>
                      <div className={styles.bars}>{[38, 50, 62, 76, 100].map((h, i) => (
                        <div key={i} className={styles.bar}><div className={styles.barInner} style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}></div><span>{['E','F','M','A','M'][i]}</span></div>
                      ))}</div>
                      <div className={styles.chartNote}><ArrowUpRight size={12} /> +14.5% proyectado</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.chatInput}>
              <MessageSquare size={14} />
              <span className={styles.chatPlaceholder}>Pregunta sobre tu negocio...{showCursor && <span className={styles.blink}>|</span>}</span>
              <button className={styles.sendBtn}><Send size={13} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className={styles.statsStrip} ref={statsRef}>
        <div className={styles.statsInner}>
          <div className={`${styles.statItem} dp-stat-item`}><span className={styles.statNum}>{counters.c1}</span><span className={styles.statLabel}>Módulos integrados</span></div>
          <div className={`${styles.statSep} dp-stat-line`}></div>
          <div className={`${styles.statItem} dp-stat-item`}><span className={styles.statNum}>{counters.c2}</span><span className={styles.statLabel}>Capacidades de IA</span></div>
          <div className={`${styles.statSep} dp-stat-line`}></div>
          <div className={`${styles.statItem} dp-stat-item`}><span className={styles.statNum}>{counters.c3}/7</span><span className={styles.statLabel}>Análisis en tiempo real</span></div>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className={`${styles.problemSection} dp-problem-section`}>
        <h2 className={`${styles.bigStatement} dp-problem-text`}>
          El 73% de las PyMEs toma decisiones<br/>
          basadas <span className={styles.strike}>en la intuición</span> <span className={styles.heroHighlight}>sin datos.</span>
        </h2>
        <p className={`${styles.problemDesc} dp-problem-desc`}>
          Múltiples archivos de Excel, información fragmentada, sin indicadores de desempeño. 
          DataPilot resolverá esto: centraliza, analiza con IA y entrega recomendaciones claras 
          para que cada decisión esté respaldada por datos reales.
        </p>
      </section>

      {/* ═══ ECOSISTEMA SPLIT VIEW (FORMAL) ═══ */}
      <section className={styles.ecoSection} ref={featuresRef}>
        <div className={`dp-feat-head ${styles.ecoHeader}`}>
          <span className={styles.eyebrow}>Ecosistema de Soluciones</span>
          <h2 className={styles.sectionTitle}>Todo tu negocio, sincronizado y potenciado</h2>
          <p className={styles.sectionSub}>DataPilot unifica las operaciones clave de tu empresa. Explora cómo cada módulo interactúa para darte control total de forma elegante y centralizada.</p>
        </div>

        <div className={styles.ecoSplit}>
          <div className={styles.ecoTabs}>
            {ECO_MODULES.map((m, index) => (
              <button 
                key={m.id}
                className={`${styles.ecoTab} ${activeNode === m.id ? styles.ecoTabActive : ''}`}
                onClick={() => setActiveNode(m.id)}
              >
                <span className={styles.ecoTabNum}>0{index + 1}</span>
                <span className={styles.ecoTabTitle}>{m.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.ecoContent}>
            {(() => {
              const active = ECO_MODULES.find(m => m.id === activeNode) || ECO_MODULES[0];
              const Icon = active.icon;
              return (
                <div className={styles.ecoPane} key={active.id}>
                  <div className={styles.ecoPaneHeader}>
                    <div className={styles.ecoPaneIcon}><Icon size={24} /></div>
                    <h3 className={styles.ecoPaneTitle}>{active.title}</h3>
                  </div>
                  <p className={styles.ecoPaneDesc}>{active.desc}</p>
                  
                  <div className={styles.ecoFeaturesList}>
                    {active.features.map((f, i) => (
                      <div key={i} className={styles.ecoFeatureItem}>
                        <div className={styles.ecoCheck}><Check size={14} strokeWidth={3} /></div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ═══ WORKFLOW / FLUJO AUTOMATIZADO ═══ */}
      <section className={styles.workflowSection} ref={workflowRef}>
        <div className={`dp-feat-head ${styles.featuresHead}`} style={{ marginBottom: '1.5rem' }}>
          <span className={styles.eyebrow}>Automatización Total</span>
          <h2 className={styles.sectionTitle}>Cómo fluye tu información</h2>
          <p className={styles.sectionSub}>DataPilot hace el trabajo pesado. Una sola acción desencadena actualizaciones en toda tu empresa al instante.</p>
        </div>
        
        <div className={styles.workflowGrid}>
          <div className={`${styles.workflowStep} dp-wf-step`}>
            <div className={styles.workflowIconWrap}><ShoppingCart size={24} /></div>
            <h4 className={styles.workflowTitle}>1. Venta Realizada</h4>
            <p className={styles.workflowDesc}>Tu vendedor cierra una venta en el punto de venta o en línea.</p>
          </div>
          
          <div className={`${styles.workflowArrow} dp-wf-arrow`}><ArrowRight size={20} /></div>
          
          <div className={`${styles.workflowStep} dp-wf-step`}>
            <div className={styles.workflowIconWrap}><Package size={24} /></div>
            <h4 className={styles.workflowTitle}>2. Stock Actualizado</h4>
            <p className={styles.workflowDesc}>El inventario se descuenta automáticamente en todas tus sucursales.</p>
          </div>
          
          <div className={`${styles.workflowArrow} dp-wf-arrow`}><ArrowRight size={20} /></div>
          
          <div className={`${styles.workflowStep} dp-wf-step`}>
            <div className={styles.workflowIconWrap}><DollarSign size={24} /></div>
            <h4 className={styles.workflowTitle}>3. Registro Contable</h4>
            <p className={styles.workflowDesc}>Finanzas registra el ingreso y emite la factura electrónica al instante.</p>
          </div>
          
          <div className={`${styles.workflowArrow} dp-wf-arrow`}><ArrowRight size={20} /></div>
          
          <div className={`${styles.workflowStep} dp-wf-step`}>
            <div className={styles.workflowIconWrap}><Brain size={24} color="#1D4ED8" /></div>
            <h4 className={styles.workflowTitle}>4. Análisis IA</h4>
            <p className={styles.workflowDesc}>La IA analiza el patrón de compra para sugerirte promociones futuras.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTERACTIVE DASHBOARD BUILDER (FULL WIDTH)
          ═══════════════════════════════════════════ */}
      <section className={styles.dashSection} ref={dashRef}>
        <div className={`dp-dash-head`}>
          <span className={styles.eyebrow}>Tu Dashboard, Tu Forma</span>
          <h2 className={styles.sectionTitle}>Todo bajo control en un solo panel</h2>
        </div>
        <p className={`${styles.dashHint} dp-dash-hint`}>
          <GripVertical size={14} /> Arrastra los widgets para reorganizar tu panel — diseñado para máxima visibilidad.
        </p>

        <div className={`${styles.dashCanvas} dp-dash-canvas`}>
          <div className={styles.dashChrome}>
            <div className={styles.dashDots}><span></span><span></span><span></span></div>
            <span className={styles.dashTitle}>Mi Dashboard Ejecutivo — DataPilot</span>
            <span className={styles.dashLive}><span className={styles.liveDot}></span>Live</span>
          </div>

          <div className={styles.widgetGrid}>
            {dashboardWidgets.map((w) => (
              <div 
                key={w.id} 
                className={`${styles.widget} ${dragId === w.id ? styles.widgetDragging : ''} ${hoverId === w.id ? styles.widgetDropTarget : ''} dp-widget`}
                style={{ 
                  gridColumn: `span ${w.colSpan || 1}`,
                  gridRow: `span ${w.rowSpan || 1}`
                }}
                draggable
                onDragStart={() => handleDragStart(w.id)}
                onDragOver={(e) => handleDragOver(e, w.id)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(w.id)}
                onDragEnd={handleDragEnd}
              >
                <div className={styles.widgetHead}>
                  <span className={styles.widgetTitle}>{w.title}</span>
                  <GripVertical size={14} className={styles.widgetGrip} />
                </div>
                {renderWidget(w)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SIMULATOR ═══ */}
      <section className={styles.simSection} ref={simRef}>
        <div className={`dp-sim-head`}>
          <span className={styles.eyebrow}>Simulación Predictiva</span>
          <h2 className={styles.sectionTitle}>Prueba antes de decidir</h2>
        </div>
        <div className={styles.simLayout}>
          <div className={`${styles.simLeft} dp-sim-left`}>
            <div className={styles.simHeader}><SlidersHorizontal size={18} /><span>Ajusta las variables</span></div>
            <div className={styles.sliders}>
              <div className={styles.slider}>
                <div className={styles.sliderHead}><span>Inversión en Publicidad</span><span className={styles.sliderVal}>${adSpend.toLocaleString()}</span></div>
                <input type="range" min="1000" max="20000" step="500" value={adSpend} onChange={e => setAdSpend(Number(e.target.value))} className={styles.range} />
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderHead}><span>Empleados</span><span className={styles.sliderVal}>{employeeCount}</span></div>
                <input type="range" min="1" max="100" step="1" value={employeeCount} onChange={e => setEmployeeCount(Number(e.target.value))} className={styles.range} />
              </div>
              <div className={styles.slider}>
                <div className={styles.sliderHead}><span>Tasa de Crecimiento</span><span className={styles.sliderVal}>{growthRate}%</span></div>
                <input type="range" min="1" max="50" step="1" value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))} className={styles.range} />
              </div>
            </div>
          </div>
          <div className={`${styles.simRight} dp-sim-right`}>
            <div className={styles.simResult}>
              <span className={styles.simEye}>Retorno Proyectado · 90 Días</span>
              <span className={styles.simBig}>${projectedRevenue.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
              <div className={styles.simDivider}></div>
              <div className={styles.simRow}><span>Costo Laboral</span><span>${costPerEmployee.toLocaleString()}</span></div>
              <div className={styles.simRow}><span>Crecimiento</span><span className={styles.simGreen}>+${Number(projectedGrowth).toLocaleString()}</span></div>
              <div className={styles.simRow}><span>ROI Estimado</span><span className={styles.simBlue}>{((projectedRevenue / (adSpend + costPerEmployee)) * 100).toFixed(0)}%</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA / EN DESARROLLO ═══ */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={`${styles.ctaBox} ${styles.ctaDev}`}>
          <div className={styles.ctaDevContent}>
            <div className={styles.ctaBadge}><span className={styles.devDot}></span> En Desarrollo Activo</div>
            <h2 className={styles.ctaTitle}>Espéralo con ansias</h2>
            <p className={styles.ctaDesc}>Estamos construyendo DataPilot para ti. Cada línea de código está pensada para revolucionar la forma en que administras tu negocio.</p>
          </div>
          <div className={styles.ctaDevImage}>
            <img src="/productos/datapilot/datachuy.png" alt="Chuy trabajando en DataPilot" className={styles.chuyImage} />
          </div>
        </div>
      </section>
    </div>
  );
}
