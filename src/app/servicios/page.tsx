"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Servicios.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Desarrollo de Sitios Web",
    desc: "Ofrecemos soluciones web de alto impacto que combinan un diseño profesional corporativo con arquitectura responsiva. Enfocados en SEO y conversión.",
    price: "Cotización a medida",
    time: "7 a 20 días hábiles",
    guarantee: "30 días",
    scope: [
      "Landing Pages de conversión",
      "Sitios corporativos e institucionales",
      "Portafolios y catálogos digitales",
      "Integración con WhatsApp y formularios",
      "Optimización SEO técnica"
    ],
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js"]
  },
  {
    id: "02",
    title: "Desarrollo de Sistemas Web",
    desc: "Ecosistemas digitales robustos diseñados para centralizar la operación, gestionar datos complejos y potenciar la productividad organizacional.",
    price: "Variable según módulos",
    time: "30 a 90 días",
    guarantee: "60 días",
    scope: [
      "Paneles administrativos (Dashboards)",
      "Gestión de roles y permisos",
      "Sistemas CRM y ERP a medida",
      "Desarrollo de APIs REST",
      "Generación de reportes dinámicos"
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Docker"]
  },
  {
    id: "03",
    title: "Desarrollo Móvil",
    desc: "Aplicaciones móviles nativas e híbridas para iOS y Android, llevando tus servicios directamente al bolsillo de tus clientes.",
    price: "Basado en requerimientos",
    time: "30 a 90 días",
    guarantee: "60 días",
    scope: [
      "Desarrollo multiplataforma",
      "Notificaciones push dinámicas",
      "Geolocalización en tiempo real",
      "Integración de cámara y multimedia",
      "Publicación en App Store y Google Play"
    ],
    tech: ["Flutter", "Firebase", "Supabase", "iOS / Android"]
  },
  {
    id: "04",
    title: "Data & Analítica (B.I.)",
    desc: "Transformamos los datos crudos de tu empresa en tableros ejecutivos interactivos que facilitan la toma de decisiones basada en evidencia.",
    price: "Variable según datos",
    time: "10 a 30 días",
    guarantee: "30 días",
    scope: [
      "Definición de KPIs estratégicos",
      "Dashboards interactivos en tiempo real",
      "Procesos ETL e Ingeniería de Datos",
      "Generación de reportes automáticos"
    ],
    tech: ["Power BI", "SQL Server", "Python", "Looker Studio"]
  },
  {
    id: "05",
    title: "Inteligencia Artificial",
    desc: "Integramos modelos avanzados de IA y Machine Learning para automatizar procesos complejos y predecir comportamientos de mercado.",
    price: "Depende del modelo",
    time: "20 a 60 días",
    guarantee: "45 días",
    scope: [
      "Chatbots inteligentes (IA Generativa)",
      "Modelos predictivos (Machine Learning)",
      "Sistemas de recomendaciones",
      "Análisis de lenguaje natural (NLP)"
    ],
    tech: ["Python", "TensorFlow", "OpenAI", "LangChain"]
  },
  {
    id: "06",
    title: "Automatización de Procesos",
    desc: "Reducimos drásticamente los tiempos operativos conectando tus sistemas actuales para eliminar tareas manuales y repetitivas.",
    price: "Variable por volumen",
    time: "5 a 20 días",
    guarantee: "30 días",
    scope: [
      "Integración de aplicaciones empresariales",
      "Automatización de correos y seguimiento",
      "Creación de Bots operativos",
      "Diseño de flujos de trabajo inteligentes"
    ],
    tech: ["n8n", "Zapier", "Make", "APIs REST"]
  },
  {
    id: "07",
    title: "Cloud & DevOps",
    desc: "Garantizamos disponibilidad y seguridad mediante la implementación de infraestructuras escalables en la nube.",
    price: "Cotización de infraestructura",
    time: "10 a 30 días",
    guarantee: "30 días",
    scope: [
      "Administración de servidores (VPS)",
      "Despliegue de contenedores",
      "Integración Continua (CI/CD)",
      "Monitoreo de infraestructura 24/7"
    ],
    tech: ["Docker", "Kubernetes", "AWS / GCP", "GitHub Actions"]
  },
  {
    id: "08",
    title: "Consultoría Tecnológica",
    desc: "Trazamos el mapa de ruta (roadmap) tecnológico de tu empresa, auditando sistemas y planeando tu transformación digital.",
    price: "Variable según alcance",
    time: "3 a 15 días",
    guarantee: "30 días (Acompañamiento)",
    scope: [
      "Auditorías y diagnósticos de software",
      "Diseño de arquitectura de sistemas",
      "Estrategia de transformación digital",
      "Recomendaciones técnicas ejecutivas"
    ],
    tech: ["Scrum", "UML", "BPMN", "ITIL"]
  },
  {
    id: "09",
    title: "Plataformas SaaS",
    desc: "Implementación rápida de software empresarial configurable (CRM, ERP, POS) con mantenimiento continuo y costos reducidos.",
    price: "Suscripción / Licencia",
    time: "1 a 45 días",
    guarantee: "Soporte Continuo",
    scope: [
      "Personalización de identidad corporativa",
      "Gestión de roles y módulos",
      "Actualizaciones automáticas del sistema",
      "Hospedaje seguro en la nube"
    ],
    tech: ["SaaS Architecture", "Multi-tenant", "PostgreSQL", "Cloud"]
  }
];

export default function Servicios() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Hero Animation
      gsap.from(".hero-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Setup ScrollTriggers for right items to update active index
      rightItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate the left title when activeIndex changes
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={styles.serviciosPage}>
      
      {/* 1. HERO HEADER */}
      <section className={styles.hero}>
        <h1 className={`${styles.heroTitle} hero-anim`}>Catálogo de<br/>Servicios</h1>
        <p className={`${styles.heroSubtitle} hero-anim`}>
          Conoce a detalle el alcance, los tiempos y las tecnologías detrás de cada solución de ingeniería que desarrollamos en Infocod.
        </p>
        <div className={`${styles.scrollIndicator} hero-anim`}>
          <span>Explorar Fichas Técnicas</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* 2. SPLIT SCREEN SCROLL */}
      <section className={styles.splitSection}>
        
        {/* LEFT STICKY SIDE */}
        <div className={styles.leftSticky}>
          <div className={styles.leftNumber}>{services[activeIndex].id}</div>
          <div className={styles.dynamicTitleWrapper}>
            <h2 ref={titleRef} className={styles.leftTitle}>
              {services[activeIndex].title}
            </h2>
          </div>
        </div>

        {/* RIGHT SCROLLING SIDE (RICH DATA) */}
        <div className={styles.rightScroll}>
          {services.map((s, index) => (
            <div 
              key={s.id} 
              className={styles.rightItem}
              ref={el => { rightItemsRef.current[index] = el; }}
            >
              <p className={styles.itemDesc}>{s.desc}</p>
              
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <span>Inversión</span>
                  <strong>{s.price}</strong>
                </div>
                <div className={styles.statBox}>
                  <span>Tiempo Estimado</span>
                  <strong>{s.time}</strong>
                </div>
                <div className={styles.statBox}>
                  <span>Garantía Técnica</span>
                  <strong>{s.guarantee}</strong>
                </div>
              </div>

              <div className={styles.scopeSection}>
                <h3 className={styles.scopeTitle}>Alcance del Servicio:</h3>
                <ul className={styles.scopeList}>
                  {s.scope.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.techTags}>
                {s.tech.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
