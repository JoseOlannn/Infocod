"use client";
import { useEffect, useRef } from 'react';
import styles from './MagneticAura.module.css';

export default function MagneticAura() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // LERP (Linear Interpolation) for super smooth trailing effect
    const render = () => {
      currentX += (targetX - currentX) * 0.05; // 0.05 is the smoothness factor
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.auraContainer}>
      {/* Esferas de luz que reaccionan al mouse */}
      <div className={styles.auraBlue}></div>
      <div className={styles.auraPurple}></div>
      <div className={styles.auraGreen}></div>
      
      {/* Textura sutil (Opcional para darle un toque más premium) */}
      <div className={styles.noiseOverlay}></div>
    </div>
  );
}
