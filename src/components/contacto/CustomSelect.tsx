"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './CustomSelect.module.css';

interface Option {
  value: string;
  label: string;
  group?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

export default function CustomSelect({ options, value, onChange, placeholder = "Selecciona una opción...", error }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group options
  const groups = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, Option[]>);

  return (
    <div className={styles.container} ref={containerRef}>
      <div 
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${error ? styles.errorBorder : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? styles.selected : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={20} className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {Object.entries(groups).map(([group, opts]) => (
            <div key={group} className={styles.group}>
              {group !== 'default' && <div className={styles.groupLabel}>{group}</div>}
              {opts.map(option => (
                <div 
                  key={option.value}
                  className={`${styles.option} ${value === option.value ? styles.activeOption : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
