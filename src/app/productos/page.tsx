"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import DefaultProductContent from './DefaultProductContent';
import AgendaPlusContent from './AgendaPlusContent';
import MasticodContent from './MasticodContent';
import DataPilotContent from './DataPilotContent';
import CVForgeContent from './CVForgeContent';
import styles from './Productos.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  {
    id: 'agenda',
    name: 'Agenda+',
    title: 'La Agenda Inteligente',
    desc: 'Organiza tu tiempo de manera eficiente. Más que un calendario, es tu asistente personal.',
    color: '#7C3AED',
    image: '/agendaplusmock.png',
  },
  {
    id: 'masticod',
    name: 'Masticod',
    tagline: 'Sistema POS Especializado',
    number: '02',
    btnText: 'Notificar lanzamiento',
    isDev: true,
    features: [
      { id: 'pos', title: 'Punto de Venta Ágil', desc: 'Cobro rápido, interfaz intuitiva, facturación e integración de pagos.' },
      { id: 'inventory', title: 'Inventario Multisectorial', desc: 'Control de atributos, alertas de stock e impresión de códigos de barras.' },
      { id: 'crm', title: 'CRM Integrado', desc: 'Historial de clientes, programas de lealtad y estados de cuenta.' }
    ],
    title: 'Cobros Rápidos. Negocio Fluido.',
    desc: 'La línea de sistemas Punto de Venta (POS) diseñada para agilizar y simplificar el cobro diario con 8 variantes especializadas.',
    color: '#F59E0B',
    image: '/watio-mockup.png', // Fallback
  },
  {
    id: 'datapilot',
    name: 'DataPilot',
    title: 'Decisiones basadas en Datos',
    desc: 'Analítica avanzada y visualización de datos para impulsar el crecimiento de tu negocio de forma inteligente.',
    color: '#10B981',
    image: '/datapilotmock.png',
  },
  {
    id: 'cvforge',
    name: 'CVforge',
    title: 'Currículums que superan los filtros de IA',
    desc: 'Crea currículums estratégicos diseñados para destacar y superar los filtros automáticos de inteligencia artificial (ATS).',
    color: '#F59E0B',
    image: '/productos/cvforge/cvchuy.png',
  }
];

function ProductSwitcherLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default to agenda
  const currentParam = searchParams?.get('p') || 'agenda';
  const targetIndex = PRODUCTS.findIndex(p => p.id === currentParam) !== -1 
    ? PRODUCTS.findIndex(p => p.id === currentParam) 
    : 0;

  const [activeIndex, setActiveIndex] = useState(targetIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (targetIndex !== activeIndex && !isTransitioning) {
      // Initiate transition
      setIsTransitioning(true);
      
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          setActiveIndex(targetIndex);
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'instant' });
          
          gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1, onComplete: () => setIsTransitioning(false) }
          );
        }
      });
    }
  }, [targetIndex, activeIndex, isTransitioning]);

  const active = PRODUCTS[activeIndex];

  return (
    <div className={styles.mainWrapper} ref={containerRef}>
      {active.id === 'agenda' ? (
        <AgendaPlusContent active={active} isTransitioning={isTransitioning} />
      ) : active.id === 'masticod' ? (
        <MasticodContent active={active} isTransitioning={isTransitioning} />
      ) : active.id === 'datapilot' ? (
        <DataPilotContent active={active} isTransitioning={isTransitioning} />
      ) : active.id === 'cvforge' ? (
        <CVForgeContent />
      ) : (
        <DefaultProductContent active={active} isTransitioning={isTransitioning} />
      )}
    </div>
  );
}

export default function ProductosPage() {
  return (
    <main className={styles.main}>
      {/* El navbar ya tiene el switcher. Aquí solo leemos la URL y hacemos la transición */}
      <Suspense fallback={<div className={styles.mainWrapper} style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Cargando producto...</div>}>
        <ProductSwitcherLogic />
      </Suspense>
    </main>
  );
}
