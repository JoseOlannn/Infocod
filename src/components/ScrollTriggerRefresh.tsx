"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Recalcula posiciones de todos los ScrollTriggers una vez que las secciones
 * con pin (hero, productos) y los componentes dinámicos ya montaron.
 */
export default function ScrollTriggerRefresh({ delay = 600 }: { delay?: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return null;
}
