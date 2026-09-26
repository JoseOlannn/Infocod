"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WireframeGlobe — A rotating 3D wireframe sphere rendered inside
 * the hero circle.  Uses brand colours for the wireframe lines
 * and adds a secondary inner sphere for depth.
 *
 * Entirely self-contained: creates its own renderer, camera & scene,
 * and cleans everything up on unmount.
 */
export default function WireframeGlobe({ size = 360 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,          // transparent background
    });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    container.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 3.6;

    /* ── Brand colours ── */
    const BLUE   = new THREE.Color("#4F8EF7");
    const PURPLE = new THREE.Color("#6C2BFF");
    const GREEN  = new THREE.Color("#00C96B");

    /* ── Outer wireframe sphere ── */
    const outerGeo = new THREE.IcosahedronGeometry(1.15, 3);
    const outerMat = new THREE.MeshBasicMaterial({
      color: BLUE,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    /* ── Middle wireframe sphere (tighter grid) ── */
    const midGeo = new THREE.IcosahedronGeometry(0.92, 2);
    const midMat = new THREE.MeshBasicMaterial({
      color: PURPLE,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    scene.add(midMesh);

    /* ── Inner solid-ish core ── */
    const coreGeo = new THREE.IcosahedronGeometry(0.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: GREEN,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    /* ── Dot particles on the outer sphere (data nodes) ── */
    const dotCount   = 80;
    const dotGeo     = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 1.15;
      dotPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      dotPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));

    const dotMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    /* ── Latitude ring accents ── */
    const ringRadii = [0.55, 0.85, 1.05];
    const ringColors = [GREEN, BLUE, PURPLE];
    ringRadii.forEach((r, idx) => {
      const segments = 64;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          r * Math.cos(angle),
          0,
          r * Math.sin(angle),
        ));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Line(lineGeo, lineMat);
      ring.rotation.x = Math.PI * 0.15 * (idx - 1);
      ring.rotation.z = Math.PI * 0.1 * idx;
      scene.add(ring);
    });

    /* ── Animation loop ── */
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      const t = Date.now() * 0.001;

      // Slow orbit rotation
      outerMesh.rotation.y = t * 0.15;
      outerMesh.rotation.x = Math.sin(t * 0.08) * 0.15;

      midMesh.rotation.y = -t * 0.12;
      midMesh.rotation.x = Math.cos(t * 0.06) * 0.2;

      coreMesh.rotation.y = t * 0.3;
      coreMesh.rotation.z = t * 0.15;

      dots.rotation.y = t * 0.15;
      dots.rotation.x = Math.sin(t * 0.08) * 0.15;

      // Subtle colour shift on outer sphere
      const hue = (Math.sin(t * 0.2) + 1) * 0.5; // 0-1
      outerMat.color.lerpColors(BLUE, PURPLE, hue);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    />
  );
}
