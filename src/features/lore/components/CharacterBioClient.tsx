'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CanonTierBadge } from './CanonTierBadge';
import { Markdown } from '@/shared/components/MarkdownRenderer';
import type { CharacterEntry, DistrictEntry, StoryEntry, BeliefEntry, FactionEntry } from '@/lib/lore/types';

interface CharacterBioClientProps {
  character: CharacterEntry;
  district: DistrictEntry | undefined;
  stories: StoryEntry[];
  beliefs: BeliefEntry[];
  factions: FactionEntry[];
}

export default function CharacterBioClient({
  character,
  district,
  stories,
  beliefs,
  factions,
}: CharacterBioClientProps) {
  const { frontmatter, content } = character;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [triedThumbnail, setTriedThumbnail] = useState(false);
  
  // Generate candidate URLs for portrait
  const primaryPortrait = `/images/characters/portraits/${frontmatter.slug}.webp`;
  const thumbnailFallback =
    frontmatter.thumbnail && !frontmatter.thumbnail.includes('placeholder.svg')
      ? frontmatter.thumbnail
      : undefined;
  
  // Generate initials for placeholder
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

  const showPlaceholder = !imageLoaded || !currentSrc;

  return (
    <div className="min-h-screen bg-background">
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-6">
        <Link 
          href="/lore/characters" 
          className="text-platform hover:text-platform/80 font-display uppercase tracking-wide text-sm inline-flex items-center gap-2 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Characters
        </Link>
      </div>

      {/* Hero Section - Portrait + Key Info */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[480px_1fr] gap-8 lg:gap-12">
          
          {/* Left: Portrait */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-black border-4 border-white/20 shadow-2xl">
                
                {/* Portrait Image */}
                <div className="absolute inset-0">
                  {currentSrc && (
                    <img
                      src={currentSrc}
                      alt={frontmatter.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      style={{ opacity: imageLoaded ? 1 : 0, zIndex: imageLoaded ? 1 : -1 }}
                    />
                  )}
                  
                  {showPlaceholder && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
                      <div className="absolute inset-4 border-2 border-platform/30 rounded-lg" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="relative">
                          <div className="px-8 py-6 border-2 border-platform/50 bg-black/30 rounded-lg">
                            <span className="font-display text-7xl font-bold text-platform/70 tracking-widest">
                              {initials}
                            </span>
                          </div>
                          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-platform rounded-tl" />
                          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-platform rounded-tr" />
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-platform rounded-bl" />
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-platform rounded-br" />
                        </div>
                      </div>
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `repeating-linear-gradient(0deg, #00ffa3 0px, transparent 1px, transparent 15px)`,
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                </div>
                
                {/* Canon Tier Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <CanonTierBadge tier={frontmatter.canonTier} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Key Info */}
          <div className="flex flex-col">
            {/* Name & Role */}
            <div className="mb-8">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-4 text-white">
                {frontmatter.name}
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">
                {frontmatter.role}
              </p>
              {district && (
                <Link
                  href={`/district/${district.frontmatter.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-platform/10 border border-platform/30 rounded-lg hover:bg-platform/20 hover:border-platform/50 transition-all group"
                >
                  <span className="text-sm font-display uppercase tracking-wider text-platform">
                    {district.frontmatter.name}
                  </span>
                  <span className="text-platform group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              )}
            </div>

            {/* At a Glance Cards */}
            <div className="space-y-6 mb-8">
              {/* Reputation Card */}
              <div className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="font-display text-sm uppercase tracking-wider text-blue-400 mb-2">
                  Reputation
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed pr-16">
                  {frontmatter.reputation}
                </p>
              </div>

              {/* Private Truth Card */}
              <div className="group relative p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-display text-sm uppercase tracking-wider text-purple-400 mb-2">
                  Private Truth
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed pr-16">
                  {frontmatter.privateTruth}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="max-w-4xl">
          {content && (
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-platform prose-a:no-underline hover:prose-a:underline">
              <Markdown content={content} />
            </div>
          )}
        </div>
      </section>

      {/* Relationships Section */}
      {(beliefs.length > 0 || factions.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="font-display text-3xl uppercase tracking-tight mb-8 text-white">
            Connections
          </h2>
          
          <div className="space-y-12">
            {/* Beliefs */}
            {beliefs.length > 0 && (
              <div>
                <h3 className="font-display text-xl uppercase tracking-wider text-gray-400 mb-4">
                  Beliefs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {beliefs.map(belief => (
                    <Link
                      key={belief.frontmatter.slug}
                      href={`/belief/${belief.frontmatter.slug}`}
                      className="group p-5 bg-card border border-gray-700 rounded-lg hover:border-purple-500/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-display text-base uppercase text-white group-hover:text-purple-400 transition-colors">
                          {belief.frontmatter.name}
                        </h4>
                        <CanonTierBadge tier={belief.frontmatter.canonTier} />
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {belief.frontmatter.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Factions */}
            {factions.length > 0 && (
              <div>
                <h3 className="font-display text-xl uppercase tracking-wider text-gray-400 mb-4">
                  Factions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {factions.map(faction => (
                    <Link
                      key={faction.frontmatter.slug}
                      href={`/faction/${faction.frontmatter.slug}`}
                      className="group p-5 bg-card border border-gray-700 rounded-lg hover:border-indigo-500/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-display text-base uppercase text-white group-hover:text-indigo-400 transition-colors">
                          {faction.frontmatter.name}
                        </h4>
                        <CanonTierBadge tier={faction.frontmatter.canonTier} />
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {faction.frontmatter.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stories Section */}
      {stories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <h2 className="font-display text-3xl uppercase tracking-tight mb-8 text-white">
            Appears In
          </h2>
          <div className="space-y-4 max-w-4xl">
            {stories.map(story => (
              <Link
                key={story.frontmatter.slug}
                href={`/story/${story.frontmatter.slug}`}
                className="group block p-6 bg-card border border-gray-700 rounded-xl hover:border-platform/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-platform/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-display uppercase text-white group-hover:text-platform transition-colors">
                    {story.frontmatter.title}
                  </h3>
                  <CanonTierBadge tier={story.frontmatter.canonTier} />
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {story.frontmatter.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
