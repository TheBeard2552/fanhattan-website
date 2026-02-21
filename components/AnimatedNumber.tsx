'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export default function AnimatedNumber({ value, className = '' }: AnimatedNumberProps) {
  const prevRef = useRef<number>(value);
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    if (value !== prevRef.current) {
      prevRef.current = value;
      setTicking(true);
      const id = setTimeout(() => setTicking(false), 300);
      return () => clearTimeout(id);
    }
  }, [value]);

  const display = String(value).padStart(2, '0');

  return (
    <span
      className={`inline-block tabular-nums transition-transform duration-300 ease-out ${
        ticking ? 'scale-105' : 'scale-100'
      } ${className}`}
    >
      {display}
    </span>
  );
}
