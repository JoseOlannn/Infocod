"use client";

import { useEffect, useRef } from "react";
import { observeActive, isCoarsePointer, prefersReducedMotion } from "@/utils/animation";
import styles from "./CyberGrid.module.css";

const SPACING = 50;
const MAX_DIST = 200;
const PUSH = 0.5;
const EASE_BACK = 0.1;
const GLOW_RADIUS = 300;
const REST_EPSILON = 0.05;
const MAX_DPR = 1.5;

/**
 * Malla interactiva que se deforma alrededor del cursor.
 *
 * Optimizaciones:
 * - Solo anima mientras está en pantalla y la pestaña está visible.
 * - Deja de redibujar cuando la malla está en reposo y el mouse está fuera.
 * - Gradientes creados una vez (no por frame) y glow pintado solo en su área.
 * - En táctil / reduced-motion se dibuja una sola vez, estática.
 */
export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const interactive = !isCoarsePointer() && !prefersReducedMotion();

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    // Posiciones actuales en arrays planos: menos objetos, mejor caché.
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let lineGradient: CanvasGradient | null = null;
    let glowGradient: CanvasGradient | null = null;

    const mouse = { x: -9999, y: -9999, inside: false };
    let rafId = 0;
    let running = false;
    let active = false;

    const idx = (i: number, j: number) => i * (rows + 1) + j;

    const setup = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(width / SPACING) + 1;
      rows = Math.floor(height / SPACING) + 1;
      const total = (cols + 1) * (rows + 1);
      px = new Float32Array(total);
      py = new Float32Array(total);
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          px[idx(i, j)] = i * SPACING;
          py[idx(i, j)] = j * SPACING;
        }
      }

      lineGradient = ctx.createLinearGradient(0, 0, width, height);
      lineGradient.addColorStop(0, "rgba(108, 43, 255, 0.3)");
      lineGradient.addColorStop(0.5, "rgba(79, 142, 247, 0.3)");
      lineGradient.addColorStop(1, "rgba(0, 201, 107, 0.3)");

      // Centrado en (0,0): se posiciona con translate al pintar.
      glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, GLOW_RADIUS);
      glowGradient.addColorStop(0, "rgba(79, 142, 247, 0.25)");
      glowGradient.addColorStop(1, "rgba(79, 142, 247, 0)");
    };

    /** Actualiza posiciones. Devuelve true si algo sigue moviéndose. */
    const step = (): boolean => {
      let moving = false;
      for (let i = 0; i <= cols; i++) {
        const ox = i * SPACING;
        for (let j = 0; j <= rows; j++) {
          const k = idx(i, j);
          const oy = j * SPACING;
          const dx = mouse.x - ox;
          const dy = mouse.y - oy;
          const distSq = dx * dx + dy * dy;

          if (mouse.inside && distSq < MAX_DIST * MAX_DIST) {
            const force = (MAX_DIST - Math.sqrt(distSq)) / MAX_DIST;
            px[k] = ox - dx * force * PUSH;
            py[k] = oy - dy * force * PUSH;
            moving = true;
          } else {
            const ex = ox - px[k];
            const ey = oy - py[k];
            if (Math.abs(ex) > REST_EPSILON || Math.abs(ey) > REST_EPSILON) {
              px[k] += ex * EASE_BACK;
              py[k] += ey * EASE_BACK;
              moving = true;
            } else {
              px[k] = ox;
              py[k] = oy;
            }
          }
        }
      }
      return moving;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const k = idx(i, j);
          if (i < cols) {
            const r = idx(i + 1, j);
            ctx.moveTo(px[k], py[k]);
            ctx.lineTo(px[r], py[r]);
          }
          if (j < rows) {
            const d = k + 1;
            ctx.moveTo(px[k], py[k]);
            ctx.lineTo(px[d], py[d]);
          }
        }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineGradient!;
      ctx.stroke();

      if (mouse.inside && glowGradient) {
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.fillStyle = glowGradient;
        ctx.fillRect(-GLOW_RADIUS, -GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);
        ctx.restore();
      }
    };

    const loop = () => {
      const moving = step();
      render();
      if (moving || mouse.inside) {
        rafId = requestAnimationFrame(loop);
      } else {
        running = false; // Reposo total: no gastamos frames.
      }
    };

    const wake = () => {
      if (running || !active || !interactive) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    const sleep = () => {
      cancelAnimationFrame(rafId);
      running = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height;
      wake();
    };

    const handleMouseLeave = () => {
      mouse.inside = false;
      wake(); // deja que la malla regrese a su lugar y luego se duerme
    };

    setup();
    render();

    const resizeObserver = new ResizeObserver(() => {
      setup();
      render();
    });
    resizeObserver.observe(parent);

    const stopObserving = observeActive(canvas, (isActive) => {
      active = isActive;
      if (isActive) wake();
      else sleep();
    });

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      sleep();
      stopObserving();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
