"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ShoppingCart,
  Package,
  Coffee,
  Shirt,
  Wrench,
  Zap,
  Store,
  Check,
  Utensils,
  Pill,
  BookOpen,
  Scissors,
  Clock,
  Search,
  ScanLine,
  ArrowUp,
  Layers,
  Barcode,
  ChevronRight,
} from "lucide-react";
import styles from "./MasticodContent.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VariantSpec {
  id: string;
  code: string;
  name: string;
  title: string;
  icon: typeof Store;
  color: string;
  softBg: string;
  desc: string;
  highlights: string[];
}

const VARIANTS: VariantSpec[] = [
  {
    id: "abarrotes",
    code: "POS-01",
    name: "Abarrotes",
    title: "Masticod Abarrotes",
    icon: Store,
    color: "#10B981",
    softBg: "#ECFDF5",
    desc: "Agilidad en cajas y cobro directo. Diseñado para tiendas de conveniencia y minisúpers donde cada segundo en fila cuenta.",
    highlights: ["Cobro rápido en 1 clic", "Corte de caja instantáneo", "Alertas de stock mínimo"],
  },
  {
    id: "ferreteria",
    code: "POS-02",
    name: "Ferretería",
    title: "Masticod Ferretería",
    icon: Wrench,
    color: "#F59E0B",
    softBg: "#FFFBEB",
    desc: "Venta a granel, control de medidas fraccionadas (metros, kilos, litros) y conversiones automáticas sin descuadrar inventario.",
    highlights: ["Venta por metro, kilo o pieza", "Conversión rollo a metro", "Catálogo por calibre y medida"],
  },
  {
    id: "boutique",
    code: "POS-03",
    name: "Boutique",
    title: "Masticod Boutique",
    icon: Shirt,
    color: "#3B82F6",
    softBg: "#EFF6FF",
    desc: "Administra tu catálogo por matriz de tallas, colores y temporadas con etiquetas listas para imprimir.",
    highlights: ["Matriz de tallas y colores", "Control de cambios y apartados", "Historial por temporada"],
  },
  {
    id: "restaurantes",
    code: "POS-04",
    name: "Restaurantes",
    title: "Masticod Restaurantes",
    icon: Utensils,
    color: "#EF4444",
    softBg: "#FEF2F2",
    desc: "Mapa visual de mesas en tiempo real, envío de comandas directo a cocina, división de cuentas y cálculo de propinas.",
    highlights: ["Mapa interactivo de salón", "Comandas a cocina y barra", "División de cuenta y propinas"],
  },
  {
    id: "retail",
    code: "POS-05",
    name: "Retail",
    title: "Masticod Retail",
    icon: ShoppingCart,
    color: "#8B5CF6",
    softBg: "#F5F3FF",
    desc: "Pensado para alto volumen: sincronización multi-caja y multi-sucursal en vivo con auditoría de cortes.",
    highlights: ["Sincronización multi-caja", "Monitor de ventas en tiempo real", "Control de turnos y cajeros"],
  },
  {
    id: "farmacia",
    code: "POS-06",
    name: "Farmacia",
    title: "Masticod Farmacia",
    icon: Pill,
    color: "#06B6D4",
    softBg: "#ECFEFF",
    desc: "Búsqueda instantánea por sustancia activa o nombre comercial, control estricto de lotes y semáforo de caducidades.",
    highlights: ["Búsqueda por sustancia activa", "Semáforo de lotes y caducidad", "Control de antibióticos y recetas"],
  },
  {
    id: "papeleria",
    code: "POS-07",
    name: "Papelería",
    title: "Masticod Papelería",
    icon: BookOpen,
    color: "#F43F5E",
    softBg: "#FFF1F2",
    desc: "Escaneo continuo de piezas sueltas y listas escolares completas con aplicación automática de precios de mayoreo.",
    highlights: ["Precio mayoreo automático", "Escaneo rápido de listas", "Venta por pieza, paquete o caja"],
  },
  {
    id: "salon",
    code: "POS-08",
    name: "Salón & Spa",
    title: "Masticod Salón",
    icon: Scissors,
    color: "#EC4899",
    softBg: "#FDF2F8",
    desc: "Agenda de citas por especialista, cobro mixto de servicios + productos y cálculo automático de comisiones.",
    highlights: ["Agenda por estilista o cabina", "Cálculo automático de comisión", "Ficha e historial de cliente"],
  },
];

export default function MasticodContent({
  isTransitioning,
}: {
  active?: unknown;
  isTransitioning: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const consoleRef = useRef<HTMLElement>(null);
  const stagePanelRef = useRef<HTMLDivElement>(null);
  const printerOverlayRef = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState<string>("abarrotes");
  const currentVariant = VARIANTS.find((v) => v.id === selectedId) ?? VARIANTS[0];
  const CurrentIcon = currentVariant.icon;

  /* ── 1. Estado Abarrotes ── */
  const [cart, setCart] = useState<{ name: string; price: number }[]>([
    { name: "Coca Cola 600ml", price: 18 },
    { name: "Galletas Oreo", price: 20 },
  ]);
  const [isPrinting, setIsPrinting] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (name: string, price: number) => {
    setCart((prev) => [...prev, { name, price }]);
  };

  const clearCart = () => {
    if (!isPrinting) setCart([]);
  };

  const handlePrint = () => {
    if (cart.length === 0 || isPrinting || !printerOverlayRef.current) return;
    setIsPrinting(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsPrinting(false);
          setCart([]);
        }, 1200);
      },
    });
    tl.to(printerOverlayRef.current, { autoAlpha: 1, duration: 0.25 })
      .fromTo(
        ".printedTicket",
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }
      )
      .to(".printedTicket", { opacity: 0, y: 20, duration: 0.25, delay: 0.55 })
      .fromTo(
        ".checkMarkContainer",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
  };

  /* ── 2. Estado Ferretería ── */
  const [ferreQty, setFerreQty] = useState<number>(2.5);
  const ferrePrice = 45.0;

  /* ── 3. Estado Boutique ── */
  const [activeColor, setActiveColor] = useState("#3B82F6");
  const [activeSize, setActiveSize] = useState("M");

  /* ── 4. Estado Restaurantes ── */
  const [activeTable, setActiveTable] = useState(4);
  const tables = [
    { id: 1, status: "disponible", total: 0 },
    { id: 2, status: "ocupada", total: 350 },
    { id: 3, status: "disponible", total: 0 },
    { id: 4, status: "ocupada", total: 260 },
    { id: 5, status: "ocupada", total: 120 },
    { id: 6, status: "disponible", total: 0 },
  ];

  /* ── 5. Estado Retail ── */
  const [retailSales, setRetailSales] = useState(14502);
  useEffect(() => {
    const int = setInterval(
      () => setRetailSales((prev) => prev + Math.floor(Math.random() * 25)),
      2500
    );
    return () => clearInterval(int);
  }, []);

  /* ── 6. Estado Farmacia ── */
  const [farmaQuery, setFarmaQuery] = useState("");
  const farmaciaDB = [
    { name: "Paracetamol 500mg", subst: "Paracetamol", lote: "L-8472", caducidad: "2026-11", status: "warning" },
    { name: "Ibuprofeno 400mg", subst: "Ibuprofeno", lote: "L-1192", caducidad: "2027-05", status: "good" },
    { name: "Amoxicilina 500mg", subst: "Amoxicilina", lote: "L-0034", caducidad: "2025-12", status: "danger" },
    { name: "Loratadina 10mg", subst: "Loratadina", lote: "L-5521", caducidad: "2028-02", status: "good" },
  ];
  const filteredFarma = farmaciaDB.filter(
    (f) =>
      f.name.toLowerCase().includes(farmaQuery.toLowerCase()) ||
      f.lote.toLowerCase().includes(farmaQuery.toLowerCase())
  );

  /* ── 7. Estado Papelería ── */
  const [papeItems, setPapeItems] = useState<{ name: string; qty: number }[]>([
    { name: "Lápiz Mirado HB2", qty: 4 },
    { name: "Libreta Profesional 100h", qty: 3 },
  ]);
  const papeTotalQty = papeItems.reduce((acc, curr) => acc + curr.qty, 0);
  const isWholesale = papeTotalQty >= 10;
  const handleScan = () => {
    setPapeItems((prev) =>
      prev.map((p) =>
        p.name === "Libreta Profesional 100h" ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  /* ── 8. Estado Salón ── */
  const stylists = [
    { name: "Ana", comm: 72, amount: "$3,420", color: "#EC4899" },
    { name: "Carlos", comm: 48, amount: "$2,150", color: "#3B82F6" },
    { name: "Sofía", comm: 90, amount: "$4,680", color: "#10B981" },
  ];

  /* ── Animaciones de entrada ── */
  useEffect(() => {
    if (isTransitioning) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-masti-hero]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [isTransitioning]);

  /* ── Transición Material Flat al cambiar de pestaña de giro ── */
  useEffect(() => {
    if (!stagePanelRef.current) return;
    gsap.fromTo(
      stagePanelRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }
    );
  }, [selectedId]);

  const jumpToVariant = (id: string) => {
    setSelectedId(id);
    consoleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* ── 1. HERO MATERIAL FLAT ── */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroGrid}>
          {/* Columna izquierda */}
          <div className={styles.heroLeft}>
            <div data-masti-hero className={styles.flatTagRow}>
              <span className={styles.flatStatusPill}>
                <span className={styles.flatStatusDot} /> POS MULTIGIRO
              </span>
              <span className={styles.flatCodePill}>8 EDICIONES ESPECIALIZADAS</span>
            </div>

            <h1 data-masti-hero className={styles.heroTitle}>
              Masti<span className={styles.heroTitleAccent}>cod</span>
            </h1>

            <p data-masti-hero className={styles.heroDesc}>
              La línea de sistemas Punto de Venta creada con diseño{" "}
              <strong>Material Flat</strong>: botones claros, cobro ultrarrápido en caja,
              inventario exacto y cero opciones de relleno.
            </p>

            {/* 3 KPIs planos */}
            <div data-masti-hero className={styles.kpiStrip}>
              <div className={styles.kpiTile}>
                <strong className={styles.kpiNum}>08</strong>
                <span className={styles.kpiLabel}>Giros de negocio</span>
              </div>
              <div className={styles.kpiTile}>
                <strong className={styles.kpiNum} style={{ color: "#10B981" }}>
                  0.2s
                </strong>
                <span className={styles.kpiLabel}>Velocidad de cobro</span>
              </div>
              <div className={styles.kpiTile}>
                <strong className={styles.kpiNum} style={{ color: "#3B82F6" }}>
                  100%
                </strong>
                <span className={styles.kpiLabel}>Listo para operar</span>
              </div>
            </div>

            {/* Accesos rápidos planos a los 8 giros */}
            <div data-masti-hero className={styles.quickJumps}>
              <span className={styles.quickJumpsLabel}>PROBAR SIMULADOR POR GIRO:</span>
              <div className={styles.quickChips}>
                {VARIANTS.map((v) => {
                  const VIcon = v.icon;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => jumpToVariant(v.id)}
                      className={styles.quickChip}
                      style={{ ["--chip-color" as string]: v.color }}
                    >
                      <VIcon size={14} style={{ color: v.color }} />
                      <span>{v.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna derecha: Terminal POS Material Flat plana y nítida */}
          <div data-masti-hero className={styles.heroRight}>
            <div className={styles.flatTerminal}>
              {/* Barra superior sólida de terminal */}
              <div className={styles.terminalBar}>
                <div className={styles.terminalBrand}>
                  <span className={styles.terminalSquare} />
                  <strong>MASTICOD POS · TERMINAL #01</strong>
                </div>
                <div className={styles.terminalBarcode}>
                  <Barcode size={16} />
                  <span>SKU-750105530007</span>
                </div>
              </div>

              {/* Cuerpo de la terminal en bloques Material Flat */}
              <div className={styles.terminalBody}>
                {/* Bloque principal verde sólido: Ventas de Hoy */}
                <div className={`${styles.flatTile} ${styles.tileEmerald}`}>
                  <div className={styles.tileTopRow}>
                    <span className={styles.tileTagLight}>VENTAS DE HOY</span>
                    <span className={styles.tileBadgeLight}>
                      <ArrowUp size={12} /> +14.8%
                    </span>
                  </div>
                  <div className={styles.tileBigValue}>$14,520.00</div>
                  <div className={styles.tileFlatBars}>
                    <span style={{ height: "42%" }} />
                    <span style={{ height: "58%" }} />
                    <span style={{ height: "48%" }} />
                    <span style={{ height: "76%" }} />
                    <span style={{ height: "68%" }} />
                    <span style={{ height: "92%" }} />
                    <span style={{ height: "100%" }} />
                  </div>
                </div>

                {/* Bloque Ticket Promedio */}
                <div className={`${styles.flatTile} ${styles.tileWhite}`}>
                  <span className={styles.tileTagDark}>TICKET PROMEDIO</span>
                  <div className={styles.tileMidValue}>$245.50</div>
                  <span className={styles.tileTrendGreen}>
                    <ArrowUp size={13} /> +12% vs. ayer
                  </span>
                </div>

                {/* Bloque Salud de Inventario */}
                <div className={`${styles.flatTile} ${styles.tileSlate}`}>
                  <div className={styles.tileTopRow}>
                    <span className={styles.tileTagLight}>INVENTARIO EXACTO</span>
                    <strong className={styles.tilePct}>98.4%</strong>
                  </div>
                  <div className={styles.flatProgressTrack}>
                    <div className={styles.flatProgressFill} style={{ width: "92%" }} />
                  </div>
                  <span className={styles.tileFootLight}>1,240 SKUs activos · 0 descuadres</span>
                </div>

                {/* Bloque Top Productos */}
                <div className={`${styles.flatTile} ${styles.tileWhite}`}>
                  <span className={styles.tileTagDark}>CAJA RÁPIDA</span>
                  <div className={styles.miniSkuList}>
                    <div className={styles.miniSkuRow}>
                      <span>01 · Bebidas</span>
                      <strong>85%</strong>
                    </div>
                    <div className={styles.miniSkuRow}>
                      <span>02 · Abarrotes</span>
                      <strong>64%</strong>
                    </div>
                    <div className={styles.miniSkuRow}>
                      <span>03 · Lácteos</span>
                      <strong>49%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FILOSOFÍA EN BLOQUES MATERIAL FLAT ── */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyHeader}>
          <span className={styles.sectionEyebrow}>ARQUITECTURA MODULAR</span>
          <h2 className={styles.philosophyTitle}>
            No adaptes tu negocio al software.{" "}
            <span className={styles.philosophyHighlight}>
              Elige el sistema hecho para tu giro.
            </span>
          </h2>
          <p className={styles.philosophyDesc}>
            Masticod no es un programa genérico lleno de menús que estorban. Cada edición
            trae únicamente las herramientas que tu mostrador necesita.
          </p>
        </div>

        <div className={styles.flatBentoGrid}>
          <div className={`${styles.flatBentoCard} ${styles.bentoNavy}`}>
            <div className={styles.bentoHeaderRow}>
              <span className={styles.bentoNum}>01</span>
              <span className={styles.bentoIconFlat} style={{ background: "#10B981", color: "#052E16" }}>
                <Check size={20} strokeWidth={3} />
              </span>
            </div>
            <h3 className={styles.bentoTitleLight}>Especialización Pura</h3>
            <p className={styles.bentoDescLight}>
              Si tienes una farmacia ves lotes y sustancias activas; si tienes un restaurante
              ves mesas y comandas. Cero pantallas innecesarias.
            </p>
          </div>

          <div className={`${styles.flatBentoCard} ${styles.bentoEmerald}`}>
            <div className={styles.bentoHeaderRow}>
              <span className={styles.bentoNumDark}>02</span>
              <span className={styles.bentoIconFlat} style={{ background: "#0F172A", color: "#FFFFFF" }}>
                <Zap size={20} />
              </span>
            </div>
            <h3 className={styles.bentoTitleDark}>Plug &amp; Play</h3>
            <p className={styles.bentoDescDark}>
              Tu personal aprende a cobrar en 15 minutos. Botones grandes, contraste alto y
              flujo directo compatible con lector de código e impresora térmica.
            </p>
          </div>

          <div className={`${styles.flatBentoCard} ${styles.bentoSurface}`}>
            <div className={styles.bentoHeaderRow}>
              <span className={styles.bentoNum}>03</span>
              <span className={styles.bentoIconFlat} style={{ background: "#3B82F6", color: "#FFFFFF" }}>
                <Layers size={20} />
              </span>
            </div>
            <h3 className={styles.bentoTitle}>Motor Corporativo Infocod</h3>
            <p className={styles.bentoDesc}>
              Las 8 ediciones comparten el mismo núcleo sólido: respaldos seguros, cortes de
              caja blindados y reportes claros para el dueño.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. CONSOLA INTERACTIVA MATERIAL FLAT (FORMA A: 8 PESTAÑAS EN VIVO) ── */}
      <section ref={consoleRef} className={styles.consoleSection}>
        <div className={styles.consoleHeader}>
          <span className={styles.sectionEyebrow}>SIMULADOR INTERACTIVO</span>
          <h2 className={styles.lineaTitle}>Explora las 8 ediciones de Masticod</h2>
          <p className={styles.lineaDesc}>
            Selecciona el giro de tu negocio y prueba cómo funciona su pantalla de operación.
          </p>
        </div>

        {/* Barra de 8 pestañas Material Flat */}
        <div className={styles.tabsRail} role="tablist" aria-label="Giros de Masticod">
          {VARIANTS.map((v) => {
            const Icon = v.icon;
            const isSelected = v.id === selectedId;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(v.id)}
                className={`${styles.flatTab} ${isSelected ? styles.flatTabActive : ""}`}
                style={{
                  ["--tab-color" as string]: v.color,
                  ["--tab-soft" as string]: v.softBg,
                }}
              >
                <span className={styles.flatTabIcon}>
                  <Icon size={17} />
                </span>
                <span className={styles.flatTabText}>{v.name}</span>
              </button>
            );
          })}
        </div>

        {/* Escenario Material Flat del giro seleccionado */}
        <div
          ref={stagePanelRef}
          className={styles.consoleStage}
          style={{
            ["--v-color" as string]: currentVariant.color,
            ["--v-soft" as string]: currentVariant.softBg,
          }}
        >
          {/* Columna izquierda: Ficha del giro seleccionado */}
          <div className={styles.stageSidebar}>
            <div className={styles.stageBadgeRow}>
              <span className={styles.stageCode}>{currentVariant.code}</span>
              <span className={styles.stageCategory}>{currentVariant.name.toUpperCase()}</span>
            </div>

            <div className={styles.stageTitleRow}>
              <div className={styles.stageBigIcon}>
                <CurrentIcon size={26} />
              </div>
              <h3 className={styles.stageTitle}>{currentVariant.title}</h3>
            </div>

            <p className={styles.stageDesc}>{currentVariant.desc}</p>

            <div className={styles.stageChecklist}>
              <span className={styles.checklistHeading}>INCLUIDO DE FÁBRICA:</span>
              {currentVariant.highlights.map((item) => (
                <div key={item} className={styles.checklistItem}>
                  <span className={styles.checklistBullet}>
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Botón para saltar al siguiente giro */}
            <button
              type="button"
              className={styles.nextVariantBtn}
              onClick={() => {
                const idx = VARIANTS.findIndex((v) => v.id === selectedId);
                const next = VARIANTS[(idx + 1) % VARIANTS.length];
                setSelectedId(next.id);
              }}
            >
              <span>
                Siguiente edición:{" "}
                <strong>
                  {VARIANTS[(VARIANTS.findIndex((v) => v.id === selectedId) + 1) % VARIANTS.length].name}
                </strong>
              </span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Columna derecha: Ventana POS interactiva Material Flat */}
          <div className={styles.posWrapper}>
            <div className={styles.posSimulation}>
              {/* Overlay de impresión de ticket (Abarrotes) */}
              {currentVariant.id === "abarrotes" && (
                <div
                  ref={printerOverlayRef}
                  className={styles.printerOverlay}
                  style={{ visibility: "hidden", opacity: 0 }}
                >
                  <div className={`printedTicket ${styles.printedTicket}`}>
                    <div className={styles.printedTicketTitle}>MASTICOD ABARROTES</div>
                    {cart.map((c, i) => (
                      <div key={i} className={styles.ticketItem}>
                        <span>{c.name.substring(0, 16)}</span>
                        <span>${c.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className={styles.totalRow}>
                      <span>TOTAL VENTA</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className={styles.checkMarkWrapper}>
                    <div
                      className={`checkMarkContainer ${styles.checkMarkContainer}`}
                      style={{ opacity: 0 }}
                    >
                      <div className={styles.checkMarkCircle}>
                        <Check size={44} color="#fff" strokeWidth={3.5} />
                      </div>
                      <h4 style={{ margin: 0, color: "#0F172A", fontSize: "1.4rem", fontWeight: 800 }}>
                        ¡Ticket Impreso y Cobrado!
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {/* Cabecera Material Flat del color sólido del giro */}
              <div className={styles.posHeader}>
                <div className={styles.posHeaderLeft}>
                  <span className={styles.posHeaderIcon}>
                    <CurrentIcon size={17} />
                  </span>
                  <strong>{currentVariant.title}</strong>
                  <span className={styles.posHeaderCode}>{currentVariant.code}</span>
                </div>
                <div className={styles.posHeaderStatus}>
                  <span className={styles.posOnlineDot} /> CAJA ACTIVA
                </div>
              </div>

              {/* 1. ABARROTES */}
              {currentVariant.id === "abarrotes" && (
                <div className={styles.abarrotesBody}>
                  <div className={styles.abarrotesMain}>
                    <div className={styles.posSubhead}>
                      <span>TOCA UN PRODUCTO PARA AGREGAR AL TICKET</span>
                      {cart.length > 0 && (
                        <button type="button" onClick={clearCart} className={styles.clearLink}>
                          Vaciar
                        </button>
                      )}
                    </div>
                    <div className={styles.productGrid}>
                      {[
                        { name: "Coca Cola 600ml", price: 18, icon: Coffee },
                        { name: "Sabritas Sal 45g", price: 15, icon: Package },
                        { name: "Agua Ciel 1L", price: 12, icon: Zap },
                        { name: "Galletas Oreo", price: 20, icon: ShoppingCart },
                        { name: "Leche Entera 1L", price: 28, icon: Store },
                        { name: "Pan Blanco Grande", price: 42, icon: Package },
                      ].map((prod) => {
                        const PIcon = prod.icon;
                        return (
                          <button
                            key={prod.name}
                            type="button"
                            className={styles.productCard}
                            onClick={() => addToCart(prod.name, prod.price)}
                          >
                            <div className={styles.productIcon}>
                              <PIcon size={20} />
                            </div>
                            <span className={styles.productName}>{prod.name}</span>
                            <span className={styles.productPrice}>${prod.price.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.abarrotesSidebar}>
                    <div className={styles.ticketHeader}>
                      <strong>TICKET #0048</strong>
                      <span>{cart.length} arts.</span>
                    </div>
                    <div className={styles.ticketScroll}>
                      {cart.length === 0 ? (
                        <div className={styles.ticketEmpty}>
                          Selecciona productos a la izquierda
                        </div>
                      ) : (
                        cart.map((item, i) => (
                          <div key={i} className={styles.ticketItem}>
                            <span>{item.name}</span>
                            <strong>${item.price.toFixed(2)}</strong>
                          </div>
                        ))
                      )}
                    </div>
                    <div className={styles.totalRow}>
                      <span>TOTAL</span>
                      <strong>${total.toFixed(2)}</strong>
                    </div>
                    <button
                      type="button"
                      className={`${styles.payBtn} ${cart.length === 0 ? styles.disabled : ""}`}
                      onClick={handlePrint}
                    >
                      COBRAR E IMPRIMIR (F12)
                    </button>
                  </div>
                </div>
              )}

              {/* 2. FERRETERÍA */}
              {currentVariant.id === "ferreteria" && (
                <div className={styles.ferreBody}>
                  <div className={styles.ferreCalcBox}>
                    <div className={styles.ferreHeader}>
                      <div className={styles.ferreIcon}>
                        <Wrench size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#0F172A", fontWeight: 800 }}>
                          Cable Eléctrico Uso Rudo Calibre 12
                        </h4>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>
                          SKU: FER-CB12 · Precio por metro: ${ferrePrice.toFixed(2)} MXN
                        </p>
                      </div>
                      <span className={styles.flatStockTag}>Rollo: 84.5m disp.</span>
                    </div>

                    <div className={styles.ferreInputGroup}>
                      <span className={styles.ferreLabel}>CANTIDAD FRACCIONADA A DESPACHAR</span>
                      <div className={styles.ferreControlsRow}>
                        {[0.5, 1, 2.5, 5, 10].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setFerreQty(preset)}
                            className={`${styles.ferrePresetBtn} ${
                              ferreQty === preset ? styles.ferrePresetActive : ""
                            }`}
                          >
                            {preset}m
                          </button>
                        ))}
                      </div>
                      <div className={styles.ferreInputWrap}>
                        <input
                          type="number"
                          value={ferreQty}
                          onChange={(e) => setFerreQty(Number(e.target.value) || 0)}
                          className={styles.ferreInput}
                          step="0.5"
                          min="0"
                        />
                        <div className={styles.ferreUnit}>METROS</div>
                      </div>
                    </div>

                    <div className={styles.ferreResult}>
                      <div>
                        <span className={styles.ferreLabel}>IMPORTE EXACTO A COBRAR</span>
                        <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
                          Descuenta {ferreQty}m automáticamente del rollo maestro
                        </div>
                      </div>
                      <span className={styles.ferreResultPrice}>
                        ${(ferreQty * ferrePrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. BOUTIQUE */}
              {currentVariant.id === "boutique" && (
                <div className={styles.boutiqueBody}>
                  <div className={styles.boutiquePreview}>
                    <Shirt
                      size={116}
                      color={activeColor}
                      style={{ transition: "color 0.2s ease" }}
                    />
                    <span className={styles.boutiqueSkuBadge}>
                      SKU: BOU-{activeSize}-{activeColor.replace("#", "")}
                    </span>
                  </div>
                  <div className={styles.boutiqueOptions}>
                    <div>
                      <span className={styles.ferreLabel}>COLECCIÓN TEMPORADA</span>
                      <h4 style={{ fontSize: "1.35rem", margin: "0.2rem 0", color: "#0F172A", fontWeight: 800 }}>
                        Camiseta Algodón Premium
                      </h4>
                      <p style={{ fontSize: "1.25rem", color: "#3B82F6", fontWeight: 800, margin: 0, fontFamily: "var(--font-jetbrains), monospace" }}>
                        $349.00 MXN
                      </p>
                    </div>

                    <div>
                      <div className={styles.ferreLabel} style={{ marginBottom: "0.5rem" }}>
                        SELECCIONAR COLOR
                      </div>
                      <div className={styles.colorGroup}>
                        {["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#0F172A"].map((color) => (
                          <button
                            key={color}
                            type="button"
                            aria-label={`Color ${color}`}
                            className={`${styles.colorCircle} ${
                              activeColor === color ? styles.active : ""
                            }`}
                            style={{ background: color }}
                            onClick={() => setActiveColor(color)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className={styles.ferreLabel} style={{ marginBottom: "0.5rem" }}>
                        TALLA DISPONIBLE
                      </div>
                      <div className={styles.sizeGroup}>
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                          <button
                            key={size}
                            type="button"
                            className={`${styles.sizeBtn} ${
                              activeSize === size ? styles.active : ""
                            }`}
                            onClick={() => setActiveSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. RESTAURANTES */}
              {currentVariant.id === "restaurantes" && (
                <div className={styles.restauranteBody}>
                  <div className={styles.restaMain}>
                    <div className={styles.posSubhead}>
                      <span>MAPA DE MESAS · SALÓN PRINCIPAL (CLIC PARA VER CUENTA)</span>
                    </div>
                    <div className={styles.mesaGrid}>
                      {tables.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className={`${styles.mesa} ${
                            t.status === "ocupada" ? styles.occupied : ""
                          } ${activeTable === t.id ? styles.active : ""}`}
                          onClick={() => setActiveTable(t.id)}
                        >
                          <div className={styles.mesaNumber}>MESA 0{t.id}</div>
                          <div className={styles.mesaStatus}>{t.status}</div>
                          {t.total > 0 && (
                            <div className={styles.mesaTotal}>${t.total.toFixed(2)}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.restaSidebar}>
                    <div className={styles.comandaHeader}>COMANDA · MESA 0{activeTable}</div>
                    <div className={styles.comandaList}>
                      {tables.find((t) => t.id === activeTable)?.status === "ocupada" ? (
                        <>
                          <div className={styles.comandaItem}>
                            <span>1x Hamburguesa Clásica</span>
                            <strong>$150.00</strong>
                          </div>
                          <div className={styles.comandaItem}>
                            <span>1x Refresco 355ml</span>
                            <strong>$45.00</strong>
                          </div>
                          <div className={styles.comandaItem}>
                            <span>1x Orden Papas Gajo</span>
                            <strong>$65.00</strong>
                          </div>
                        </>
                      ) : (
                        <div className={styles.ticketEmpty}>
                          Mesa libre · Lista para asignar comensales
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className={`${styles.comandaBtn} ${
                        tables.find((t) => t.id === activeTable)?.status === "disponible"
                          ? styles.disabled
                          : ""
                      }`}
                    >
                      CERRAR CUENTA $
                      {tables.find((t) => t.id === activeTable)?.total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}

              {/* 5. RETAIL */}
              {currentVariant.id === "retail" && (
                <div className={styles.retailBody}>
                  <div className={styles.posSubhead}>
                    <span>MONITOR MULTICAJA &amp; SUCURSALES EN TIEMPO REAL</span>
                    <span style={{ color: "#10B981", fontWeight: 800 }}>● SINCRONIZADO</span>
                  </div>
                  <div className={styles.retailCards}>
                    <div className={styles.rCard}>
                      <div className={styles.rCardTitle}>VENTAS ACUMULADAS</div>
                      <div className={styles.rCardValue}>
                        ${retailSales.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                      <div className={styles.rCardTrend}>↑ +12% vs. ayer</div>
                    </div>
                    <div className={styles.rCard}>
                      <div className={styles.rCardTitle}>TICKETS EMITIDOS</div>
                      <div className={styles.rCardValue}>1,402</div>
                      <div className={styles.rCardTrend}>↑ +5% flujo por hora</div>
                    </div>
                    <div className={styles.rCard}>
                      <div className={styles.rCardTitle}>CAJAS ACTIVAS</div>
                      <div className={styles.rCardValue}>08 / 10</div>
                      <div className={styles.rCardTrend} style={{ color: "#64748B" }}>
                        Sin fila en mostrador
                      </div>
                    </div>
                  </div>
                  <div className={styles.rChartPlaceholder}>
                    {[35, 55, 40, 72, 92, 68, 86, 95, 78, 88].map((h, i) => (
                      <div key={i} className={styles.rBar}>
                        <div className={styles.rBarFill} style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. FARMACIA */}
              {currentVariant.id === "farmacia" && (
                <div className={styles.farmaciaBody}>
                  <div className={styles.farmaSearch}>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Search
                        size={17}
                        color="#64748B"
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                      <input
                        type="text"
                        value={farmaQuery}
                        onChange={(e) => setFarmaQuery(e.target.value)}
                        placeholder="Filtrar por sustancia activa, nombre o lote (ej. Paracetamol)..."
                        className={styles.farmaInput}
                      />
                    </div>
                  </div>
                  <div className={styles.farmaTableBox}>
                    <table className={styles.farmaTable}>
                      <thead>
                        <tr>
                          <th>Medicamento / Sustancia</th>
                          <th>Lote</th>
                          <th>Caducidad</th>
                          <th>Semáforo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFarma.map((f, i) => (
                          <tr
                            key={i}
                            className={f.status === "danger" ? styles.farmaWarning : ""}
                          >
                            <td>
                              <strong>{f.name}</strong>
                              <div style={{ fontSize: "0.74rem", color: "#64748B" }}>
                                Activo: {f.subst}
                              </div>
                            </td>
                            <td style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                              {f.lote}
                            </td>
                            <td style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                              {f.caducidad}
                            </td>
                            <td>
                              {f.status === "good" && (
                                <span className={`${styles.farmaTag} ${styles.farmaTagGood}`}>
                                  VIGENTE
                                </span>
                              )}
                              {f.status === "warning" && (
                                <span className={`${styles.farmaTag} ${styles.farmaTagWarn}`}>
                                  PRÓXIMO
                                </span>
                              )}
                              {f.status === "danger" && (
                                <span className={`${styles.farmaTag} ${styles.farmaTagBad}`}>
                                  BLOQUEADO
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 7. PAPELERÍA */}
              {currentVariant.id === "papeleria" && (
                <div className={styles.papeBody}>
                  <div className={styles.papeTop}>
                    <div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A" }}>
                        Escáner de Lista Escolar ({papeTotalQty} pzas)
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>
                        {isWholesale
                          ? "Tarifa de MAYOREO activa (10+ artículos)"
                          : `Faltan ${10 - papeTotalQty} artículos para activar precio de mayoreo`}
                      </div>
                    </div>
                    <button type="button" className={styles.papeScanBtn} onClick={handleScan}>
                      <ScanLine size={17} /> + Escanear Libreta
                    </button>
                  </div>
                  <div className={styles.papeList}>
                    {papeItems.map((p, i) => (
                      <div key={i} className={styles.papeItem}>
                        <div className={styles.papeItemName}>
                          <span className={styles.papeQtyBadge}>{p.qty}x</span>
                          <span>{p.name}</span>
                        </div>
                        <div className={styles.papeItemPrice}>
                          ${(isWholesale ? p.qty * 18 : p.qty * 22).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {isWholesale && (
                    <div className={styles.wholesaleAlert}>
                      ✓ DESCUENTO DE MAYOREO APLICADO AUTOMÁTICAMENTE (-18%)
                    </div>
                  )}
                </div>
              )}

              {/* 8. SALÓN */}
              {currentVariant.id === "salon" && (
                <div className={styles.salonBody}>
                  <div className={styles.salonPanel}>
                    <h4 className={styles.salonTitle}>CITAS EN CABINA HOY</h4>
                    <div className={styles.agendaList}>
                      <div className={styles.agendaItem}>
                        <Clock size={16} color="#EC4899" />
                        <div className={styles.agendaTime}>10:00</div>
                        <div className={styles.agendaInfo}>
                          <span className={styles.agendaClient}>María Gómez</span>
                          <span className={styles.agendaService}>Corte + Colorimetría · Ana</span>
                        </div>
                      </div>
                      <div className={styles.agendaItem} style={{ borderLeftColor: "#3B82F6" }}>
                        <Clock size={16} color="#3B82F6" />
                        <div className={styles.agendaTime}>11:30</div>
                        <div className={styles.agendaInfo}>
                          <span className={styles.agendaClient}>Lorena Díaz</span>
                          <span className={styles.agendaService}>Gelish + Spa · Carlos</span>
                        </div>
                      </div>
                      <div className={styles.agendaItem} style={{ borderLeftColor: "#10B981" }}>
                        <Clock size={16} color="#10B981" />
                        <div className={styles.agendaTime}>13:00</div>
                        <div className={styles.agendaInfo}>
                          <span className={styles.agendaClient}>Valeria Ruiz</span>
                          <span className={styles.agendaService}>Tratamiento Capilar · Sofía</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.salonPanel}>
                    <h4 className={styles.salonTitle}>COMISIONES POR ESTILISTA</h4>
                    <div className={styles.commissionChart}>
                      {stylists.map((s) => (
                        <div key={s.name} className={styles.commColumn}>
                          <strong style={{ fontSize: "0.75rem", color: "#0F172A", fontFamily: "var(--font-jetbrains), monospace" }}>
                            {s.amount}
                          </strong>
                          <div className={styles.commBarWrap}>
                            <div
                              className={styles.commBar}
                              style={{ height: `${s.comm}%`, background: s.color }}
                            />
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
      </section>

      {/* ── 4. CTA / EN DESARROLLO (Normal, sin tarjeta con borde) ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <div className={styles.ctaDevContent}>
            <div className={styles.ctaBadge}>
              <span className={styles.devDot} /> En Desarrollo Activo
            </div>
            <h2 className={styles.ctaTitle}>Espéralo con ansias</h2>
            <p className={styles.ctaDesc}>
              Estamos adaptando Masticod para ser el mejor aliado de tu negocio. Muy pronto
              podrás probar todas estas herramientas.
            </p>
          </div>
          <div className={styles.ctaDevImage}>
            <Image
              src="/productos/masticod/chuymasti.png"
              alt="Chuy en Masticod"
              width={560}
              height={460}
              sizes="(max-width: 768px) 340px, 520px"
              className={styles.chuyImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
