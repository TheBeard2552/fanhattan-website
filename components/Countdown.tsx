'use client';

import { useCountdown } from '../hooks/useCountdown';
import AnimatedNumber from './AnimatedNumber';

interface CountdownProps {
  className?: string;
}

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

export default function Countdown({ className = '' }: CountdownProps) {
  const { days, hours, minutes, seconds, expired } = useCountdown();

  if (expired) {
    return (
      <p className={`text-sm tracking-[0.2em] uppercase text-white/50 ${className}`}>
        Drop is live.
      </p>
    );
  }

  const values = [days, hours, minutes, seconds];

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 ${className}`}
    >
      {UNITS.map((unit, i) => (
        <div key={unit} className="flex flex-col items-center gap-1">
          <AnimatedNumber
            value={values[i]}
            className="text-5xl md:text-7xl font-display tracking-tight text-white"
          />
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-sans">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
