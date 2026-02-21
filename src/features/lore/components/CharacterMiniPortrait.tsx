'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CharacterMiniPortraitProps {
  slug: string;
  name: string;
  role?: string;
}

export default function CharacterMiniPortrait({ slug, name, role }: CharacterMiniPortraitProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const src = `/images/characters/portraits/${slug}.webp`;

  const initials = name
    .split(/\s+/)
    .map((w) => {
      const cleaned = w.replace(/^['"]|['"]$/g, '');
      const match = cleaned.match(/[A-Za-z]/);
      return match ? match[0].toUpperCase() : '';
    })
    .filter(Boolean)
    .join('')
    .slice(0, 2);

  return (
    <Link
      href={`/character/${slug}`}
      onClick={(e) => e.stopPropagation()}
      className="group flex items-center gap-3 py-1 rounded-lg transition-colors"
    >
      {/* Portrait thumbnail */}
      <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg border-2 border-white/15 group-hover:border-platform/60 transition-colors">
        {!failed && (
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
        {(!loaded || failed) && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <span className="font-display text-[10px] font-bold text-white/50">{initials}</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="font-display text-xs uppercase tracking-wide text-white group-hover:text-platform transition-colors line-clamp-1">
          {name}
        </p>
        {role && (
          <p className="text-[10px] text-gray-500 line-clamp-1">{role}</p>
        )}
      </div>
    </Link>
  );
}
