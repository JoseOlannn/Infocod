/**
 * Helpers para que las animaciones continuas solo consuman recursos
 * cuando realmente se están viendo.
 */

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** true en dispositivos táctiles (sin hover / puntero fino). */
export const isCoarsePointer = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

/**
 * Observa si `el` está en pantalla Y la pestaña está visible.
 * Llama a `onChange(true|false)` solo cuando el estado cambia.
 * Devuelve una función de limpieza.
 */
export function observeActive(
  el: Element,
  onChange: (active: boolean) => void,
  rootMargin = "100px"
): () => void {
  let inView = false;
  let active = false;

  const update = () => {
    const next = inView && document.visibilityState === "visible";
    if (next !== active) {
      active = next;
      onChange(active);
    }
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      update();
    },
    { rootMargin }
  );
  io.observe(el);
  document.addEventListener("visibilitychange", update);

  return () => {
    io.disconnect();
    document.removeEventListener("visibilitychange", update);
  };
}
