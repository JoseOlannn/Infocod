"use client";

import { useEffect } from "react";

export default function SecurityRules() {
  useEffect(() => {
    // 1. Bloquear clic derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Bloquear atajos de teclado (F12, Ctrl+Shift+I, Ctrl+U, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" || // F12 (DevTools)
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) || // Ctrl+Shift+J
        (e.ctrlKey && (e.key === "U" || e.key === "u")) || // Ctrl+U (View Source)
        (e.ctrlKey && (e.key === "S" || e.key === "s")) || // Ctrl+S (Save As)
        (e.ctrlKey && (e.key === "P" || e.key === "p"))    // Ctrl+P (Print)
      ) {
        e.preventDefault();
      }
    };

    // 3. Bloquear arrastrar imágenes (para que no se las roben arrastrando al escritorio)
    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
