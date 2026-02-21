'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CanonTierBadge } from './CanonTierBadge';
import type { ArtifactEntry } from '@/lib/lore/types';

interface ArtifactCardProps {
  artifact: ArtifactEntry;
  accentColor?: string;
}

/** Rare, myth-level item. Artifacts are unique objects that anchor the world. */
export default function ArtifactCard({ artifact, accentColor }: ArtifactCardProps) {
  const { frontmatter } = artifact;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const imageSrc = frontmatter.thumbnail || frontmatter.coverImage;
  // Warm gold/amber accent for rare items — feels collectible and important
  const accent = accentColor || '#E5D3B3';

  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
  }, [imageSrc]);

  const showPlaceholder = !imageSrc || imageFailed || !imageLoaded;

  // Generate a short symbol from name
  const symbol = frontmatter.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <Link
      href={`/artifact/${frontmatter.slug}`}
      className="group block transition-all duration-300 hover:-translate-y-1"
    >
      <div
        className="relative overflow-hidden rounded-xl border-2 border-white/15 bg-card transition-all duration-300 group-hover:border-amber-500/40"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${accent}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
        }}
      >
        {/* Illustration area */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {imageSrc && !imageFailed && (
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          )}

          {showPlaceholder && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                background: `radial-gradient(circle at center, ${accent}12 0%, transparent 70%), linear-gradient(180deg, #111 0%, #0a0a0a 100%)`,
              }}
            >
              {/* Corner brackets — collectible card framing */}
              <div className="absolute inset-6">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded-tl" style={{ borderColor: `${accent}50` }} />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 rounded-tr" style={{ borderColor: `${accent}50` }} />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 rounded-bl" style={{ borderColor: `${accent}50` }} />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 rounded-br" style={{ borderColor: `${accent}50` }} />
              </div>

              {/* Center symbol */}
              <div
                className="border-2 px-6 py-5 rounded-lg bg-black/40"
                style={{ borderColor: `${accent}50` }}
              >
                <span
                  className="font-display text-4xl font-bold tracking-widest"
                  style={{ color: `${accent}90` }}
                >
                  {symbol}
                </span>
              </div>

              {/* Scanline texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 1px, transparent 14px)`,
                }}
              />
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* RELIC badge — top left, emphasizes rarity */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full border font-display text-xs uppercase tracking-wider bg-black/60 backdrop-blur-sm"
              style={{ borderColor: `${accent}50`, color: accent }}
            >
              Relic
            </span>
          </div>

          {/* Canon tier badge — top right */}
          <div className="absolute top-3 right-3 z-10">
            <CanonTierBadge tier={frontmatter.canonTier} />
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-display text-sm uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-1 line-clamp-1">
            {frontmatter.name}
          </h3>
          {frontmatter.description && (
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {frontmatter.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
