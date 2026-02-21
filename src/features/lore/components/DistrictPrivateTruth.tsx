'use client';

import { useState } from 'react';

interface DistrictPrivateTruthProps {
  content: string;
  accentColor?: string;
}

export default function DistrictPrivateTruth({
  content,
  accentColor = '#1F6F78',
}: DistrictPrivateTruthProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      {/* Toggle trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-black/60 hover:bg-black/80 transition-colors group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {/* Redacted bar icon */}
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-red-500/60" />
            <div className="w-4 h-0.5 bg-red-500/40" />
            <div className="w-5 h-0.5 bg-red-500/60" />
          </div>
          <span className="font-display text-xs uppercase tracking-[0.2em] text-red-400/80 group-hover:text-red-400 transition-colors">
            Archive // Restricted
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-red-400/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible panel */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? '600px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div
          className="relative px-6 py-6 bg-black/80"
          style={{ borderLeft: `3px solid ${accentColor}30` }}
        >
          {/* Scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #ff0000 0px, transparent 1px, transparent 16px)`,
            }}
          />

          {/* Corner redaction marks */}
          <div className="absolute top-3 right-4 text-red-500/20 font-display text-xs uppercase tracking-widest select-none">
            CLASSIFIED
          </div>

          <p className="relative z-10 text-sm text-gray-300 leading-relaxed font-light">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
