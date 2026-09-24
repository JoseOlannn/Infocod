"use client";

import { useEffect, useRef } from 'react';
import styles from './CyberGrid.module.css';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const spacing = 50; 
    let cols = Math.floor(width / spacing) + 1;
    let rows = Math.floor(height / spacing) + 1;

    let points: Point[][] = [];

    const initPoints = () => {
      points = [];
      for (let i = 0; i <= cols; i++) {
        points[i] = [];
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          points[i][j] = { x, y, originX: x, originY: y };
        }
      }
    };
    initPoints();

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.floor(width / spacing) + 1;
      rows = Math.floor(height / spacing) + 1;
      initPoints();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const p = points[i][j];
          
          const dx = mouse.x - p.originX;
          const dy = mouse.y - p.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 200; 
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x = p.originX - (dx * force * 0.5);
            p.y = p.originY - (dy * force * 0.5);
          } else {
            p.x += (p.originX - p.x) * 0.1;
            p.y += (p.originY - p.y) * 0.1;
          }
        }
      }

      ctx.lineWidth = 1; // Líneas finas y suaves
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const p = points[i][j];
          
          if (i < cols) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(points[i + 1][j].x, points[i + 1][j].y);
          }
          if (j < rows) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(points[i][j + 1].x, points[i][j + 1].y);
          }
        }
      }
      
      // Gradiente corporativo para las líneas de la malla más suaves
      const gridGradient = ctx.createLinearGradient(0, 0, width, height);
      gridGradient.addColorStop(0, 'rgba(108, 43, 255, 0.3)'); // Morado suave
      gridGradient.addColorStop(0.5, 'rgba(79, 142, 247, 0.3)'); // Azul suave
      gridGradient.addColorStop(1, 'rgba(0, 201, 107, 0.3)'); // Verde suave
      
      ctx.strokeStyle = gridGradient; 
      ctx.stroke();

      // Brillo del cursor
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      glow.addColorStop(0, 'rgba(79, 142, 247, 0.25)'); // Azul corporativo suave
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
