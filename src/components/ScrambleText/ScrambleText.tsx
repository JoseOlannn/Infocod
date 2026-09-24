"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './ScrambleText.module.css';

interface ScrambleTextProps {
  phrases: string[];
  interval?: number; // Time between phrase changes
}

export default function ScrambleText({ phrases, interval = 4000 }: ScrambleTextProps) {
  const [text, setText] = useState(phrases[0]);
  const currentTextRef = useRef(phrases[0]);
  const phraseIndexRef = useRef(0);
  const frameRequest = useRef<number | null>(null);
  const frameCount = useRef(0);
  const queue = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0, n = queue.current.length; i < n; i++) {
        const { from, to, start, end } = queue.current[i];
        let { char } = queue.current[i];

        if (frameCount.current >= end) {
          complete++;
          output += to;
        } else if (frameCount.current >= start) {
          if (!char || Math.random() < 0.28) {
            const symbols = '!<>-_\\\\/[]{}—=+*^?#';
            char = symbols[Math.floor(Math.random() * symbols.length)];
            queue.current[i].char = char;
          }
          output += `<span class="${styles.dud}">${char}</span>`;
        } else {
          output += from;
        }
      }

      setText(output);
      currentTextRef.current = output.replace(/<[^>]*>?/gm, ''); // Fallback string

      if (complete === queue.current.length) {
        if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
      } else {
        frameRequest.current = requestAnimationFrame(update);
        frameCount.current++;
      }
    };

    const scrambleTo = (newText: string) => {
      const oldText = currentTextRef.current;
      const length = Math.max(oldText.length, newText.length);
      queue.current = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.current.push({ from, to, start, end });
      }

      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
      frameCount.current = 0;
      update();
    };

    const nextPhrase = () => {
      const nextIndex = (phraseIndexRef.current + 1) % phrases.length;
      phraseIndexRef.current = nextIndex;
      scrambleTo(phrases[nextIndex]);
      timeout = setTimeout(nextPhrase, interval);
    };

    timeout = setTimeout(nextPhrase, interval);

    return () => {
      clearTimeout(timeout);
      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    };
  }, [phrases, interval]);

  return (
    <div
      className={styles.scrambleText}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
