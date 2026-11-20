import styles from './PrinciplesFanScroll.module.css';

// SVG 1: Transparencia (Escudo / Póliza)
const SvgTransparencia = () => (
  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgIllustration}>
    <circle cx="100" cy="100" r="70" stroke="#00c96b" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
    <path d="M100 45L145 65V105C145 135 100 155 100 155C100 155 55 135 55 105V65L100 45Z" stroke="#0f172a" strokeWidth="2.5" fill="none" />
    <path d="M85 100L95 110L118 88" stroke="#00c96b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SVG 2: Código Limpio (Bloques Módulos)
const SvgCodigoLimpio = () => (
  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgIllustration}>
    <rect x="45" y="55" width="110" height="75" rx="10" stroke="#0f172a" strokeWidth="2.5" fill="none" />
    <path d="M30 130H170" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M75 78L63 90L75 102" stroke="#6c2bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M125 78L137 90L125 102" stroke="#6c2bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M106 74L94 106" stroke="#6c2bff" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// SVG 3: Sprints 7 Días (Rayo / Calendario)
const SvgSprints = () => (
  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgIllustration}>
    <rect x="45" y="50" width="110" height="95" rx="12" stroke="#0f172a" strokeWidth="2.5" fill="none" />
    <path d="M45 78H155" stroke="#0f172a" strokeWidth="2" />
    <path d="M70 40V55" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
    <path d="M130 40V55" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
    <path d="M108 88L88 114H102L94 134L118 106H102L108 88Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.15" strokeLinejoin="round" />
  </svg>
);

// SVG 4: Garantía 60 Días (Reloj / Sello)
const SvgGarantia = () => (
  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgIllustration}>
    <circle cx="100" cy="100" r="55" stroke="#0f172a" strokeWidth="2.5" fill="none" />
    <path d="M100 65V100L125 115" stroke="#4f8ef7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M100 30V40" stroke="#4f8ef7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M100 160V170" stroke="#4f8ef7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M30 100H40" stroke="#4f8ef7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M160 100H170" stroke="#4f8ef7" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// SVG 5: Cloud Native (Nube & Conexión)
const SvgCloudNative = () => (
  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgIllustration}>
    <path d="M60 115C50 115 42 107 42 97C42 88 49 80 58 79C61 65 73 55 88 55C100 55 110 62 115 72C119 69 124 67 130 67C142 67 152 77 152 89C157 91 160 96 160 102C160 109 154 115 147 115H60Z" stroke="#ec4899" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path d="M100 115V155" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="4 4" />
    <circle cx="100" cy="155" r="5" fill="#ec4899" />
  </svg>
);

// SVG 6: Propiedad Intelectual (Candado & Llave)
const SvgPropiedad = () => (
  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgIllustration}>
    <rect x="60" y="85" width="80" height="65" rx="10" stroke="#0f172a" strokeWidth="2.5" fill="none" />
    <path d="M75 85V65C75 51.2 86.2 40 100 40C113.8 40 125 51.2 125 65V85" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="112" r="6" fill="#8b5cf6" />
    <path d="M100 118V130" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const principles = [
  {
    number: "01",
    title: "Transparencia Total",
    desc: "Alcance claro y presupuesto cerrado desde el primer contacto, sin letras chiquitas ni costos ocultos.",
    illustration: <SvgTransparencia />
  },
  {
    number: "02",
    title: "Código Limpio & Modular",
    desc: "Arquitectura moderna en Next.js 16, TypeScript y Supabase para máxima mantenibilidad.",
    illustration: <SvgCodigoLimpio />
  },
  {
    number: "03",
    title: "Sprints de 7 Días",
    desc: "Entregas iterativas semanales con demos funcionales para validar avances en tiempo real.",
    illustration: <SvgSprints />
  },
  {
    number: "04",
    title: "Garantía de 60 Días",
    desc: "Respaldo técnico directo y soporte posterior al lanzamiento sin costo adicional.",
    illustration: <SvgGarantia />
  },
  {
    number: "05",
    title: "Cloud Native & DevOps",
    desc: "Infraestructura desplegada en servidores nube de alta disponibilidad (Vercel & AWS).",
    illustration: <SvgCloudNative />
  },
  {
    number: "06",
    title: "Propiedad Intelectual 100%",
    desc: "Transferencia total del código fuente, repositorio privado y credenciales administrativas.",
    illustration: <SvgPropiedad />
  }
];

export default function PrinciplesFanScroll() {
  return (
    <section id="principios-zettle-section" className="py-24 bg-[#f8fafc] border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-slate-900/5 border border-slate-200 text-xs font-mono tracking-widest text-slate-700 uppercase">
            Estándares de Excelencia
          </div>
          <h2 className="text-3xl md:text-5xl font-sora font-extrabold text-[#0f172a] mb-4 tracking-tight">
            Por qué elegir Infocod
          </h2>
          <p className="text-[#64748b] font-manrope max-w-xl mx-auto text-base leading-relaxed">
            Principios de ingeniería de software y compromisos de calidad que diferencian nuestros proyectos.
          </p>
        </div>

        {/* 6 Zettle-Style Portrait Cards Grid */}
        <div className={styles.cardsGrid}>
          {principles.map((item, idx) => (
            <div key={idx} className={styles.card}>
              {/* Header: Number & Title */}
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <span className={styles.stepNum}>{item.number}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </div>

              {/* Clean Transparent Line Art Illustration */}
              <div className={styles.illustrationArea}>
                {item.illustration}
              </div>

              {/* Description */}
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



