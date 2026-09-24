"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ShoppingCart, Package, Coffee, Shirt, Wrench, Zap, Store, Check, Utensils, Pill, BookOpen, Scissors, BarChart3, Users, Clock, AlertTriangle, Search, ScanLine, ArrowUp } from 'lucide-react';
import styles from './MasticodContent.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VARIANTS = [
  { id: 'abarrotes', title: 'Masticod Abarrotes', icon: Store, color: '#10B981', desc: 'Agilidad en cajas y cobro directo. Perfecto para tiendas de conveniencia y minisúpers donde cada segundo de espera cuenta.' },
  { id: 'ferreteria', title: 'Masticod Ferretería', icon: Wrench, color: '#F59E0B', desc: 'Venta a granel, control de medidas fraccionadas y conversiones automáticas para no descuadrar el inventario.' },
  { id: 'boutique', title: 'Masticod Boutique', icon: Shirt, color: '#3B82F6', desc: 'Administra tu catálogo por tallas, colores y colecciones con una interfaz visual y atractiva.' },
  { id: 'restaurantes', title: 'Masticod Restaurantes', icon: Utensils, color: '#EF4444', desc: 'Sistema de comandas directo a cocina, mapas de mesas, cuentas separadas y propinas.' },
  { id: 'retail', title: 'Masticod Retail', icon: ShoppingCart, color: '#8B5CF6', desc: 'Diseñado para volumen: sincronización multi-caja en tiempo real, cortes rápidos e impresión ágil.' },
  { id: 'farmacia', title: 'Masticod Farmacia', icon: Pill, color: '#06B6D4', desc: 'Búsqueda instantánea por sustancia activa, medicamentos similares y alertas estrictas de caducidad.' },
  { id: 'papeleria', title: 'Masticod Papelería', icon: BookOpen, color: '#F43F5E', desc: 'Escaneo súper veloz de piezas pequeñas y listas escolares enteras, con cálculo de mayoreo automático.' },
  { id: 'salon', title: 'Masticod Salón', icon: Scissors, color: '#EC4899', desc: 'Agenda integrada, cobro de servicios de estética y cálculo automatizado de comisiones para estilistas.' },
];

export default function MasticodContent({ active, isTransitioning }: { active: any, isTransitioning: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const zigzagRef = useRef<HTMLDivElement>(null);
  const printerOverlayRef = useRef<HTMLDivElement>(null);

  // Abarrotes module state
  const [cart, setCart] = useState<{name: string, price: number}[]>([]);
  const [total, setTotal] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  const addToCart = (name: string, price: number) => {
    setCart(prev => [...prev, { name, price }]);
    setTotal(prev => prev + price);
  };

  const handlePrint = () => {
    if (cart.length === 0 || isPrinting) return;
    setIsPrinting(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsPrinting(false);
          setCart([]);
          setTotal(0);
        }, 1500); 
      }
    });
    tl.to(printerOverlayRef.current, { autoAlpha: 1, duration: 0.3 });
    tl.fromTo(".printedTicket", 
      { y: -100, opacity: 0, xPercent: -50 }, 
      { y: 50, opacity: 1, xPercent: -50, duration: 1, ease: 'power3.out' }
    );
    tl.to(".printedTicket", { opacity: 0, y: 0, xPercent: -50, duration: 0.3, delay: 0.5 });
    tl.fromTo(".checkMarkContainer", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
    );
  };

  // Ferretería module state
  const [ferreQty, setFerreQty] = useState<number>(2.5);
  const ferrePrice = 45.00;

  // Boutique module state
  const [activeColor, setActiveColor] = useState('#EF4444');
  const [activeSize, setActiveSize] = useState('M');

  // Restaurantes module state
  const [activeTable, setActiveTable] = useState(4);
  const tables = [
    { id: 1, status: 'disponible', total: 0 },
    { id: 2, status: 'ocupada', total: 350 },
    { id: 3, status: 'disponible', total: 0 },
    { id: 4, status: 'ocupada', total: 890 },
    { id: 5, status: 'ocupada', total: 120 },
    { id: 6, status: 'disponible', total: 0 },
  ];

  // Retail module state (Simulates live sales data)
  const [retailSales, setRetailSales] = useState(14502);
  useEffect(() => {
    const int = setInterval(() => setRetailSales(prev => prev + Math.floor(Math.random() * 25)), 2500);
    return () => clearInterval(int);
  }, []);

  // Farmacia module state
  const farmaciaDB = [
    { name: 'Paracetamol 500mg', lote: 'L-8472', caducidad: '2024-11', status: 'warning' },
    { name: 'Ibuprofeno 400mg', lote: 'L-1192', caducidad: '2026-05', status: 'good' },
    { name: 'Amoxicilina 250mg', lote: 'L-0034', caducidad: '2023-12', status: 'danger' },
  ];

  // Papelería module state
  const [papeItems, setPapeItems] = useState<{name: string, qty: number}[]>([{name: 'Lápiz HB2', qty: 3}]);
  const papeTotalQty = papeItems.reduce((acc, curr) => acc + curr.qty, 0);
  const isWholesale = papeTotalQty >= 10;
  const handleScan = () => {
    setPapeItems(prev => {
      const existing = prev.find(p => p.name === 'Libreta Profesional');
      if (existing) {
        return prev.map(p => p.name === 'Libreta Profesional' ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { name: 'Libreta Profesional', qty: 1 }];
    });
  };
  const papeTotal = papeTotalQty * 3.50;

  // Salón module state
  const [salonStep, setSalonStep] = useState(1);
  const stylists = [
    { name: 'Ana', comm: 65, color: '#EC4899' },
    { name: 'Carlos', comm: 40, color: '#3B82F6' },
    { name: 'Sofía', comm: 85, color: '#10B981' },
  ];


  // Hero animations
  useEffect(() => {
    if (isTransitioning) return;
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.fromTo(".heroItem",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  // Enhanced Zig-Zag Scroll Animations
  useEffect(() => {
    if (isTransitioning || !zigzagRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.zigzagRow}`).forEach((row: any, index: number) => {
        const isReverse = index % 2 !== 0; 
        
        const textContent = row.querySelector(`.${styles.textContent}`);
        const posWrapper = row.querySelector(`.${styles.posWrapper}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        // Text fades and slides in
        tl.fromTo(textContent,
          { opacity: 0, x: isReverse ? 80 : -80 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        );

        // UI Simulation fades and slides in from the opposite side slightly staggered
        tl.fromTo(posWrapper,
          { opacity: 0, x: isReverse ? -80 : 80, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
          "-=0.7"
        );
      });

      // Animación del título "Descubre la línea Masticod"
      const titleWrap = document.querySelector(`.${styles.lineaTitleWrap}`);
      if (titleWrap) {
        gsap.fromTo(titleWrap,
          { opacity: 0, x: -100 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleWrap,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

    }, containerRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <div ref={containerRef} className={styles.container}>
      
      {/* Mesh gradient background */}
      <div className={styles.bgWrapper}>
        <div className={styles.meshOrb1}></div>
        <div className={styles.meshOrb2}></div>
      </div>

      {/* Hero section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContent}>
          
          <div className={styles.heroTextSide}>
            <div className={styles.heroTitleWrap}>
              <Image src="/logo+.png" alt="Masticod Logo" width={80} height={80} className={`${styles.heroLogo} heroItem`} />
              <h1 className={`${styles.heroTitle} heroItem`}>
                Masticod
              </h1>
            </div>
            <p className={`${styles.heroDesc} heroItem`}>
              Tu línea de software para diferentes puntos de venta. Una experiencia espectacular diseñada para la velocidad en caja, precisión en el inventario y fluidez operativa.
            </p>
          </div>

          <div className={`${styles.heroMockupSide} heroItem`}>
            <div className={styles.mockupDevice}>
              <div className={styles.mockupScreen}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupCircle}></div>
                  <div className={styles.mockupLine} style={{ width: '40%' }}></div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.mockupSidebar}>
                    <div className={styles.mockupLine}></div>
                    <div className={styles.mockupLine} style={{ width: '80%' }}></div>
                    <div className={styles.mockupLine} style={{ width: '60%' }}></div>
                    <div className={styles.mockupLine} style={{ width: '90%', marginTop: 'auto' }}></div>
                  </div>
                  <div className={styles.mockupMain}>
                    {/* Card 1: Ventas */}
                    <div className={`${styles.mockupCard} ${styles.mcVentas}`}>
                      <span className={styles.mcTitle}>Ventas de Hoy</span>
                      <span className={styles.mcValue}>$14,520</span>
                      <div className={styles.mcChartLine}>
                        <div className={styles.mcChartFill}></div>
                      </div>
                    </div>
                    {/* Card 2: Top Productos */}
                    <div className={`${styles.mockupCard} ${styles.mcTop}`}>
                      <span className={styles.mcTitle}>Top Vendidos</span>
                      <div className={styles.mcList}>
                        <div className={styles.mcListItem}><div className={styles.mcDot}></div><div className={styles.mcBar} style={{ '--w': '85%' } as any}></div></div>
                        <div className={styles.mcListItem}><div className={styles.mcDot}></div><div className={styles.mcBar} style={{ '--w': '60%' } as any}></div></div>
                        <div className={styles.mcListItem}><div className={styles.mcDot}></div><div className={styles.mcBar} style={{ '--w': '35%' } as any}></div></div>
                      </div>
                    </div>
                    {/* Card 3: Inventario */}
                    <div className={`${styles.mockupCard} ${styles.mcInv}`}>
                      <span className={styles.mcTitle}>Salud Inventario</span>
                      <div className={styles.mcDonutWrap}>
                        <div className={styles.mcDonut}></div>
                        <div className={styles.mcDonutHole}>
                          <span className={styles.mcDonutVal}>85%</span>
                        </div>
                      </div>
                    </div>
                    {/* Card 4: Ticket Promedio */}
                    <div className={`${styles.mockupCard} ${styles.mcTicket}`}>
                      <span className={styles.mcTitle}>Ticket Promedio</span>
                      <span className={styles.mcValue2}>$245.50</span>
                      <span className={styles.mcTrend}>
                        <ArrowUp size={12} /> +12% vs ayer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyHeader}>
          <h2 className={styles.philosophyTitle}>No adaptes tu negocio al software. <br/><span className={styles.philosophyHighlight}>Elige el software creado para tu negocio.</span></h2>
          <p className={styles.philosophyDesc}>Masticod no es un programa genérico lleno de opciones que nunca vas a usar. Es una línea de sistemas especializados; tú compras el modelo exacto que tu industria necesita.</p>
        </div>
        <div className={styles.philosophyBento}>
          <div className={`${styles.bentoItem} ${styles.bentoEspecializacion}`}>
            <div className={styles.bentoIconBg}><Check size={200} /></div>
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoTitle}>Especialización Pura</h3>
              <p className={styles.bentoDesc}>Cada versión fue diseñada desde cero entendiendo los problemas reales de tu sector.</p>
            </div>
          </div>
          <div className={`${styles.bentoItem} ${styles.bentoListo}`}>
            <div className={styles.bentoIconBg}><Zap size={150} /></div>
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoTitle}>Plug & Play</h3>
              <p className={styles.bentoDesc}>Curva de aprendizaje mínima. Sin opciones de relleno.</p>
            </div>
          </div>
          <div className={`${styles.bentoItem} ${styles.bentoEcosistema}`}>
            <div className={styles.bentoIconBg}><Package size={300} /></div>
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoTitle}>El Ecosistema Masticod</h3>
              <p className={styles.bentoDesc}>Todas las versiones comparten la misma calidad corporativa, diseño premium y estabilidad, pero con el "motor" único configurado de fábrica para tu industria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Masticod Modules ZigZag */}
      <div className={styles.lineaTitleWrap}>
        <h2 className={styles.lineaTitle}>Descubre la línea Masticod</h2>
        <p className={styles.lineaDesc}>El motor perfecto para cada tipo de negocio.</p>
      </div>

      <section className={styles.zigzagContainer} ref={zigzagRef}>
        
        {VARIANTS.map((v, idx) => {
          const isReverse = idx % 2 !== 0; 
          const Icon = v.icon;

          return (
            <div key={v.id} className={`${styles.zigzagRow} ${isReverse ? styles.reverse : ''}`}>
              
              {/* TEXT CONTENT */}
              <div className={styles.textContent}>
                <div className={styles.variantTag} style={{ color: v.color }}>
                  <div className={styles.variantIconWrapper}>
                    <Icon size={16} />
                  </div>
                  {v.id.toUpperCase()}
                </div>
                <h2 className={styles.variantTitle}>{v.title.replace('Masticod ', '')}</h2>
                <p className={styles.variantDesc}>{v.desc}</p>
              </div>

              {/* POS SIMULATION */}
              <div className={styles.posWrapper}>
                <div className={styles.posSimulation}>
                  
                  {/* OVERLAY - ABARROTES */}
                  {v.id === 'abarrotes' && (
                    <div ref={printerOverlayRef} className={styles.printerOverlay} style={{ visibility: 'hidden', opacity: 0 }}>
                      <div className={`printedTicket ${styles.printedTicket}`}>
                        <div className={styles.printedTicketTitle}>MASTICOD ABARROTES</div>
                        {cart.map((c, i) => (
                          <div key={i} className={styles.ticketItem} style={{ borderBottomColor: '#ccc' }}>
                            <span>{c.name.substring(0, 15)}</span>
                            <span>${c.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className={styles.totalRow} style={{ borderTopColor: '#000', marginTop: '10px' }}>
                          <span>TOTAL VENTA</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className={styles.checkMarkWrapper}>
                        <div className={`checkMarkContainer ${styles.checkMarkContainer}`} style={{ opacity: 0, scale: 0 }}>
                          <div className={styles.checkMarkCircle}>
                            <Check size={50} color="#fff" strokeWidth={4} />
                          </div>
                          <h3 style={{ margin: 0, color: '#10B981', fontSize: '1.75rem' }}>¡Cobro Exitoso!</h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={styles.posHeader}>
                    <div className={styles.posHeaderLeft}>
                      <Icon size={18} color={v.color} />
                      <span>{v.title}</span>
                    </div>
                    <div className={styles.posControls}>
                      <div className={styles.posControlBtn} style={{ background: '#EF4444' }}></div>
                      <div className={styles.posControlBtn} style={{ background: '#F59E0B' }}></div>
                      <div className={styles.posControlBtn} style={{ background: '#10B981' }}></div>
                    </div>
                  </div>

                  {/* 1. ABARROTES */}
                  {v.id === 'abarrotes' && (
                    <div className={styles.abarrotesBody}>
                      <div className={styles.abarrotesMain}>
                        <div className={styles.productGrid}>
                          <div className={styles.productCard} onClick={() => addToCart('Coca Cola', 18)}>
                            <div className={styles.productIcon}><Coffee size={24} /></div>
                            <span className={styles.productName}>Coca Cola</span>
                            <span className={styles.productPrice}>$18.00</span>
                          </div>
                          <div className={styles.productCard} onClick={() => addToCart('Sabritas', 15)}>
                            <div className={styles.productIcon}><Package size={24} /></div>
                            <span className={styles.productName}>Sabritas</span>
                            <span className={styles.productPrice}>$15.00</span>
                          </div>
                          <div className={styles.productCard} onClick={() => addToCart('Agua Ciel', 12)}>
                            <div className={styles.productIcon}><Zap size={24} /></div>
                            <span className={styles.productName}>Agua Ciel</span>
                            <span className={styles.productPrice}>$12.00</span>
                          </div>
                          <div className={styles.productCard} onClick={() => addToCart('Oreo', 20)}>
                            <div className={styles.productIcon}><ShoppingCart size={24} /></div>
                            <span className={styles.productName}>Oreo</span>
                            <span className={styles.productPrice}>$20.00</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.abarrotesSidebar}>
                        <h3 style={{ margin: 0, borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', fontSize: '1rem', color: '#0F172A' }}>Ticket</h3>
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {cart.length === 0 ? (
                            <div style={{ color: '#94A3B8', textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>Clic para agregar</div>
                          ) : (
                            cart.map((item, i) => (
                              <div key={i} className={styles.ticketItem}>
                                <span>{item.name}</span>
                                <span>${item.price.toFixed(2)}</span>
                              </div>
                            ))
                          )}
                        </div>
                        <div className={styles.totalRow}>
                          <span>TOTAL</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className={`${styles.payBtn} ${cart.length === 0 ? styles.disabled : ''}`} onClick={handlePrint}>
                          COBRAR
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. FERRETERÍA */}
                  {v.id === 'ferreteria' && (
                    <div className={styles.ferreBody}>
                      <div className={styles.ferreCalcBox}>
                        <div className={styles.ferreHeader}>
                          <div className={styles.ferreIcon}><Wrench size={24} /></div>
                          <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0F172A' }}>Cable Eléctrico Calibre 12</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>Precio: ${ferrePrice.toFixed(2)} / metro</p>
                          </div>
                        </div>
                        <div className={styles.ferreInputGroup}>
                          <span className={styles.ferreLabel}>Cantidad a vender</span>
                          <div className={styles.ferreInputWrap}>
                            <input 
                              type="number" 
                              value={ferreQty} 
                              onChange={(e) => setFerreQty(Number(e.target.value) || 0)}
                              className={styles.ferreInput}
                              step="0.5"
                              min="0"
                            />
                            <div className={styles.ferreUnit}>metros</div>
                          </div>
                        </div>
                        <div className={styles.ferreResult}>
                          <span className={styles.ferreLabel}>Total Calculado:</span>
                          <span className={styles.ferreResultPrice}>${(ferreQty * ferrePrice).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. BOUTIQUE */}
                  {v.id === 'boutique' && (
                    <div className={styles.boutiqueBody}>
                      <div className={styles.boutiquePreview}>
                        <Shirt size={120} color={activeColor} style={{ filter: `drop-shadow(0 4px 10px ${activeColor}40)`, transition: 'color 0.3s' }} />
                      </div>
                      <div className={styles.boutiqueOptions}>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem 0', color: '#0F172A' }}>Camiseta Básica</h3>
                          <p style={{ fontSize: '1.1rem', color: '#3B82F6', fontWeight: 700, margin: 0 }}>$25.00</p>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.5rem', fontWeight: 600 }}>COLOR</div>
                          <div className={styles.colorGroup}>
                            {['#EF4444', '#3B82F6', '#10B981', '#F59E0B'].map(color => (
                              <div 
                                key={color}
                                className={`${styles.colorCircle} ${activeColor === color ? styles.active : ''}`}
                                style={{ background: color }}
                                onClick={() => setActiveColor(color)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.5rem', fontWeight: 600 }}>TALLA</div>
                          <div className={styles.sizeGroup}>
                            {['S', 'M', 'L'].map(size => (
                              <div 
                                key={size}
                                className={`${styles.sizeBtn} ${activeSize === size ? styles.active : ''}`}
                                onClick={() => setActiveSize(size)}
                              >
                                {size}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. RESTAURANTES */}
                  {v.id === 'restaurantes' && (
                    <div className={styles.restauranteBody}>
                      <div className={styles.restaMain}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Mapa de Mesas (Salón Principal)</div>
                        <div className={styles.mesaGrid}>
                          {tables.map(t => (
                            <div 
                              key={t.id} 
                              className={`${styles.mesa} ${t.status === 'ocupada' ? styles.occupied : ''} ${activeTable === t.id ? styles.active : ''}`}
                              onClick={() => setActiveTable(t.id)}
                            >
                              <div className={styles.mesaNumber}>Mesa {t.id}</div>
                              <div className={styles.mesaStatus}>{t.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.restaSidebar}>
                        <div className={styles.comandaHeader}>Comanda: Mesa {activeTable}</div>
                        <div className={styles.comandaList}>
                          {tables.find(t => t.id === activeTable)?.status === 'ocupada' ? (
                            <>
                              <div className={styles.comandaItem}><span>Hamburguesa</span><span>$150.00</span></div>
                              <div className={styles.comandaItem}><span>Refresco Kola</span><span>$45.00</span></div>
                              <div className={styles.comandaItem}><span>Papas Fritas</span><span>$65.00</span></div>
                            </>
                          ) : (
                            <div style={{ textAlign: 'center', color: '#94A3B8', marginTop: '1rem', fontSize: '0.85rem' }}>Mesa vacía.<br/>Clic para abrir cuenta.</div>
                          )}
                        </div>
                        <div className={`${styles.comandaBtn} ${tables.find(t => t.id === activeTable)?.status === 'disponible' ? styles.disabled : ''}`}>
                          Cobrar ${tables.find(t => t.id === activeTable)?.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. RETAIL */}
                  {v.id === 'retail' && (
                    <div className={styles.retailBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0F172A' }}>Dashboard Sucursales</h3>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
                          <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', display: 'inline-block' }}></span>
                          Sincronizado (En vivo)
                        </div>
                      </div>
                      <div className={styles.retailCards}>
                        <div className={styles.rCard}>
                          <div className={styles.rCardTitle}>Ventas Hoy</div>
                          <div className={styles.rCardValue}>${retailSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                          <div className={styles.rCardTrend}>↑ 12% vs ayer</div>
                        </div>
                        <div className={styles.rCard}>
                          <div className={styles.rCardTitle}>Tickets</div>
                          <div className={styles.rCardValue}>1,402</div>
                          <div className={styles.rCardTrend}>↑ 5% vs ayer</div>
                        </div>
                        <div className={styles.rCard}>
                          <div className={styles.rCardTitle}>Cajas Activas</div>
                          <div className={styles.rCardValue}>8 / 10</div>
                          <div className={styles.rCardTrend} style={{ color: '#475569' }}>Operando normal</div>
                        </div>
                      </div>
                      <div className={styles.rChartPlaceholder}>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '30%' }}></div></div>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '50%' }}></div></div>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '20%' }}></div></div>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '70%' }}></div></div>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '90%' }}></div></div>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '60%' }}></div></div>
                        <div className={styles.rBar}><div className={styles.rBarFill} style={{ height: '80%' }}></div></div>
                      </div>
                    </div>
                  )}

                  {/* 6. FARMACIA */}
                  {v.id === 'farmacia' && (
                    <div className={styles.farmaciaBody}>
                      <div className={styles.farmaSearch}>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                          <input type="text" placeholder="Buscar por sustancia o lote..." className={styles.farmaInput} style={{ paddingLeft: '2.5rem' }} />
                        </div>
                        <div className={styles.farmaBtn}>Buscar</div>
                      </div>
                      <div className={styles.farmaTableBox}>
                        <table className={styles.farmaTable}>
                          <thead>
                            <tr>
                              <th>Medicamento</th>
                              <th>Lote</th>
                              <th>Caducidad</th>
                              <th>Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {farmaciaDB.map((f, i) => (
                              <tr key={i} className={f.status === 'danger' ? styles.farmaWarning : ''}>
                                <td>{f.name}</td>
                                <td>{f.lote}</td>
                                <td>{f.caducidad}</td>
                                <td>
                                  {f.status === 'good' && <span className={`${styles.farmaTag} ${styles.farmaTagGood}`}>Vigente</span>}
                                  {f.status === 'warning' && <span className={`${styles.farmaTag} ${styles.farmaTagBad}`} style={{ background: '#FEF08A', color: '#854D0E' }}>Próximo</span>}
                                  {f.status === 'danger' && <span className={`${styles.farmaTag} ${styles.farmaTagBad}`}>Caducado</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 7. PAPELERÍA */}
                  {v.id === 'papeleria' && (
                    <div className={styles.papeBody}>
                      <div className={styles.papeTop}>
                        <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Venta Rápida</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{papeTotalQty} artículos en lista</div>
                        </div>
                        <div className={styles.papeScanBtn} onClick={handleScan}>
                          <ScanLine size={18} /> Escanear Libreta
                        </div>
                      </div>
                      <div className={styles.papeList}>
                        {papeItems.map((p, i) => (
                          <div key={i} className={styles.papeItem}>
                            <div className={styles.papeItemName}>
                              <span className={styles.papeQtyBadge}>{p.qty}x</span>
                              {p.name}
                            </div>
                            <div className={styles.papeItemPrice}>
                              ${(isWholesale ? p.qty * 18 : p.qty * 22).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      {isWholesale && (
                        <div className={styles.wholesaleAlert}>
                          🎉 ¡Descuento de mayoreo automático aplicado!
                        </div>
                      )}
                    </div>
                  )}

                  {/* 8. SALÓN */}
                  {v.id === 'salon' && (
                    <div className={styles.salonBody}>
                      <div className={styles.salonPanel}>
                        <h3 className={styles.salonTitle}>Citas de Hoy</h3>
                        <div className={styles.agendaList}>
                          <div className={styles.agendaItem}>
                            <Clock size={16} color="#EC4899" />
                            <div className={styles.agendaTime}>10:00 AM</div>
                            <div className={styles.agendaInfo}>
                              <span className={styles.agendaClient}>María Gómez</span>
                              <span className={styles.agendaService}>Corte + Tinte (Ana)</span>
                            </div>
                          </div>
                          <div className={styles.agendaItem} style={{ borderLeftColor: '#3B82F6' }}>
                            <Clock size={16} color="#3B82F6" />
                            <div className={styles.agendaTime}>11:30 AM</div>
                            <div className={styles.agendaInfo}>
                              <span className={styles.agendaClient}>Lorena Díaz</span>
                              <span className={styles.agendaService}>Manicura (Carlos)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.salonPanel}>
                        <h3 className={styles.salonTitle}>Comisiones Semanales</h3>
                        <div className={styles.commissionChart}>
                          {stylists.map(s => (
                            <div key={s.name} className={styles.commColumn}>
                              <div className={styles.commBarWrap}>
                                <div className={styles.commBar} style={{ height: `${s.comm}%`, background: s.color }}></div>
                              </div>
                              <span className={styles.commLabel}>{s.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}

      </section>

      {/* ── CTA / EN DESARROLLO ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <div className={styles.ctaDevContent}>
            <div className={styles.ctaBadge}><span className={styles.devDot}></span> En Desarrollo Activo</div>
            <h2 className={styles.ctaTitle}>Espéralo con ansias</h2>
            <p className={styles.ctaDesc}>Estamos adaptando Masticod para ser el mejor aliado de tu negocio. Muy pronto podrás probar todas estas herramientas.</p>
          </div>
          <div className={styles.ctaDevImage}>
            <img src="/productos/masticod/chuymasti.png" alt="Chuy en Masticod" className={styles.chuyImage} />
          </div>
        </div>
      </section>

    </div>
  );
}
