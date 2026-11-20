"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'top' | 'purple' | 'green' | 'white' | 'lightTop'>('lightTop');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavTheme('white');
      } else {
        setNavTheme('lightTop');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial reveal animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.4')
      .from(linksRef.current?.children || [], {
        opacity: 0,
        y: -10,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3')
      .from(ctaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'back.out(1.5)'
      }, '-=0.2');
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Animación cuando cambia el color del navbar
  useEffect(() => {
    if (navRef.current) {
      if (navTheme === 'top') {
        gsap.to(navRef.current, { 
          backgroundColor: '#000000', 
          boxShadow: 'none',
          duration: 0.4, 
          ease: "power2.out"
        });
      } else if (navTheme === 'white') {
        gsap.to(navRef.current, { 
          backgroundColor: '#ffffff', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          duration: 0.4, 
          ease: "power2.out"
        });
      } else if (navTheme === 'green') {
        gsap.to(navRef.current, { 
          backgroundColor: '#ffffff', 
          boxShadow: '0 4px 20px rgba(0, 201, 107, 0.15)',
          duration: 0.4, 
          ease: "power2.out"
        });
      } else if (navTheme === 'lightTop') {
        gsap.to(navRef.current, { 
          backgroundColor: 'rgba(255, 255, 255, 0)', 
          boxShadow: 'none',
          duration: 0.4, 
          ease: "power2.out"
        });
      } else {
        gsap.to(navRef.current, { 
          backgroundColor: '#1a0b2e', 
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
          duration: 0.4, 
          ease: "power2.out"
        });
      }
    }
  }, [navTheme]);

  let themeClass = '';
  if (navTheme === 'purple') themeClass = styles.navbarPurple;
  if (navTheme === 'green') themeClass = styles.navbarGreen;
  if (navTheme === 'white') themeClass = styles.navbarWhite;
  if (navTheme === 'lightTop') themeClass = styles.navbarLightTop;

  return (
    <nav ref={navRef} className={`${styles.navbar} ${themeClass}`}>
      <div className={styles.container}>
        {/* Izquierda: Logo Infocod */}
        <div ref={logoRef} className={styles.logoContainer}>
          <Link href="/">
            <Image 
              src="/logo+.png" 
              alt="Infocod Logo" 
              width={200} 
              height={80}
              className={styles.logo}
              preload
            />
          </Link>
        </div>

        {/* Centro/derecha (links) */}
        <ul ref={linksRef} className={styles.navLinks}>
          <li className={styles.linkItem}>
            <Link href="/" className={styles.link}>Inicio</Link>
          </li>
          
          <li className={styles.linkItem}>
            <Link href="/nosotros" className={styles.link}>Nosotros</Link>
          </li>
          
          <li className={styles.linkItem}>
            <Link href="/servicios" className={styles.link}>Servicios</Link>
          </li>

          <li className={`${styles.linkItem} ${styles.dropdownParent}`}>
            <Link href="/productos?p=agenda" className={styles.link}>
              Productos <ChevronDown size={16} />
            </Link>
            {/* Dropdown Menu */}
            <div className={styles.dropdownMenu}>
              <Link href="/productos?p=agenda" className={styles.dropdownLink}>
                <span className={styles.dropdownTitle}>Agenda+</span>
              </Link>
              <Link href="/productos?p=masticod" className={styles.dropdownLink}>
                <span className={styles.dropdownTitle}>Masticod</span>
                <span className={styles.badge}>PRONTO</span>
              </Link>
              <Link href="/productos?p=datapilot" className={styles.dropdownLink}>
                <span className={styles.dropdownTitle}>DataPilot</span>
                <span className={styles.badge}>PRONTO</span>
              </Link>
            </div>
          </li>



          <li className={styles.linkItem}>
            <Link href="/contacto" className={styles.link}>Contacto</Link>
          </li>
        </ul>

        {/* Extremo derecho: Botón CTA */}
        <Link ref={ctaRef} href="/contacto" className={styles.ctaButton}>
          Cotiza tu proyecto
        </Link>

        {/* Mobile menu toggle button */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil completo con Productos incluidos */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-slate-100 p-6 flex flex-col gap-3.5 max-h-[calc(100vh-80px)] overflow-y-auto">
          <Link href="/" className="font-semibold text-slate-800 py-1" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link href="/nosotros" className="font-semibold text-slate-800 py-1" onClick={() => setMobileMenuOpen(false)}>Nosotros</Link>
          <Link href="/servicios" className="font-semibold text-slate-800 py-1" onClick={() => setMobileMenuOpen(false)}>Servicios</Link>

          <div className="border-y border-slate-100 py-2.5 flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Productos</span>
            <Link href="/productos?p=agenda" className="font-semibold text-slate-800 pl-2 py-0.5 flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
              <span>Agenda+</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-bold">EN VIVO</span>
            </Link>
            <Link href="/productos?p=masticod" className="font-semibold text-slate-800 pl-2 py-0.5 flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
              <span>Masticod</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">PRONTO</span>
            </Link>
            <Link href="/productos?p=datapilot" className="font-semibold text-slate-800 pl-2 py-0.5 flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
              <span>DataPilot</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">PRONTO</span>
            </Link>
          </div>

          <Link href="/contacto" className="font-semibold text-slate-800 py-1" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
          <Link href="/contacto" className="bg-slate-900 text-white p-3 rounded-lg text-center font-bold mt-2" onClick={() => setMobileMenuOpen(false)}>
            Cotiza tu proyecto
          </Link>
        </div>
      )}
    </nav>
  );
}
