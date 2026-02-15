'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CanonLayout from '@/components/CanonLayout';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import LoreSearchBar from '@/components/lore/LoreSearchBar';
import LoreFilterChips from '@/components/lore/LoreFilterChips';
import type { StoryEntry } from '@/lib/lore/types';

interface LoreStoriesClientProps {
  allStories: StoryEntry[];
  seriesMap: Array<{ seriesSlug: string; episodes: StoryEntry[] }>;
}

export default function LoreStoriesClient({ allStories, seriesMap }: LoreStoriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [storyTypeFilter, setStoryTypeFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Stories', count: allStories.length },
    { id: 'standalone', label: 'Standalone', count: allStories.filter((s) => s.frontmatter.storyType === 'standalone').length },
    { id: 'series', label: 'Series', count: seriesMap.length },
  ];

  const filteredContent = useMemo(() => {
    if (storyTypeFilter === 'standalone') {
      let stories = allStories.filter((s) => s.frontmatter.storyType === 'standalone');
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        stories = stories.filter(
          (s) =>
            s.frontmatter.title.toLowerCase().includes(query) ||
            s.frontmatter.summary.toLowerCase().includes(query)
        );
      }
      return stories.sort((a, b) => {
        const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
        const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
        return dateB - dateA;
      });
    }
    if (storyTypeFilter === 'series') {
      return seriesMap.filter(({ seriesSlug, episodes }) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          seriesSlug.toLowerCase().includes(query) ||
          episodes.some((ep) => ep.frontmatter.title.toLowerCase().includes(query))
        );
      });
    }
    let stories = allStories;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      stories = stories.filter(
        (s) =>
          s.frontmatter.title.toLowerCase().includes(query) ||
          s.frontmatter.summary.toLowerCase().includes(query)
      );
    }
    return stories.sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [allStories, seriesMap, storyTypeFilter, searchQuery]);

  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Stories
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Standalone tales and episodic sagas that shape Fanhattan.
            </p>
            <div className="mb-6">
              <LoreSearchBar placeholder="Search stories..." onSearch={setSearchQuery} />
            </div>
            <LoreFilterChips
              filters={filterOptions}
              activeFilter={storyTypeFilter}
              onFilterChange={setStoryTypeFilter}
              className="mb-8"
            />
          </div>
          {storyTypeFilter === 'series' ? (
            <div className="space-y-6">
              {(filteredContent as Array<{ seriesSlug: string; episodes: StoryEntry[] }>).map(
                ({ seriesSlug, episodes }) => {
                  const firstEpisode = episodes[0];
                  const lastEpisode = episodes[episodes.length - 1];
                  return (
                    <div
                      key={seriesSlug}
                      className="bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="font-display text-3xl uppercase tracking-wide text-white mb-2">
                            {seriesSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </h2>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">{episodes.length} episodes</span>
                            {lastEpisode.frontmatter.date && (
                              <span className="text-sm text-gray-500">
                                Last:{' '}
                                {new Date(lastEpisode.frontmatter.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                        <CanonTierBadge tier={firstEpisode.frontmatter.canonTier} />
                      </div>
                      <p className="text-gray-400 mb-6">{firstEpisode.frontmatter.summary}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {episodes.map((episode) => (
                          <Link
                            key={episode.frontmatter.slug}
                            href={`/story/${episode.frontmatter.slug}`}
                            className="group px-4 py-3 bg-white/5 border border-white/10 rounded hover:border-platform/50 transition-colors"
                          >
                            <div className="text-xs text-platform mb-1">
                              Episode {episode.frontmatter.episodeNumber}
                            </div>
                            <div className="text-sm text-white group-hover:text-platform transition-colors font-display uppercase tracking-wide">
                              {episode.frontmatter.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {(filteredContent as StoryEntry[]).map((story) => (
                <Link
                  key={story.frontmatter.slug}
                  href={`/story/${story.frontmatter.slug}`}
                  className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                          {story.frontmatter.title}
                        </h2>
                        {story.frontmatter.storyType === 'episodic' && (
                          <span className="px-2 py-1 text-xs bg-platform/20 text-platform rounded uppercase tracking-wide">
                            Episode {story.frontmatter.episodeNumber}
                          </span>
                        )}
                      </div>
                      <CanonTierBadge tier={story.frontmatter.canonTier} />
                    </div>
                    {story.frontmatter.date && (
                      <span className="text-sm text-gray-500">
                        {new Date(story.frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{story.frontmatter.summary}</p>
                </Link>
              ))}
            </div>
          )}
          {Array.isArray(filteredContent) && filteredContent.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No stories found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
