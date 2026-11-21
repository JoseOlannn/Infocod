"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Play,
  Plus,
  RotateCcw,
  Square,
} from 'lucide-react';
import styles from './CVForgeContent.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FormatId =
  | 'editorial'
  | 'ats'
  | 'harvard'
  | 'bento'
  | 'bicolumna'
  | 'entrevista';

interface FormatOption {
  id: FormatId;
  label: string;
  atsScore: number;
}

const FORMATS: FormatOption[] = [
  { id: 'editorial', label: 'Banner Editorial', atsScore: 94 },
  { id: 'ats', label: 'ATS Monocolumna', atsScore: 98 },
  { id: 'harvard', label: 'Harvard Ejecutivo', atsScore: 96 },
  { id: 'bento', label: 'Bento Portafolio', atsScore: 91 },
  { id: 'bicolumna', label: 'Ejecutivo Bicolumna', atsScore: 93 },
  { id: 'entrevista', label: 'Ficha de Entrevista', atsScore: 92 },
];

interface VacancyDemo {
  id: string;
  role: string;
  source: string;
  excerpt: string;
  baseScore: number;
  dimensions: { label: string; value: number }[];
  matched: string[];
  gaps: string[];
  kit: {
    cv: string;
    carta: string;
    linkedin: string;
  };
}

const VACANCIES: VacancyDemo[] = [
  {
    id: 'fullstack',
    role: 'Ingeniero Full-Stack Next.js & TypeScript',
    source: 'LinkedIn · Remoto LATAM',
    excerpt:
      'Buscamos perfil con experiencia en React, TypeScript, diseño de APIs REST, bases de datos PostgreSQL y despliegue continuo en la nube con enfoque en rendimiento y pruebas automatizadas.',
    baseScore: 86,
    dimensions: [
      { label: 'Alineación de contenido', value: 88 },
      { label: 'Requisitos obligatorios', value: 82 },
      { label: 'Integridad estructural', value: 96 },
      { label: 'Legibilidad ATS', value: 98 },
    ],
    matched: ['React / Next.js', 'TypeScript', 'APIs REST', 'PostgreSQL'],
    gaps: ['CI/CD con GitHub Actions', 'Pruebas E2E Playwright', 'Docker en producción'],
    kit: {
      cv: 'Se reordenó "Arquitectura Web & APIs" al primer bloque, priorizando resultados medibles en latencia (-38%) y despliegue continuo antes de los proyectos académicos.',
      carta:
        'Hola equipo de Ingeniería: tras revisar su vacante de Full-Stack, comparto mi CV adaptado con foco en sistemas Next.js, TypeScript y PostgreSQL en producción. Me entusiasma aportar en escalabilidad y entregas confiables desde el primer sprint.',
      linkedin:
        'Hola! Vi la vacante de Full-Stack (Next.js/TS). Tengo experiencia construyendo APIs REST y apps en producción con PostgreSQL y despliegues automatizados. ¿Te comparto mi CV adaptado de 1 hoja?',
    },
  },
  {
    id: 'datos',
    role: 'Analista de Datos & Business Intelligence',
    source: 'OCC · Híbrido CDMX',
    excerpt:
      'Responsable de modelado SQL, tableros ejecutivos en Power BI, automatización de reportes en Python y análisis de KPIs comerciales para dirección general.',
    baseScore: 81,
    dimensions: [
      { label: 'Alineación de contenido', value: 80 },
      { label: 'Requisitos obligatorios', value: 76 },
      { label: 'Integridad estructural', value: 95 },
      { label: 'Legibilidad ATS', value: 97 },
    ],
    matched: ['SQL & PostgreSQL', 'Python (Pandas)', 'Visualización de KPIs'],
    gaps: ['Modelado DAX en Power BI', 'Pipelines ETL automatizados', 'Storytelling ejecutivo'],
    kit: {
      cv: 'Se promovió el bloque de Datos & Analítica al encabezado del perfil y se agruparon proyectos de automatización de reportes y predicción por encima del desarrollo móvil.',
      carta:
        'Estimado equipo de Talento: presento mi postulación para Analista de Datos & BI. He transformado fuentes dispersas en tableros claros con SQL y Python, reduciendo horas de reporte manual cada semana.',
      linkedin:
        'Hola! Me interesa la posición de Analista de Datos & BI. Trabajo con SQL, Python y tableros orientados a dirección. Con gusto te comparto mi resumen adaptado al puesto.',
    },
  },
  {
    id: 'producto',
    role: 'Product Engineer · Sistemas SaaS',
    source: 'Greenhouse · Remoto',
    excerpt:
      'Perfil híbrido capaz de traducir necesidades de negocio en interfaces limpias, experimentar rápido con usuarios y mantener arquitectura escalable de punta a punta.',
    baseScore: 84,
    dimensions: [
      { label: 'Alineación de contenido', value: 85 },
      { label: 'Requisitos obligatorios', value: 80 },
      { label: 'Integridad estructural', value: 94 },
      { label: 'Legibilidad ATS', value: 96 },
    ],
    matched: ['Diseño de interfaces', 'Arquitectura SaaS', 'Entrega end-to-end'],
    gaps: ['Métricas de activación', 'Pruebas A/B con usuarios', 'Design Systems documentados'],
    kit: {
      cv: 'Se destacaron los productos propios lanzados de cero a producción, enfatizando impacto en retención, claridad visual y velocidad de iteración.',
      carta:
        'Hola equipo de Producto: mi enfoque combina ingeniería limpia con criterio de diseño editorial. He llevado plataformas SaaS desde el concepto hasta producción cuidando cada detalle de uso.',
      linkedin:
        'Hola! Vi su búsqueda de Product Engineer en Greenhouse. Construyo productos SaaS end-to-end cuidando tanto arquitectura como experiencia. ¿Podemos conectar?',
    },
  },
];

const INTERVIEW_QA = [
  {
    q: 'Cuéntame de un proyecto técnico del que te sientas orgulloso y su impacto real.',
    a: 'Usa la estructura Situación → Acción → Resultado basada en tu proyecto de Plataforma Web Multi-sucursal: explica el cuello de botella inicial, cómo unificaste API + base de datos en TypeScript y cierra con la reducción del 40% en tiempos de operación.',
  },
  {
    q: '¿Cómo decides qué priorizar cuando tienes varias entregas urgentes?',
    a: 'Enlaza tu experiencia liderando sprints cortos: primero impacto en negocio y bloqueos de usuarios activos, luego deuda técnica crítica, manteniendo trazabilidad semanal con el equipo.',
  },
  {
    q: '¿Por qué cambiaste el enfoque de tus proyectos hacia sistemas escalables y datos?',
    a: 'Conecta tu formación en ingeniería con los resultados obtenidos: construir interfaces claras es solo la mitad; estructurar datos confiables detrás permite que las decisiones del equipo escalen sin fricción.',
  },
];

interface SheetProps {
  name: string;
  role: string;
  format: FormatId;
  tone: 'blue' | 'warm';
  fitOnePage: boolean;
  showProjects: boolean;
  showCerts: boolean;
  showLanguages: boolean;
  compactPreview?: boolean;
  variant?: 'web' | 'data';
  showWatermark?: boolean;
}

function CVSheetPreview({
  name,
  role,
  format,
  tone,
  fitOnePage,
  showProjects,
  showCerts,
  showLanguages,
  compactPreview = false,
  variant = 'web',
  showWatermark = false,
}: SheetProps) {
  const isWarm = tone === 'warm';
  const isData = variant === 'data';
  const secTitleClass = `${styles.cvSecTitle} ${isWarm || format === 'harvard' || format === 'ats' ? styles.cvSecTitleWarm : ''}`;

  const renderHeader = () => {
    if (format === 'ats') {
      return (
        <div className={styles.cvHeaderPlain}>
          <h4 className={styles.cvName}>{name}</h4>
          <p className={styles.cvRole}>{role}</p>
          <div className={styles.cvContacts}>
            <span>contacto@ejemplo.dev</span>
            <span>+52 55 0102 0304</span>
            <span>Ciudad de México</span>
            <span>linkedin.com/in/perfil</span>
          </div>
        </div>
      );
    }
    if (format === 'harvard') {
      return (
        <div className={styles.cvHeaderHarvard}>
          <h4 className={styles.cvName}>{name}</h4>
          <p className={styles.cvRole}>{role}</p>
          <div className={styles.cvContacts}>
            <span>Ciudad de México</span>
            <span>·</span>
            <span>contacto@ejemplo.dev</span>
            <span>·</span>
            <span>github.com/perfil</span>
          </div>
        </div>
      );
    }
    return (
      <div className={`${styles.cvBanner} ${isWarm ? styles.cvBannerWarm : styles.cvBannerBlue}`}>
        <h4 className={styles.cvName}>{name}</h4>
        <p className={styles.cvRole}>{role}</p>
        <div className={styles.cvContacts}>
          <span>contacto@ejemplo.dev</span>
          <span>+52 55 0102 0304</span>
          <span>Ciudad de México</span>
          <span>linkedin.com/in/perfil</span>
        </div>
      </div>
    );
  };

  const experienceBlock = (
    <div className={styles.cvSection}>
      <h5 className={secTitleClass}>Experiencia Profesional</h5>
      <div className={styles.cvRow}>
        <div className={styles.cvDateCol}>2024 — Actualidad<br />{isData ? 'Híbrido · CDMX' : 'Remoto'}</div>
        <div>
          <p className={styles.cvItemTitle}>
            {isData ? 'Analista de Datos & Business Intelligence' : 'Desarrollador de Software Full-Stack'}
          </p>
          <p className={styles.cvItemSub}>
            {isData ? 'Consultora Analítica · SQL, Python & Power BI' : 'Estudio Tecnológico · Sistemas Web & APIs'}
          </p>
          <p className={styles.cvBodyText}>
            {isData
              ? 'Modelado de bases SQL, automatización de reportes semanales en Python y tableros ejecutivos de KPIs que redujeron en 12 horas el cierre operativo.'
              : 'Diseño e integración de plataformas web en React, TypeScript y PostgreSQL con despliegues automatizados y mejora de tiempos de respuesta en un 38%.'}
          </p>
        </div>
      </div>
    </div>
  );

  const projectsBlock = showProjects && (
    <div className={styles.cvSection}>
      <h5 className={secTitleClass}>Proyectos Destacados</h5>
      <div className={styles.cvRow}>
        <div className={styles.cvDateCol}>2025 — Actualidad</div>
        <div>
          <p className={`${styles.cvItemTitle} ${!isWarm && format === 'editorial' ? styles.cvItemTitleAccent : ''}`}>
            {isData ? 'Modelo Predictivo de Demanda Comercial' : 'Plataforma de Productividad & Analítica'}
          </p>
          <p className={styles.cvBodyText}>
            {isData
              ? 'Pipeline en Python (Pandas, Scikit-Learn) para pronóstico mensual de inventario y alertas tempranas de quiebre de stock.'
              : 'Arquitectura end-to-end para gestión de flujos, métricas en vivo y exportación estructurada en PDF/Word.'}
          </p>
        </div>
      </div>
      {!compactPreview && (
        <div className={styles.cvRow}>
          <div className={styles.cvDateCol}>2024 — 2025</div>
          <div>
            <p className={`${styles.cvItemTitle} ${!isWarm && format === 'editorial' ? styles.cvItemTitleAccent : ''}`}>
              {isData ? 'Tablero Ejecutivo de Rentabilidad (Power BI)' : 'Motor de Automatización de Reportes'}
            </p>
            <p className={styles.cvBodyText}>
              {isData
                ? 'Consolidación de 4 fuentes transaccionales en un modelo DAX unificado para seguimiento diario de dirección.'
                : 'Pipeline en Python y SQL que consolida indicadores comerciales semanales sin intervención manual.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const skillsBlock = (
    <div className={styles.cvSection}>
      <h5 className={secTitleClass}>Habilidades</h5>
      <div className={styles.cvSkillsGrid}>
        <div>
          <p className={styles.cvSkillGroupTitle}>{isData ? 'Analítica & ML' : 'Desarrollo'}</p>
          <p className={styles.cvSkillGroupText}>
            {isData ? 'Python, Pandas, Scikit-Learn, Estadística' : 'TypeScript, React, Next.js, Node.js, Python'}
          </p>
        </div>
        <div>
          <p className={styles.cvSkillGroupTitle}>{isData ? 'BI & Bases de Datos' : 'Datos & Cloud'}</p>
          <p className={styles.cvSkillGroupText}>
            {isData ? 'SQL, PostgreSQL, Power BI (DAX), ETL' : 'PostgreSQL, SQL, Docker, CI/CD, Power BI'}
          </p>
        </div>
        <div>
          <p className={styles.cvSkillGroupTitle}>{isData ? 'Negocio' : 'Producto'}</p>
          <p className={styles.cvSkillGroupText}>
            {isData ? 'KPIs ejecutivos, Storytelling, Auditoría' : 'Diseño editorial, Pruebas QA, Arquitectura'}
          </p>
        </div>
      </div>
    </div>
  );

  const certsAndLangBlock = (
    <>
      {showCerts && (
        <div className={styles.cvSection}>
          <h5 className={secTitleClass}>Certificados / Constancias</h5>
          <p className={styles.cvBodyText}>
            {isData
              ? 'Google Data Analytics Professional · Microsoft Power BI Data Analyst · SQL Avanzado para Negocios'
              : 'AWS Cloud Practitioner · Arquitectura de Software Moderna · Testing Automatizado E2E'}
          </p>
        </div>
      )}
      {showLanguages && (
        <div className={styles.cvSection}>
          <h5 className={secTitleClass}>Idiomas</h5>
          <p className={styles.cvBodyText}>Español (Nativo) · Inglés (Profesional B2)</p>
        </div>
      )}
    </>
  );

  return (
    <article className={`${styles.a4Sheet} ${fitOnePage || compactPreview ? styles.a4Compact : ''}`}>
      {showWatermark && (
        <div className={styles.demoWatermark} aria-hidden="true">
          <span>VISTA PREVIA · DEMO CVFORGE.</span>
        </div>
      )}

      {format === 'entrevista' && (
        <div className={styles.cvInterviewBanner}>
          <strong>Ficha de Entrevista · Pitch 45s activo</strong>
          <span>3 logros clave listos</span>
        </div>
      )}

      {renderHeader()}

      <div className={styles.cvSection} style={{ marginTop: 0 }}>
        <h5 className={secTitleClass}>Perfil Profesional</h5>
        <p className={styles.cvBodyText}>
          {isData
            ? 'Especialista en análisis de datos e inteligencia de negocios enfocado en transformar datos crudos en modelos predictivos, tableros claros y decisiones estratégicas medibles.'
            : 'Especialista en ingeniería de software enfocado en aplicaciones web rápidas, APIs limpias y arquitecturas escalables listas para producción.'}
        </p>
      </div>

      {format === 'bicolumna' ? (
        <div className={styles.cvTwoColBody}>
          <div>
            {experienceBlock}
            {projectsBlock}
          </div>
          <div>
            {skillsBlock}
            {certsAndLangBlock}
          </div>
        </div>
      ) : format === 'bento' ? (
        <div className={styles.cvSection}>
          <div className={styles.cvBentoGrid}>
            <div className={styles.cvBentoCell}>{experienceBlock}</div>
            <div className={styles.cvBentoCell}>{skillsBlock}</div>
            {showProjects && <div className={styles.cvBentoCell}>{projectsBlock}</div>}
            {(showCerts || showLanguages) && <div className={styles.cvBentoCell}>{certsAndLangBlock}</div>}
          </div>
        </div>
      ) : (
        <>
          {experienceBlock}
          {projectsBlock}
          {skillsBlock}
          {certsAndLangBlock}
        </>
      )}
    </article>
  );
}

export default function CVForgeContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  // Estado del Estudio de Currículums en vivo
  const [studioMode, setStudioMode] = useState<'editor' | 'compare'>('editor');
  const [activeFormat, setActiveFormat] = useState<FormatId>('editorial');
  const [tone, setTone] = useState<'blue' | 'warm'>('blue');
  const [fitOnePage, setFitOnePage] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showCerts, setShowCerts] = useState(true);
  const [showLanguages, setShowLanguages] = useState(true);
  const [candidateName, setCandidateName] = useState('Sofía Mendoza Ramírez');
  const [candidateRole, setCandidateRole] = useState('Ing. en Sistemas · Desarrollo Web & Datos');

  // Estado del Escáner ATS
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(VACANCIES[0].id);
  const [addedGaps, setAddedGaps] = useState<Record<string, string[]>>({});
  const [kitTab, setKitTab] = useState<'cv' | 'carta' | 'linkedin'>('cv');

  // Estado del Modo Entrevista
  const [openQaIndex, setOpenQaIndex] = useState<number>(0);
  const [pitchRunning, setPitchRunning] = useState(false);
  const [pitchSeconds, setPitchSeconds] = useState(0);

  // Sincronizar tema de papel crema en el Navbar mientras estamos en CVforge
  useEffect(() => {
    document.documentElement.dataset.navTheme = 'paper';
    return () => {
      delete document.documentElement.dataset.navTheme;
    };
  }, []);

  // Animaciones editoriales de entrada y scroll con GSAP ScrollTrigger
  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Hero entrance
        gsap.from('[data-cf-hero]', {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });

        gsap.from('[data-cf-hero-sheet]', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });

        // Scroll reveals para cada sección
        gsap.utils.toArray<HTMLElement>('[data-cf-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.72,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          });
        });

        // Stagger editorial para los 3 pasos del Perfil Maestro
        const masterSteps = pageRef.current?.querySelectorAll('[data-cf-step]');
        if (masterSteps && masterSteps.length > 0) {
          gsap.from(masterSteps, {
            y: 26,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: masterSteps[0],
              start: 'top 84%',
              once: true,
            },
          });
        }
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!pitchRunning) return;
    const interval = setInterval(() => {
      setPitchSeconds((prev) => {
        if (prev >= 45) {
          setPitchRunning(false);
          return 45;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pitchRunning]);

  const activeFormatObj = FORMATS.find((f) => f.id === activeFormat) ?? FORMATS[0];
  const currentVacancy = VACANCIES.find((v) => v.id === selectedVacancyId) ?? VACANCIES[0];
  const currentAddedGaps = addedGaps[currentVacancy.id] ?? [];
  const liveAtsScore = Math.min(99, currentVacancy.baseScore + currentAddedGaps.length * 4);

  const toggleGap = (gap: string) => {
    setAddedGaps((prev) => {
      const list = prev[currentVacancy.id] ?? [];
      const exists = list.includes(gap);
      return {
        ...prev,
        [currentVacancy.id]: exists ? list.filter((g) => g !== gap) : [...list, gap],
      };
    });
  };

  return (
    <div ref={pageRef} className={styles.page}>
      {/* ═══════════════════════════════════════════════════
          1. HERO EDITORIAL — LA HOJA SOBRE LA MESA
         ═══════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span data-cf-hero className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                04 · Estudio editorial de currículums · En desarrollo
              </span>

              <div data-cf-hero className={styles.brandMark}>
                CVforge<span className={styles.brandDot}>.</span>
              </div>

              <h1 data-cf-hero className={`${styles.editorialHeading} ${styles.heroTitle}`}>
                Tu trayectoria, en el formato que{' '}
                <span className={styles.editorialItalic}>merece</span>.
              </h1>

              <p data-cf-hero className={styles.sectionLead}>
                Crea, adapta y optimiza currículums profesionales para cada vacante sin volver a empezar desde cero. Precisión de escáner ATS con la claridad de un estudio editorial hecho a mano.
              </p>

              <div data-cf-hero className={styles.heroActions}>
                <a href="#estudio-cvforge" className={styles.primaryBtn}>
                  Probar el estudio
                  <ArrowRight size={16} />
                </a>
                <Link href="/contacto" className={styles.textAction}>
                  Notificarme al lanzamiento
                </Link>
              </div>

              <div data-cf-hero className={styles.heroMetaStrip}>
                <div>
                  <span className={styles.heroMetricNum}>6</span>
                  <span className={styles.heroMetricLabel}>Formatos A4 editoriales</span>
                </div>
                <div>
                  <span className={styles.heroMetricNum}>1:1</span>
                  <span className={styles.heroMetricLabel}>Exportación PDF y Word</span>
                </div>
                <div>
                  <span className={styles.heroMetricNum}>4</span>
                  <span className={styles.heroMetricLabel}>Dimensiones de análisis ATS</span>
                </div>
              </div>
            </div>

            <div data-cf-hero-sheet className={styles.heroRight}>
              <div className={styles.heroSheetWrap}>
                <div className={styles.heroAtsStamp}>
                  <span>ATS SCORE</span>
                  <span className={styles.heroAtsScore}>94%</span>
                </div>
                <CVSheetPreview
                  name="Sofía Mendoza Ramírez"
                  role="Ing. en Sistemas · Desarrollo Web & Datos"
                  format="editorial"
                  tone="blue"
                  fitOnePage
                  showProjects
                  showCerts
                  showLanguages
                  compactPreview
                />
              </div>
              <div className={styles.heroSheetCaption}>
                <span>FORMATO: BANNER EDITORIAL · A4</span>
                <span>1 HOJA · LISTO PARA ENVIAR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.inner}><div className={styles.divider} /></div>

      {/* ═══════════════════════════════════════════════════
          2. PASO 01 — PERFIL MAESTRO
         ═══════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div data-cf-reveal className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Paso 01 · Perfil Maestro</span>
            <h2 className={`${styles.editorialHeading} ${styles.sectionTitle}`}>
              Tu información, guardada una{' '}
              <span className={styles.editorialItalic}>sola vez</span>.
            </h2>
            <p className={styles.sectionLead}>
              Centraliza experiencia, proyectos, formación, certificaciones, idiomas y habilidades en un archivo vivo. Empieza desde cero o importa tu CV actual en segundos.
            </p>
          </div>

          <div className={styles.masterFlow}>
            <div data-cf-step className={styles.masterStep}>
              <span className={styles.masterStepNum}>01 / IMPORTACIÓN</span>
              <h3 className={styles.masterStepTitle}>Sube tu CV actual</h3>
              <p className={styles.masterStepDesc}>
                Autocompleta tu historial extrayendo fechas, logros, herramientas y enlaces sin capturar todo a mano.
              </p>
              <div className={styles.formatChips}>
                <span className={styles.monoChip}>PDF</span>
                <span className={styles.monoChip}>Word .docx</span>
                <span className={styles.monoChip}>Respaldo JSON</span>
              </div>
            </div>

            <div data-cf-step className={styles.masterStep}>
              <span className={styles.masterStepNum}>02 / ARCHIVO MAESTRO</span>
              <h3 className={styles.masterStepTitle}>Una única fuente de verdad</h3>
              <p className={styles.masterStepDesc}>
                Actualiza un puesto, certificado o enlace una vez y tenlo disponible en todas las versiones que generes después.
              </p>
              <div className={styles.formatChips}>
                <span className={styles.monoChip}>Experiencia</span>
                <span className={styles.monoChip}>Proyectos</span>
                <span className={styles.monoChip}>Certificados</span>
              </div>
            </div>

            <div data-cf-step className={styles.masterStep}>
              <span className={styles.masterStepNum}>03 / VERSIONES A MEDIDA</span>
              <h3 className={styles.masterStepTitle}>Adapta sin rehacer</h3>
              <p className={styles.masterStepDesc}>
                Activa, oculta o reordena secciones según el puesto: Sistemas, Datos, Producto o Dirección, siempre desde tu mismo perfil.
              </p>
              <div className={styles.formatChips}>
                <span className={styles.monoChip}>CV 1 · Web</span>
                <span className={styles.monoChip}>CV 2 · Datos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.inner}><div className={styles.divider} /></div>

      {/* ═══════════════════════════════════════════════════
          3. PASO 02 — ESTUDIO DE CURRÍCULUMS EN VIVO
         ═══════════════════════════════════════════════════ */}
      <section id="estudio-cvforge" className={styles.section}>
        <div className={styles.inner}>
          <div data-cf-reveal className={styles.studioTopBar}>
            <div>
              <span className={styles.eyebrow}>Paso 02 · Estudio de Currículums en vivo</span>
              <h2 className={`${styles.editorialHeading} ${styles.sectionTitle}`}>
                Crea tu currículum y compáralo en{' '}
                <span className={styles.editorialItalic}>tiempo real</span>.
              </h2>
              <p className={styles.sectionLead} style={{ marginTop: '0.75rem' }}>
                Con <strong>CVforge.</strong> eliges entre 6 formatos profesionales, ajustas secciones o comprimes todo a 1 hoja con vista A4 en vivo, y después puedes exportarlo fielmente en <strong>PDF</strong> y <strong>Word (.docx)</strong>.
              </p>
              <div className={styles.promoHighlights}>
                <span className={styles.promoHighlightItem}>
                  <span className={styles.promoHighlightDot} /> 6 formatos editoriales listos para ATS
                </span>
                <span className={styles.promoHighlightItem}>
                  <span className={styles.promoHighlightDot} /> Ajuste inteligente a 1 hoja
                </span>
                <span className={styles.promoHighlightItem}>
                  <span className={styles.promoHighlightDot} /> Comparativa real entre versiones
                </span>
              </div>
            </div>
          </div>

          <div className={styles.studioSubTabs}>
            <button
              type="button"
              onClick={() => setStudioMode('editor')}
              className={`${styles.studioTab} ${studioMode === 'editor' ? styles.studioTabActive : ''}`}
            >
              Simulador de editor <span className={styles.studioTabCount}>6 formatos</span>
            </button>
            <button
              type="button"
              onClick={() => setStudioMode('compare')}
              className={`${styles.studioTab} ${studioMode === 'compare' ? styles.studioTabActive : ''}`}
            >
              Comparar versiones <span className={styles.studioTabCount}>2 perfiles</span>
            </button>
          </div>

          <div className={styles.demoNotice}>
            <span>
              <strong>Vista previa interactiva de muestra:</strong> prueba cómo responde el estudio editorial cambiando formato, nombre, secciones o comparando versiones. En la plataforma oficial podrás guardar tu perfil real y exportarlo en <strong>PDF A4</strong> y <strong>Word (.docx)</strong>.
            </span>
            <span className={styles.demoBadge}>MODO DEMO</span>
          </div>

          {studioMode === 'editor' ? (
            <div className={styles.studioWorkspace}>
              {/* Controles del estudio */}
              <div className={styles.editorPanel}>
                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>1. Formato profesional (6 plantillas)</span>
                  <div className={styles.templateGrid}>
                    {FORMATS.map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setActiveFormat(fmt.id)}
                        className={`${styles.templateBtn} ${activeFormat === fmt.id ? styles.templateBtnActive : ''}`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>2. Prueba editando el encabezado</span>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className={styles.fieldInput}
                    aria-label="Nombre en el currículum"
                    placeholder="Tu nombre completo"
                  />
                  <input
                    type="text"
                    value={candidateRole}
                    onChange={(e) => setCandidateRole(e.target.value)}
                    className={styles.fieldInput}
                    aria-label="Titular profesional"
                    placeholder="Tu especialidad o puesto objetivo"
                  />
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>3. Tono editorial del encabezado</span>
                  <div className={styles.toneRow}>
                    <button
                      type="button"
                      onClick={() => setTone('blue')}
                      className={`${styles.toneBtn} ${tone === 'blue' ? styles.toneBtnActive : ''}`}
                    >
                      <span className={styles.toneSwatch} style={{ backgroundColor: '#DCE8FB' }} />
                      Azul editorial
                    </button>
                    <button
                      type="button"
                      onClick={() => setTone('warm')}
                      className={`${styles.toneBtn} ${tone === 'warm' ? styles.toneBtnActive : ''}`}
                    >
                      <span className={styles.toneSwatch} style={{ backgroundColor: '#EAE3D5' }} />
                      Papel cálido
                    </button>
                  </div>
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>4. Control del documento</span>
                  <div className={styles.toggleList}>
                    <label className={styles.toggleRow}>
                      <span>Ajuste inteligente a 1 hoja</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={fitOnePage}
                        onClick={() => setFitOnePage(!fitOnePage)}
                        className={`${styles.toggleSwitch} ${fitOnePage ? styles.toggleSwitchOn : ''}`}
                      >
                        <span className={styles.toggleThumb} />
                      </button>
                    </label>
                    <label className={styles.toggleRow}>
                      <span>Mostrar Proyectos</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showProjects}
                        onClick={() => setShowProjects(!showProjects)}
                        className={`${styles.toggleSwitch} ${showProjects ? styles.toggleSwitchOn : ''}`}
                      >
                        <span className={styles.toggleThumb} />
                      </button>
                    </label>
                    <label className={styles.toggleRow}>
                      <span>Mostrar Certificados</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showCerts}
                        onClick={() => setShowCerts(!showCerts)}
                        className={`${styles.toggleSwitch} ${showCerts ? styles.toggleSwitchOn : ''}`}
                      >
                        <span className={styles.toggleThumb} />
                      </button>
                    </label>
                    <label className={styles.toggleRow}>
                      <span>Mostrar Idiomas</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showLanguages}
                        onClick={() => setShowLanguages(!showLanguages)}
                        className={`${styles.toggleSwitch} ${showLanguages ? styles.toggleSwitchOn : ''}`}
                      >
                        <span className={styles.toggleThumb} />
                      </button>
                    </label>
                  </div>
                </div>

                <div className={styles.exportBar}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', lineHeight: 1.45 }}>
                    <FileText size={14} style={{ flexShrink: 0 }} />
                    Cuando esté disponible podrás exportarlo en PDF A4 exacto y Word (.docx).
                  </span>
                </div>
              </div>

              {/* Hoja A4 en vivo */}
              <div className={styles.sheetStage}>
                <div className={styles.sheetMetaBar}>
                  <span>PLANTILLA: {activeFormatObj.label.toUpperCase()}</span>
                  <span>
                    ATS {activeFormatObj.atsScore}% · {fitOnePage ? '1 HOJA' : '2 HOJAS'}
                  </span>
                </div>
                <CVSheetPreview
                  name={candidateName || 'Tu Nombre'}
                  role={candidateRole || 'Especialidad Profesional'}
                  format={activeFormat}
                  tone={tone}
                  fitOnePage={fitOnePage}
                  showProjects={showProjects}
                  showCerts={showCerts}
                  showLanguages={showLanguages}
                  showWatermark
                />
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.compareHeader}>
                <div>
                  <h3 className={styles.compareTitle}>
                    Comparar <span className={styles.editorialItalic}>versiones</span>
                  </h3>
                  <p className={styles.sectionLead} style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                    Desde un mismo Perfil Maestro puedes contrastar dos versiones adaptadas a vacantes distintas en estructura, formato, contenido y puntaje ATS.
                  </p>
                </div>
              </div>

              <div className={styles.compareGrid}>
                <div>
                  <div className={styles.compareColHead}>
                    <span>CV 1 — Sistemas & Desarrollo Web</span>
                    <span className={styles.demoBadge}>BANNER EDITORIAL</span>
                  </div>
                  <CVSheetPreview
                    name={candidateName || 'Sofía Mendoza Ramírez'}
                    role="Ing. en Sistemas · Desarrollo Web & APIs"
                    format="editorial"
                    tone="blue"
                    fitOnePage
                    showProjects
                    showCerts
                    showLanguages
                    compactPreview
                    variant="web"
                    showWatermark
                  />
                </div>

                <div>
                  <div className={styles.compareColHead}>
                    <span>CV 2 — Datos & Machine Learning</span>
                    <span className={styles.demoBadge}>EJECUTIVO BICOLUMNA</span>
                  </div>
                  <CVSheetPreview
                    name={candidateName || 'Sofía Mendoza Ramírez'}
                    role="Data Analyst & BI · Python, SQL & Power BI"
                    format="bicolumna"
                    tone="warm"
                    fitOnePage={false}
                    showProjects
                    showCerts
                    showLanguages
                    compactPreview
                    variant="data"
                    showWatermark
                  />
                </div>
              </div>

              <div className={styles.compareTable}>
                <div className={styles.compareRow}>
                  <span className={styles.compareRowLabel}>Plantilla</span>
                  <span>Banner Editorial</span>
                  <span>Ejecutivo Bicolumna</span>
                </div>
                <div className={styles.compareRow}>
                  <span className={styles.compareRowLabel}>Enfoque de contenido</span>
                  <span>React, TypeScript, APIs & Cloud</span>
                  <span>Python, SQL, Power BI & ML</span>
                </div>
                <div className={styles.compareRow}>
                  <span className={styles.compareRowLabel}>Estado</span>
                  <span>Listo para envío</span>
                  <span>En revisión</span>
                </div>
                <div className={`${styles.compareRow} ${styles.compareRowHighlight}`}>
                  <span className={styles.compareRowLabel}>Puntaje ATS</span>
                  <span>94%</span>
                  <span>91%</span>
                </div>
                <div className={styles.compareRow}>
                  <span className={styles.compareRowLabel}>Páginas</span>
                  <span>1 hoja (compacto)</span>
                  <span>2 hojas (detallado)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className={styles.inner}><div className={styles.divider} /></div>

      {/* ═══════════════════════════════════════════════════
          4. PASO 03 — ANÁLISIS REAL FRENTE A OFERTAS (ATS)
         ═══════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div data-cf-reveal className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Paso 03 · Vacantes y Escáner ATS</span>
            <h2 className={`${styles.editorialHeading} ${styles.sectionTitle}`}>
              Te damos un diagnóstico real frente a cada{' '}
              <span className={styles.editorialItalic}>vacante</span>.
            </h2>
            <p className={styles.sectionLead}>
              Solo pegas el enlace o texto de la oferta (LinkedIn, Indeed, OCC, Greenhouse): CVforge evalúa 4 dimensiones clave, señala qué requisitos te faltan para sumarlos en 1 clic y arma tu kit de postulación.
            </p>
          </div>

          <div data-cf-reveal className={styles.atsGrid}>
            <div>
              <span className={styles.controlLabel}>Selecciona una vacante de prueba</span>
              <div className={styles.vacancyList} style={{ marginTop: '0.75rem' }}>
                {VACANCIES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVacancyId(v.id)}
                    className={`${styles.vacancyItem} ${selectedVacancyId === v.id ? styles.vacancyItemActive : ''}`}
                  >
                    <div>
                      <span className={styles.vacancyTitle}>{v.role}</span>
                      <span className={styles.vacancySource}>{v.source}</span>
                    </div>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>

              <div className={styles.vacancyExcerpt}>
                <span className={styles.controlLabel} style={{ display: 'block', marginBottom: '0.45rem' }}>
                  Extracto analizado de la oferta
                </span>
                {currentVacancy.excerpt}
              </div>
            </div>

            <div className={styles.atsDiagnosis}>
              <div className={styles.atsScoreHeader}>
                <div>
                  <span className={styles.controlLabel}>Compatibilidad estimada</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: '#5C564E' }}>
                    Haz clic en las brechas para incorporarlas a tu CV
                  </p>
                </div>
                <div className={styles.atsBigNumber}>
                  {liveAtsScore}
                  <span className={styles.atsBigPercent}>%</span>
                </div>
              </div>

              <div className={styles.dimensionsList}>
                {currentVacancy.dimensions.map((d, idx) => {
                  const boosted =
                    idx < 2
                      ? Math.min(99, d.value + currentAddedGaps.length * 4)
                      : d.value;
                  return (
                    <div key={d.label} className={styles.dimItem}>
                      <div className={styles.dimHead}>
                        <span>{d.label}</span>
                        <span className={styles.dimVal}>{boosted}%</span>
                      </div>
                      <div className={styles.dimTrack}>
                        <div className={styles.dimFill} style={{ width: `${boosted}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.gapsBlock}>
                <span className={styles.controlLabel}>
                  Requisitos detectados (clic en brechas para sumar +4% ATS)
                </span>
                <div className={styles.gapsPills}>
                  {currentVacancy.matched.map((item) => (
                    <span
                      key={item}
                      className={`${styles.gapPill} ${styles.gapPillAdded}`}
                      style={{ cursor: 'default' }}
                    >
                      <Check size={13} />
                      {item}
                    </span>
                  ))}
                  {currentVacancy.gaps.map((gap) => {
                    const isAdded = currentAddedGaps.includes(gap);
                    return (
                      <button
                        key={gap}
                        type="button"
                        onClick={() => toggleGap(gap)}
                        className={`${styles.gapPill} ${isAdded ? styles.gapPillAdded : ''}`}
                      >
                        {isAdded ? <Check size={13} /> : <Plus size={13} />}
                        {gap}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.kitBlock}>
                <div className={styles.kitTabs}>
                  <button
                    type="button"
                    onClick={() => setKitTab('cv')}
                    className={`${styles.kitTab} ${kitTab === 'cv' ? styles.kitTabActive : ''}`}
                  >
                    CV reordenado
                  </button>
                  <button
                    type="button"
                    onClick={() => setKitTab('carta')}
                    className={`${styles.kitTab} ${kitTab === 'carta' ? styles.kitTabActive : ''}`}
                  >
                    Carta de presentación
                  </button>
                  <button
                    type="button"
                    onClick={() => setKitTab('linkedin')}
                    className={`${styles.kitTab} ${kitTab === 'linkedin' ? styles.kitTabActive : ''}`}
                  >
                    Mensaje LinkedIn / Correo
                  </button>
                </div>
                <p className={styles.kitPreview}>{currentVacancy.kit[kitTab]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.inner}><div className={styles.divider} /></div>

      {/* ═══════════════════════════════════════════════════
          5. PASO 04 — MODO ENTREVISTA
         ═══════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div data-cf-reveal className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Paso 04 · Modo Entrevista</span>
            <h2 className={`${styles.editorialHeading} ${styles.sectionTitle}`}>
              Prepárate para defender tu{' '}
              <span className={styles.editorialItalic}>historia</span>.
            </h2>
            <p className={styles.sectionLead}>
              Convierte los datos reales de tu currículum en un pitch de 45 segundos, credenciales listas para compartir en pantalla y guía para las preguntas clave.
            </p>
          </div>

          <div data-cf-reveal className={styles.interviewGrid}>
            <div className={styles.pitchBox}>
              <span className={styles.controlLabel}>Pitch de presentación · 45 segundos</span>
              <blockquote className={styles.pitchQuote}>
                “Soy {candidateName.split(' ')[0]}, especialista en desarrollo web y datos. En mi último proyecto reduje en 38% los tiempos de respuesta construyendo APIs escalables en TypeScript y PostgreSQL, y hoy busco aportar ese mismo rigor en su equipo.”
              </blockquote>

              <div className={styles.pitchControls}>
                <button
                  type="button"
                  onClick={() => {
                    if (pitchSeconds >= 45) setPitchSeconds(0);
                    setPitchRunning(!pitchRunning);
                  }}
                  className={styles.outlineBtn}
                >
                  {pitchRunning ? <Square size={13} /> : <Play size={13} />}
                  {pitchRunning ? 'Pausar' : 'Ensayar 45s'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPitchRunning(false);
                    setPitchSeconds(0);
                  }}
                  className={styles.outlineBtn}
                  aria-label="Reiniciar temporizador"
                >
                  <RotateCcw size={13} />
                </button>
                <div className={styles.pitchProgressWrap}>
                  <div
                    className={styles.pitchProgressBar}
                    style={{ width: `${(pitchSeconds / 45) * 100}%` }}
                  />
                </div>
                <span className={styles.pitchTimer}>
                  00:{String(pitchSeconds).padStart(2, '0')}
                </span>
              </div>

              <div className={styles.credList}>
                <span className={styles.controlLabel}>Proyectos y credenciales listos para abrir</span>
                <div className={styles.credRow}>
                  <span>Plataforma de Productividad & Analítica</span>
                  <span className={styles.credTag}>Demo en vivo ↗</span>
                </div>
                <div className={styles.credRow}>
                  <span>Motor de Automatización de Reportes (Python/SQL)</span>
                  <span className={styles.credTag}>Repositorio ↗</span>
                </div>
                <div className={styles.credRow}>
                  <span>Google Data Analytics Professional</span>
                  <span className={styles.credTag}>Credencial verificada ↗</span>
                </div>
              </div>
            </div>

            <div>
              <span className={styles.controlLabel}>Preguntas probables con guía de respuesta</span>
              <div className={styles.qaList} style={{ marginTop: '0.75rem' }}>
                {INTERVIEW_QA.map((item, idx) => {
                  const isOpen = openQaIndex === idx;
                  return (
                    <div key={item.q} className={styles.qaItem}>
                      <button
                        type="button"
                        onClick={() => setOpenQaIndex(isOpen ? -1 : idx)}
                        className={styles.qaTrigger}
                      >
                        <span>{item.q}</span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      {isOpen && <p className={styles.qaAnswer}>{item.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. CIERRE EDITORIAL CON CHUY — PRÓXIMAMENTE
         ═══════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <div data-cf-reveal className={styles.ctaGrid}>
            <div className={styles.ctaCopy}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                Próximo lanzamiento · CVforge.
              </span>

              <h2 className={`${styles.editorialHeading} ${styles.ctaTitle}`}>
                Espéralo con <span className={styles.editorialItalic}>ansias</span>.
              </h2>

              <p className={styles.sectionLead}>
                Estamos trabajando en los últimos detalles para que <strong>CVforge.</strong> esté disponible muy pronto: escribe tu historia una vez, adáptala a cada vacante en segundos y exporta documentos impecables en PDF y Word.
              </p>

              <Link href="/contacto" className={styles.primaryBtn}>
                Notificarme cuando esté disponible
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.ctaChuyWrap}>
              <Image
                src="/productos/cvforge/cvchuy.png"
                alt="Zorro Chuy preparando el lanzamiento de CVforge"
                fill
                sizes="(max-width: 640px) 320px, 460px"
                style={{ objectFit: 'contain', transform: 'scale(1.24)' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
