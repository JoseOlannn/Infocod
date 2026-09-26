"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Home.module.css";
import {
  Globe, Monitor, Smartphone, Database, Brain, Cpu, Cloud, Briefcase, Layers,
} from "lucide-react";
import ServicesAccordion from "@/components/ServicesAccordion/ServicesAccordion";
import ProductsZigZag from "@/components/ProductsZigZag/ProductsZigZag";
import PrinciplesFanScroll from "@/components/PrinciplesFanScroll/PrinciplesFanScroll";
import TechMarqueeSection from "@/components/TechMarqueeSection";
import HeroTech from "@/components/HeroTech/HeroTech";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 600);
      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ctaHeadlineText = "¿Listo para transformar tu negocio?";

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

  return (
    <div ref={containerRef}>

      {/* 1. HERO TECH — Radar / HUD style, GSAP, award-level */}
      <HeroTech />

      {/* 2. TECH MARQUEE */}
      <TechMarqueeSection />

      {/* 3. SERVICIOS */}
      <section
        id="servicios-section"
        className={`${styles.section} ${styles.sectionPurple}`}
        style={{ overflow: "hidden", paddingTop: "4rem" }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full bg-transparent">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.textWhite}`}>
              Lo que hacemos
            </h2>
          </div>
          <div className="services-anim">
            <ServicesAccordion services={services} />
          </div>
          {/* Omitimos el botón secundario aquí porque lo vamos a meter dentro del acordeón como pidió el usuario */}
        </div>
      </section>

      {/* 4. PRODUCTOS */}
      <ProductsZigZag />

      {/* 5. POR QUÉ INFOCOD */}
      <PrinciplesFanScroll />

      {/* 6. CTA FINAL */}
      <section id="cta-final-section" className={styles.ctaCleanSection}>
        <div className={styles.ctaCleanContainer}>
          <div className={styles.ctaCleanLeft}>
            <h2 className={styles.ctaHeadline}>
              {ctaHeadlineText.split(" ").map((word, wIdx) => (
                <span
                  key={wIdx}
                  style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.35em" }}
                >
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="cta-split-char" style={{ display: "inline-block" }}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <Link href="/contacto" className={styles.ctaButtonClean}>
              Contáctanos
            </Link>
          </div>
          <div className={styles.ctaCleanRight}>
            <Image
              src="/images/chuy_contac.png"
              alt="Zorro Chuy - Contacto Infocod"
              width={440}
              height={440}
              className={styles.chuyContactImg}
              priority
            />
          </div>
        </div>
      </section>

    </div>
  );
}
