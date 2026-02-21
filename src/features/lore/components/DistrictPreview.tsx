'use client';

import Link from 'next/link';
import CharacterMiniPortrait from './CharacterMiniPortrait';
import type { DistrictViewModel } from './DistrictsLandingClient';

interface DistrictPreviewProps {
  district: DistrictViewModel;
  onClose: () => void;
}

export default function DistrictPreview({ district, onClose }: DistrictPreviewProps) {
  const accent = district.accentColor;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4 flex-shrink-0">
        <div className="min-w-0 mr-3">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full border-2 font-display text-[10px] uppercase tracking-wider mb-3"
            style={{ borderColor: `${accent}60`, color: accent }}
          >
            District
          </span>
          <h2
            className="font-display text-2xl md:text-3xl uppercase tracking-wide text-white leading-tight"
            style={{ textShadow: `0 0 40px ${accent}40` }}
          >
            {district.name}
          </h2>
          {district.tagline && (
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{district.tagline}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/25 transition-all"
          aria-label="Close preview"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Accent divider */}
      <div
        className="mx-6 mb-5 h-px flex-shrink-0"
        style={{ background: `linear-gradient(to right, ${accent}80, transparent)` }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-6 min-h-0">
        {/* Teaser */}
        {district.teaser && (
          <p className="text-sm text-gray-300 leading-relaxed">{district.teaser}</p>
        )}

        {/* People */}
        {district.peoplePreview.length > 0 && (
          <section>
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              People
            </p>
            <div className="space-y-0.5">
              {district.peoplePreview.map((p) => (
                <CharacterMiniPortrait
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  role={p.role}
                />
              ))}
            </div>
          </section>
        )}

        {/* Stories */}
        {district.storiesPreview.length > 0 && (
          <section>
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              Stories
            </p>
            <div className="space-y-2">
              {district.storiesPreview.map((s) => (
                <Link
                  key={s.slug}
                  href={`/story/${s.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
                >
                  <span className="font-display text-xs uppercase tracking-wide text-white group-hover:text-platform transition-colors line-clamp-1 flex-1">
                    {s.title}
                  </span>
                  <svg
                    className="w-3 h-3 text-gray-600 group-hover:text-platform flex-shrink-0 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Artifacts */}
        {district.artifactsPreview.length > 0 && (
          <section>
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              Artifacts
            </p>
            <div className="space-y-2">
              {district.artifactsPreview.map((a) => (
                <Link
                  key={a.slug}
                  href={`/artifact/${a.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
                >
                  <span className="font-display text-xs uppercase tracking-wide text-white group-hover:text-platform transition-colors line-clamp-1 flex-1">
                    {a.name}
                  </span>
                  <svg
                    className="w-3 h-3 text-gray-600 group-hover:text-platform flex-shrink-0 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 p-6 border-t border-white/5">
        <Link
          href={`/district/${district.slug}`}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-display text-sm uppercase tracking-wider border-2 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          style={{
            borderColor: accent,
            background: `${accent}18`,
            color: accent,
            boxShadow: `0 0 24px ${accent}20`,
          }}
        >
          Explore District
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
