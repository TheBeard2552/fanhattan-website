'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CanonTierBadge } from './CanonTierBadge';
import type { StoryEntry } from '@/lib/lore/types';

interface StoryCardProps {
  story: StoryEntry;
  accentColor?: string;
}

export default function StoryCard({ story, accentColor }: StoryCardProps) {
  const { frontmatter } = story;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const imageSrc = frontmatter.thumbnail || frontmatter.coverImage;
  const accent = accentColor || '#1F6F78';

  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
  }, [imageSrc]);

  const showPlaceholder = !imageSrc || imageFailed || !imageLoaded;

  const initials = frontmatter.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <Link
      href={`/story/${frontmatter.slug}`}
      className="group block transition-all duration-300 hover:-translate-y-1"
    >
      <div
        className="relative overflow-hidden rounded-xl border-2 border-white/10 bg-card transition-all duration-300 group-hover:border-white/30"
        style={{
          boxShadow: `0 0 0 rgba(0,0,0,0)`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 32px ${accent}40`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
        }}
      >
        {/* Thumbnail area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-800 to-black">
          {imageSrc && !imageFailed && (
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          )}

          {showPlaceholder && (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${accent}20 0%, #111 60%, ${accent}10 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="border-2 px-6 py-4 rounded-lg bg-black/30"
                  style={{ borderColor: `${accent}50` }}
                >
                  <span
                    className="font-display text-5xl font-bold tracking-widest"
                    style={{ color: `${accent}80` }}
                  >
                    {initials}
                  </span>
                </div>
              </div>
              {/* Scanline texture */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 1px, transparent 14px)`,
                }}
              />
            </div>
          )}

          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Episode badge */}
          {frontmatter.storyType === 'episodic' && frontmatter.episodeNumber != null && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded border font-display text-xs uppercase tracking-wider bg-black/60 backdrop-blur-sm"
                style={{ borderColor: `${accent}60`, color: accent }}
              >
                EP {frontmatter.episodeNumber}
              </span>
            </div>
          )}

          {/* Canon tier badge */}
          <div className="absolute top-3 right-3 z-10">
            <CanonTierBadge tier={frontmatter.canonTier} />
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-display text-base uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-1 line-clamp-1">
            {frontmatter.title}
          </h3>
          {frontmatter.summary && (
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
              {frontmatter.summary}
            </p>
          )}

          {/* Tag row */}
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.storyType && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 font-display uppercase tracking-wide">
                {frontmatter.storyType}
              </span>
            )}
            {frontmatter.characters.slice(0, 2).map((slug) => (
              <span
                key={slug}
                className="inline-flex items-center px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-500 truncate max-w-[120px]"
              >
                {slug.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
