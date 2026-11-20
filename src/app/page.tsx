import Image from "next/image";
import Link from "next/link";
import {
  Globe, Monitor, Smartphone, Database, Brain, Cpu, Cloud, Briefcase, Layers,
} from "lucide-react";
import HeroTech from "@/components/HeroTech/HeroTech";
import TechMarqueeSection from "@/components/TechMarqueeSection";
import ServicesAccordion from "@/components/ServicesAccordion/ServicesAccordion";
import ProductsZigZag from "@/components/ProductsZigZag/ProductsZigZag";
import PrinciplesFanScroll from "@/components/PrinciplesFanScroll/PrinciplesFanScroll";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import styles from "./Home.module.css";

const services = [
  { title: "Sitios Web",              icon: <Globe size={32} /> },
  { title: "Sistemas Web",            icon: <Monitor size={32} /> },
  { title: "Apps Móviles",            icon: <Smartphone size={32} /> },
  { title: "Business Intelligence",   icon: <Database size={32} /> },
  { title: "Inteligencia Artificial", icon: <Brain size={32} /> },
  { title: "Automatización (RPA)",    icon: <Cpu size={32} /> },
  { title: "Cloud y DevOps",          icon: <Cloud size={32} /> },
  { title: "Consultoría IT",          icon: <Briefcase size={32} /> },
  { title: "Plataformas SaaS",        icon: <Layers size={32} /> },
];

/**
 * Página de inicio. Es un Server Component: solo las secciones animadas
 * (hero, acordeón, productos) se envían como JavaScript al navegador.
 */
export default function Home() {
  return (
    <>
      <ScrollTriggerRefresh />

      {/* 1. Hero */}
      <HeroTech />

      {/* 2. Tecnologías */}
      <TechMarqueeSection />

      {/* 3. Servicios */}
      <section
        id="servicios-section"
        className={`${styles.section} ${styles.sectionPurple}`}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Lo que hacemos</h2>
          </div>
          <ServicesAccordion services={services} />
        </div>
      </section>

      {/* 4. Productos */}
      <ProductsZigZag />

      {/* 5. Por qué Infocod */}
      <PrinciplesFanScroll />

      {/* 6. CTA final con ultimo.jpg integrado suavemente con la sección anterior */}
      <section id="cta-final-section" className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaBgWrapper} aria-hidden="true">
            <Image
              src="/inicio/ultimo.jpg"
              alt="Chuy despegando con jetpack - Transforma tu negocio con Infocod"
              fill
              sizes="(max-width: 1360px) 96vw, 1320px"
              className={styles.ctaBgImg}
            />
            <div className={styles.ctaOverlay} />
          </div>

          <div className={styles.ctaContainer}>
            <div className={styles.ctaLeft}>
              <h2 className={styles.ctaHeadline}>¿Listo para transformar tu negocio?</h2>
              <Link href="/contacto" className={styles.ctaButton}>
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
