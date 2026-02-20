'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface CharacterAudioPlayerProps {
  slug: string;
  characterName: string;
}

const STORAGE_KEY_PREFIX = 'character-audio-progress:';
const SKIP_SECONDS = 15;
const SPEEDS = [0.85, 1.0, 1.25, 1.5];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function CharacterAudioPlayer({ slug, characterName }: CharacterAudioPlayerProps) {
  const audioSrc = `/audio/characters/${slug}.wav`;

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);

  const [available, setAvailable] = useState<boolean | null>(null); // null = loading
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1); // default 1.0
  const [seeking, setSeeking] = useState(false);

  const storageKey = `${STORAGE_KEY_PREFIX}${slug}`;

  // Probe whether the audio file exists by pinging it with a HEAD request
  useEffect(() => {
    let cancelled = false;
    fetch(audioSrc, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setAvailable(r.ok); })
      .catch(() => { if (!cancelled) setAvailable(false); });
    return () => { cancelled = true; };
  }, [audioSrc]);

  // Restore saved progress once duration is known
  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    const saved = parseFloat(localStorage.getItem(storageKey) ?? '0');
    if (saved > 0 && saved < audio.duration - 2) {
      audio.currentTime = saved;
      setCurrentTime(saved);
    }
  }, [storageKey]);

  // Sync time display during playback
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || seeking) return;
    setCurrentTime(audio.currentTime);
    localStorage.setItem(storageKey, String(audio.currentTime));
  }, [seeking, storageKey]);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    // Clear saved progress so next visit starts from the beginning
    localStorage.removeItem(storageKey);
    const audio = audioRef.current;
    if (audio) audio.currentTime = 0;
    setCurrentTime(0);
  }, [storageKey]);

  // Apply playback rate when speedIdx changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEEDS[speedIdx];
    }
  }, [speedIdx]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Autoplay blocked or file missing — ignore
      }
    }
  };

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
    setCurrentTime(audio.currentTime);
  };

  const handleSeekStart = () => setSeeking(true);
  const handleSeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };
  const commitSeek = (value: string) => {
    setSeeking(false);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(value);
    localStorage.setItem(storageKey, value);
  };
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    commitSeek((e.target as HTMLInputElement).value);
  };
  const handleSeekTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
    commitSeek((e.target as HTMLInputElement).value);
  };

  const cycleSpeed = () => setSpeedIdx((i) => (i + 1) % SPEEDS.length);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Don't render anything while probing availability
  if (available === null) return null;
  // Don't render if no audio file was generated yet
  if (available === false) return null;

  return (
    <div className="my-6 rounded-xl bg-card border border-platform/20 px-5 py-4 shadow-lg shadow-black/30">
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Header row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-platform" aria-hidden>
          {/* Headphones icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </span>
        <span className="font-display text-xs uppercase tracking-wider text-platform">
          Listen — {characterName}
        </span>
        <span className="ml-auto text-xs text-gray-500 tabular-nums">
          {formatTime(currentTime)}
          {duration > 0 && <> / {formatTime(duration)}</>}
        </span>
      </div>

      {/* Seek bar */}
      <div className="relative h-2 mb-4 group">
        <div className="absolute inset-0 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-platform transition-none rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <input
          ref={seekRef}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onMouseDown={handleSeekStart}
          onTouchStart={handleSeekStart}
          onChange={handleSeekInput}
          onMouseUp={handleSeekMouseUp}
          onTouchEnd={handleSeekTouchEnd}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Seek"
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-2">
        {/* Skip back */}
        <button
          onClick={() => skip(-SKIP_SECONDS)}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs"
          aria-label={`Skip back ${SKIP_SECONDS} seconds`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
          </svg>
          <span className="hidden sm:inline">{SKIP_SECONDS}s</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-platform hover:bg-platform/80 active:scale-95 transition-all shadow-md shadow-platform/30"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white translate-x-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Skip forward */}
        <button
          onClick={() => skip(SKIP_SECONDS)}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs"
          aria-label={`Skip forward ${SKIP_SECONDS} seconds`}
        >
          <span className="hidden sm:inline">{SKIP_SECONDS}s</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-.49-3.5" />
          </svg>
        </button>

        {/* Speed toggle */}
        <button
          onClick={cycleSpeed}
          className="ml-auto text-xs font-display tracking-wide text-gray-400 hover:text-platform transition-colors border border-gray-700 hover:border-platform/50 rounded px-2 py-1 min-w-[3.5rem] text-center"
          aria-label="Change playback speed"
        >
          {SPEEDS[speedIdx]}×
        </button>
      </div>
    </div>
  );
}
