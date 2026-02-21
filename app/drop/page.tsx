'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import Countdown from '../../components/Countdown';
import { supabase } from '../../lib/supabaseClient';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

export default function DropPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [easterEgg, setEasterEgg] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState('');

  // Keyboard easter egg: typing "17" flashes "Still Perfect."
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const next = (keyBuffer + e.key).slice(-2);
      setKeyBuffer(next);
      if (next === '17') {
        setEasterEgg(true);
        setKeyBuffer('');
        const id = setTimeout(() => setEasterEgg(false), 2200);
        return () => clearTimeout(id);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [keyBuffer]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || status === 'loading') return;

      setStatus('loading');

      const { error } = await supabase
        .from('drop_waitlist')
        .insert({ email: email.trim().toLowerCase() });

      if (!error) {
        setStatus('success');
        setEmail('');
        return;
      }

      // Supabase unique constraint violation = code 23505
      if (error.code === '23505') {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    },
    [email, status]
  );

  const statusMessage: Record<Exclude<SubmitStatus, 'idle' | 'loading'>, string> = {
    success: "You're in.",
    duplicate: 'Already registered.',
    error: 'Something went wrong.',
  };

  return (
    <>
      {/* ─── CSS keyframes ─────────────────────────────────────────── */}
      <style>{`
        @keyframes noise-flicker {
          0%, 100% { opacity: 0.035; }
          50%       { opacity: 0.055; }
        }
        @keyframes spotlight-pulse {
          0%, 100% { filter: brightness(1);    }
          50%       { filter: brightness(1.03); }
        }
        @keyframes hero-fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pressure-pulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1;    }
        }
        @keyframes shimmer-move {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes easter-fade {
          0%   { opacity: 0; transform: translateY(-6px) scale(1.04); }
          15%  { opacity: 1; transform: translateY(0)    scale(1);    }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .noise-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          animation: noise-flicker 4s ease-in-out infinite;
          mix-blend-mode: overlay;
          opacity: 0.045;
          z-index: 1;
        }
        .spotlight {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 42%, rgba(255,255,255,0.04) 0%, transparent 70%);
          animation: spotlight-pulse 6s ease-in-out infinite;
          z-index: 2;
        }
        .hero-content {
          animation: hero-fadein 0.8s ease-out both;
        }
        .pressure-text {
          animation: pressure-pulse 4s ease-in-out infinite;
        }
        .shimmer-block {
          background: linear-gradient(
            90deg,
            #111111 0%,
            #1a1a1a 45%,
            #222222 50%,
            #1a1a1a 55%,
            #111111 100%
          );
          background-size: 800px 100%;
          animation: shimmer-move 7s ease-in-out infinite;
        }
        .easter-egg-flash {
          animation: easter-fade 2.2s ease-out forwards;
        }
      `}</style>

      {/* ─── Wrapper ────────────────────────────────────────────────── */}
      <div
        className="relative min-h-screen font-sans"
        style={{ backgroundColor: '#0A0A0A', color: '#F4F4F4' }}
      >

        {/* ─── 1. HERO ──────────────────────────────────────────────── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="noise-overlay" aria-hidden="true" />
          <div className="spotlight" aria-hidden="true" />

          <div className="hero-content relative z-10 flex flex-col items-center gap-8 max-w-3xl w-full">
            {/* Arc label */}
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/30">
              Billy&apos;s Big Streak — Arc 01
            </p>

            {/* Main headline */}
            <h1
              className="font-display text-5xl md:text-8xl uppercase tracking-widest text-white leading-none"
              style={{ letterSpacing: '0.12em' }}
            >
              He Hasn&apos;t Missed.
            </h1>

            {/* Subheadline */}
            <div className="space-y-2">
              <p className="text-base md:text-lg text-white/50 tracking-wide">
                The streak is building.
              </p>
              <p className="text-sm md:text-base text-white/35 tracking-wide">
                A limited hand-painted relic arrives March 31st, 2026.
              </p>
            </div>

            {/* Drop label */}
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mt-2">
              Drop 01 goes live in:
            </p>

            {/* Countdown */}
            <Countdown />
          </div>

          {/* Easter egg */}
          {easterEgg && (
            <div
              className="easter-egg-flash absolute bottom-16 left-1/2 -translate-x-1/2 z-20
                         text-xs tracking-[0.4em] uppercase text-white/70"
              aria-live="polite"
            >
              Still Perfect.
            </div>
          )}
        </section>

        {/* ─── 2. LIVE STATS STRIP ──────────────────────────────────── */}
        <div
          className="relative z-10 w-full border-y px-6 py-5"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-12">
            <Stat label="Current Streak" value="17" />
            <Stat label="Misses" value="0" />
            <span
              className="pressure-text text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Pressure: Rising
            </span>
          </div>
        </div>

        {/* ─── 3. SILHOUETTE SECTION ────────────────────────────────── */}
        <section className="relative z-10 flex flex-col items-center gap-10 px-6 py-24">
          {/* Silhouette placeholder */}
          <div
            className="shimmer-block rounded-lg"
            style={{
              width: 220,
              height: 320,
              boxShadow: 'inset 0 0 32px rgba(0,0,0,0.7)',
            }}
            aria-label="Silhouette placeholder"
          />

          {/* Artifact title */}
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40">
              Streaking Billy — Drop 01
            </p>

            {/* Lore paragraph */}
            <p
              className="max-w-[600px] text-sm md:text-base leading-relaxed text-white/30 tracking-wide"
              style={{ fontStyle: 'italic' }}
            >
              &ldquo;The city leans forward when a streak gets dangerous.
              Pressure rises. Heat builds.
              Some break.
              One didn&apos;t.&rdquo;
            </p>
          </div>
        </section>

        {/* ─── 4. EMAIL CAPTURE ─────────────────────────────────────── */}
        <section
          className="relative z-10 flex flex-col items-center gap-8 border-t px-6 py-24"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <h2
              className="font-display text-2xl md:text-3xl uppercase tracking-widest text-white"
              style={{ letterSpacing: '0.15em' }}
            >
              Be There When It Breaks.
            </h2>
            <p className="text-xs tracking-[0.25em] uppercase text-white/30">
              Early access will be granted to the faithful.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
              className="flex-1 border px-4 py-3 text-sm tracking-wide text-white/80
                         bg-transparent outline-none focus:border-white/25
                         disabled:opacity-40 transition-colors duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.12)', borderRadius: 0 }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-3 text-[10px] tracking-[0.3em] uppercase text-black
                         bg-white/90 hover:bg-white transition-colors duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderRadius: 0 }}
            >
              {status === 'loading' ? '...' : 'Notify Me'}
            </button>
          </form>

          {/* Status message */}
          {status !== 'idle' && status !== 'loading' && (
            <p
              className="text-xs tracking-[0.2em] uppercase"
              style={{
                color:
                  status === 'success'
                    ? 'rgba(255,255,255,0.55)'
                    : 'rgba(255,255,255,0.3)',
              }}
            >
              {statusMessage[status]}
            </p>
          )}
        </section>

        {/* ─── FOOTER ───────────────────────────────────────────────── */}
        <footer className="relative z-10 flex justify-center px-6 py-10">
          <p
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            Drop 01 — Founding Relic
          </p>
        </footer>
      </div>
    </>
  );
}

// Small stat unit for the stats strip
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span
      className="flex gap-2 text-[10px] tracking-[0.3em] uppercase"
      style={{ color: 'rgba(255,255,255,0.35)' }}
    >
      <span>{label}:</span>
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{value}</span>
    </span>
  );
}
