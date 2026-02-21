'use client';

import { useState, useEffect } from 'react';

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

// March 31, 2026 11:59 PM PT = April 1, 2026 06:59 UTC
const TARGET_DATE = new Date('2026-04-01T06:59:00Z');

// Placeholder used for SSR - ensures server and client render the same initial output
const PLACEHOLDER: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false,
};

function computeCountdown(): CountdownValues {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, expired: false };
}

export function useCountdown(): CountdownValues {
  // Use placeholder for SSR to avoid hydration mismatch (Date.now() differs server vs client)
  const [values, setValues] = useState<CountdownValues>(PLACEHOLDER);

  useEffect(() => {
    const next = computeCountdown();
    setValues(next);

    if (next.expired) return;

    const id = setInterval(() => {
      const next = computeCountdown();
      setValues(next);
      if (next.expired) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return values;
}
