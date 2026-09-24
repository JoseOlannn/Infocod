"use client";

import { useEffect, useRef } from 'react';
import styles from './LiquidTrail.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function LiquidTrail() {
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

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000 };
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x === -1000 ? e.clientX : mouse.x;
      mouse.prevY = mouse.y === -1000 ? e.clientY : mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Spawn particles proportional to distance moved (creates a smooth trail)
      const particleCount = Math.min(Math.floor(dist / 2) + 2, 15);
      
      const colors = [
        '#4F8EF7', // Azul corporativo
        '#00C96B', // Verde corporativo
        '#6C2BFF'  // Morado corporativo
      ];

      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const px = mouse.prevX + dx * t;
        const py = mouse.prevY + dy * t;
        
        particles.push({
          x: px + (Math.random() - 0.5) * 15, // Dispersión inicial
          y: py + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 1.5 + dx * 0.02, // Inercia
          vy: (Math.random() - 0.5) * 1.5 + dy * 0.02,
          life: 1,
          maxLife: Math.random() * 50 + 30, // Duración del humo
          size: Math.random() * 60 + 20, // Tamaño de la "burbuja" de humo
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      isMoving = false;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const draw = () => {
      // Fondo oscuro semitransparente para dejar estelas suaves (motion blur)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Mezcla aditiva para que los colores brillen como luz/fluido
      ctx.globalCompositeOperation = 'screen'; 

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.size *= 0.96; // El humo se encoge

        if (p.life >= p.maxLife || p.size < 1) {
          particles.splice(i, 1);
          continue;
        }

        // Se desvanece con el tiempo
        const alpha = Math.max(0, 1 - (p.life / p.maxLife));
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        
        let r, g, b;
        if (p.color === '#4F8EF7') { r=79; g=142; b=247; }
        else if (p.color === '#00C96B') { r=0; g=201; b=107; }
        else { r=108; g=43; b=255; }
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reiniciar mouse.prev para no dibujar estelas cuando el mouse está quieto
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

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
