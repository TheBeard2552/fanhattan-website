'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CanonTierBadge } from './CanonTierBadge';
import type { CharacterEntry } from '@/lib/lore/types';

interface CharacterPortraitCardProps {
  character: CharacterEntry;
  districtName?: string;
}

export default function CharacterPortraitCard({
  character,
  districtName,
}: CharacterPortraitCardProps) {
  const { frontmatter } = character;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [triedThumbnail, setTriedThumbnail] = useState(false);
  
  // Generate candidate URLs
  const primaryPortrait = `/images/characters/portraits/${frontmatter.slug}.webp`;
  // Skip generic placeholder.svg - we want our NFT-style placeholder for consistency
  const thumbnailFallback =
    frontmatter.thumbnail && !frontmatter.thumbnail.includes('placeholder.svg')
      ? frontmatter.thumbnail
      : undefined;
  
  // Generate initials for placeholder (first letter of each word, skip punctuation-only words)
  const initials = frontmatter.name
    .split(/\s+/)
    .map((word) => {
      const cleaned = word.replace(/^['"]|['"]$/g, '');
      const match = cleaned.match(/[A-Za-z]/);
      return match ? match[0].toUpperCase() : '';
    })
    .filter(Boolean)
    .join('')
    .slice(0, 3);

  // Determine which src to try
  const imageSrc = !triedThumbnail ? primaryPortrait : (thumbnailFallback || '');
  
  // Reset and try loading when src changes
  useEffect(() => {
    if (!imageSrc) {
      setImageLoaded(false);
      setCurrentSrc(null);
      return;
    }
    setImageLoaded(false);
    setCurrentSrc(imageSrc);
  }, [imageSrc, triedThumbnail]);

  const handleImageError = () => {
    if (!triedThumbnail && thumbnailFallback) {
      setTriedThumbnail(true);
    } else {
      setCurrentSrc(null);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Show placeholder until we have a loaded image
  const showPlaceholder = !imageLoaded || !currentSrc;

  return (
    <Link
      href={`/character/${frontmatter.slug}`}
      className="group block relative transition-all duration-300 hover:-translate-y-2"
    >
      {/* Thick NFT card border frame */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-black border-4 border-white/20 hover:border-platform/60 transition-all duration-300 shadow-xl group-hover:shadow-[0_0_40px_rgba(0,255,163,0.4)]">
        
        {/* Portrait fills entire card */}
        <div className="absolute inset-0">
          {/* Hidden img to preload - only show image when it successfully loads */}
          {currentSrc && (
            <img
              src={currentSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ opacity: imageLoaded ? 1 : 0, zIndex: imageLoaded ? 1 : -1 }}
            />
          )}
          {showPlaceholder ? (
            // NFT-style placeholder card
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
              {/* Inner border accent */}
              <div className="absolute inset-4 border-2 border-platform/30 rounded-lg" />
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Initials in a framed box */}
                <div className="relative">
                  <div className="px-8 py-6 border-2 border-platform/50 bg-black/30 rounded-lg">
                    <span className="font-display text-7xl font-bold text-platform/70 tracking-widest">
                      {initials}
                    </span>
                  </div>
                  {/* Corner brackets */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-platform rounded-tl" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-platform rounded-tr" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-platform rounded-bl" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-platform rounded-br" />
                </div>
              </div>
              
              {/* Subtle texture */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, #00ffa3 0px, transparent 1px, transparent 15px)`,
                }}
              />
            </div>
          ) : null}
          
          {/* Dark gradient at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          {/* Hover sheen effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full transform" style={{ transitionProperty: 'transform, opacity' }} />
        </div>
        
        {/* Canon Tier Badge - top right corner */}
        <div className="absolute top-3 right-3 z-10">
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        
        {/* Info overlay at bottom (NFT style) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 backdrop-blur-sm bg-black/60">
          <h2 className="font-display text-lg uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-1 line-clamp-1">
            {frontmatter.name}
          </h2>
          <div className="flex items-center justify-between gap-2">
            {frontmatter.role && (
              <p className="text-xs text-gray-300 line-clamp-1 flex-1">
                {frontmatter.role}
              </p>
            )}
            {districtName && (
              <span className="text-xs text-platform/80 uppercase tracking-wide font-display whitespace-nowrap">
                {districtName}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
