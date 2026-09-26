"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./NeuralNetwork.module.css";

/* ── Types ── */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
  /** 0 = normal, 1 = "data" node (slightly larger + label), 2 = "hub" (big, rare) */
  kind: 0 | 1 | 2;
}

/* ── Brand palette ── */
const PALETTE = [
  { color: "rgba(79,142,247,0.85)",  glow: "rgba(79,142,247,0.35)" },  // Blue
  { color: "rgba(108,43,255,0.85)",  glow: "rgba(108,43,255,0.35)" },  // Purple
  { color: "rgba(0,201,107,0.85)",   glow: "rgba(0,201,107,0.30)" },   // Green
  { color: "rgba(99,121,155,0.60)",  glow: "rgba(99,121,155,0.15)" },  // Slate (filler)
];

const CONNECTION_DIST  = 180;
const MOUSE_RADIUS     = 260;
const MOUSE_ATTRACT    = 0.012;
const NODE_COUNT_BASE  = 85;   // for 1920×1080
const HUB_CHANCE       = 0.04;
const DATA_CHANCE      = 0.18;

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const nodesRef  = useRef<Node[]>([]);
  const rafRef    = useRef<number>(0);
  const dimRef    = useRef({ w: 0, h: 0 });

  /* ── Create nodes proportionally to viewport area ── */
  const spawnNodes = useCallback((w: number, h: number) => {
    const area  = w * h;
    const base  = 1920 * 1080;
    const count = Math.round(NODE_COUNT_BASE * (area / base));
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      const roll = Math.random();
      const kind: 0 | 1 | 2 = roll < HUB_CHANCE ? 2 : roll < HUB_CHANCE + DATA_CHANCE ? 1 : 0;
      const baseR = kind === 2 ? 5 + Math.random() * 3 : kind === 1 ? 3 + Math.random() * 2 : 1.5 + Math.random() * 1.5;
      const pal = kind === 2
        ? PALETTE[Math.floor(Math.random() * 3)]   // hub = brand color
        : kind === 1
        ? PALETTE[Math.floor(Math.random() * 3)]
        : PALETTE[Math.floor(Math.random() * PALETTE.length)];

      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: baseR,
        baseRadius: baseR,
        color: pal.color,
        glowColor: pal.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
        kind,
      });
    }
    return nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ── Sizing ── */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = window.innerWidth;
      const h   = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w, h };
      nodesRef.current = spawnNodes(w, h);
    };
    resize();

    /* ── Mouse ── */
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    /* ── Draw loop ── */
    const draw = () => {
      const { w, h } = dimRef.current;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      /* Background gradient */
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, w * 0.8);
      bg.addColorStop(0, "#ffffff");
      bg.addColorStop(0.6, "#f8faff");
      bg.addColorStop(1, "#eef1f8");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      /* Update positions + pulse */
      for (const n of nodes) {
        n.pulsePhase += n.pulseSpeed;
        const pulse = Math.sin(n.pulsePhase) * 0.35 + 1;
        n.radius = n.baseRadius * pulse;

        /* Drift */
        n.x += n.vx;
        n.y += n.vy;

        /* Mouse attract */
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.1) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_ATTRACT;
          n.vx += dx * force;
          n.vy += dy * force;
        }

        /* Damping */
        n.vx *= 0.995;
        n.vy *= 0.995;

        /* Boundaries (wrap) */
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      /* Connections */
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79,142,247,${alpha})`;
            ctx.lineWidth = (a.kind === 2 || b.kind === 2) ? 1.2 : 0.6;
            ctx.stroke();
          }
        }
      }

      /* Mouse glow */
      if (mouse.x > -1000) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        glow.addColorStop(0, "rgba(79,142,247,0.12)");
        glow.addColorStop(0.5, "rgba(108,43,255,0.06)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      /* Draw nodes */
      for (const n of nodes) {
        /* Outer glow */
        if (n.kind > 0) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = n.glowColor;
          ctx.fill();
        }

        /* Core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        /* White highlight for hubs */
        if (n.kind === 2) {
          ctx.beginPath();
          ctx.arc(n.x - n.radius * 0.25, n.y - n.radius * 0.25, n.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.fill();
        }
      }

      /* Subtle data-flow lines (animated) */
      const time = Date.now() * 0.001;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.kind < 1) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.kind < 1) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST * 1.8) {
            const alpha = (1 - dist / (CONNECTION_DIST * 1.8)) * 0.18;
            /* Flowing dot along the line */
            const t = (Math.sin(time * 1.5 + i + j) + 1) * 0.5;
            const px = a.x + (b.x - a.x) * t;
            const py = a.y + (b.y - a.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108,43,255,${alpha * 2})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnNodes]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
