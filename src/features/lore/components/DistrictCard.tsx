'use client';

import { useState, useRef } from 'react';
import { CanonTierBadge } from './CanonTierBadge';
import type { DistrictViewModel } from './DistrictsLandingClient';

const LANDSCAPE_PLACEHOLDER = '/images/placeholders/landscape.svg';

/**
 * Deterministic tilt in degrees derived from the district slug.
 * Maps slug char-code sum → –2.5°..+2.5°, stable across renders.
 */
function slugTilt(slug: string): number {
  const sum = [...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  // sum % 11 → 0..10; minus 5 → –5..+5; ×0.5 → –2.5..+2.5
  return ((sum % 11) - 5) * 0.5;
}

interface DistrictCardProps {
  district: DistrictViewModel;
  isSelected: boolean;
  onClick: () => void;
  onHover?: () => void;
}

export default function DistrictCard({
  district,
  isSelected,
  onClick,
  onHover,
}: DistrictCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const accent = district.accentColor;
  const tilt = slugTilt(district.slug);

  const imageSrc =
    !district.illustrationSrc || imageFailed
      ? LANDSCAPE_PLACEHOLDER
      : district.illustrationSrc;

  const baseTransform = `rotate(${tilt}deg)`;
  const activeTransform = 'rotate(0deg) translateY(-6px)';

  function handlePointerEnter() {
    onHover?.();
    if (buttonRef.current) {
      buttonRef.current.style.transform = activeTransform;
    }
  }

  function handlePointerLeave() {
    if (buttonRef.current) {
      buttonRef.current.style.transform = baseTransform;
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
      aria-pressed={isSelected}
      aria-label={`Preview ${district.name}`}
      className="group relative block w-full text-left focus:outline-none"
      style={{
        transform: baseTransform,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        // Reserve visual space so rotated corners don't clip siblings
        margin: '0 auto',
      }}
    >
      {/* ── Polaroid paper ──────────────────────────────────────────────── */}
      <div
        className="relative bg-[#f7f3ed] rounded-sm"
        style={{
          padding: '10px 10px 52px',
          boxShadow: isSelected
            ? `0 0 0 3px ${accent}, 0 16px 48px rgba(0,0,0,0.55), 0 4px 8px rgba(0,0,0,0.3)`
            : '0 10px 32px rgba(0,0,0,0.45), 0 3px 6px rgba(0,0,0,0.25)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* ── Photo area ──────────────────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden bg-gray-800" style={{ aspectRatio: '4/3' }}>
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />

          {/* Subtle vignette so text badges stay legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* District badge — top left */}
          <div className="absolute top-2 left-2 z-10">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full border font-display text-[9px] uppercase tracking-wider bg-black/55 backdrop-blur-sm"
              style={{ borderColor: `${accent}90`, color: accent }}
            >
              District
            </span>
          </div>

          {/* Canon tier — top right */}
          <div className="absolute top-2 right-2 z-10">
            <CanonTierBadge tier={district.canonTier} />
          </div>
        </div>

        {/* ── Caption strip (the thick Polaroid bottom) ───────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 px-3 flex flex-col justify-center" style={{ height: '52px' }}>
          <h2
            className="font-display text-xs uppercase tracking-widest text-[#1a1612] leading-tight line-clamp-1"
          >
            {district.name}
          </h2>
          {district.tagline && (
            <p className="text-[9px] text-[#7a7060] line-clamp-1 mt-0.5 leading-snug">
              {district.tagline}
            </p>
          )}
        </div>

        {/* Accent colour wash on hover/selected (very subtle) */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)`,
            opacity: isSelected ? 1 : 0,
          }}
        />
      </div>
    </button>
  );
}
