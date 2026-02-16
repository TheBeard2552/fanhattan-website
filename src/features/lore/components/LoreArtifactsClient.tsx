'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CanonLayout from '@/features/lore/components/CanonLayout';
import { CanonTierBadge } from '@/features/lore/components/CanonTierBadge';
import LoreSearchBar from '@/features/lore/components/LoreSearchBar';
import LoreFilterChips from '@/features/lore/components/LoreFilterChips';
import LoreSortMenu from '@/features/lore/components/LoreSortMenu';
import type { ArtifactEntry, ArtifactType } from '@/lib/lore/types';

function getArtifactHref(slug: string, artifactType: ArtifactType): string {
  const routes: Partial<Record<ArtifactType, string>> = {
    belief: '/belief',
    conflict: '/conflict',
    faction: '/faction',
    system: '/system',
    thread: '/thread',
  };
  const base = routes[artifactType];
  return base ? `${base}/${slug}` : `/artifact/${slug}`;
}

interface LoreArtifactsClientProps {
  artifacts: ArtifactEntry[];
  typeCounts: Record<string, number>;
}

export default function LoreArtifactsClient({ artifacts, typeCounts }: LoreArtifactsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [artifactTypeFilter, setArtifactTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filterOptions = [
    { id: 'all', label: 'All Artifacts', count: typeCounts.all },
    { id: 'belief', label: 'Beliefs', count: typeCounts.belief },
    { id: 'faction', label: 'Factions', count: typeCounts.faction },
    { id: 'system', label: 'Systems', count: typeCounts.system },
    { id: 'location', label: 'Locations', count: typeCounts.location },
    { id: 'conflict', label: 'Conflicts', count: typeCounts.conflict },
    { id: 'thread', label: 'Threads', count: typeCounts.thread },
    { id: 'item', label: 'Items', count: typeCounts.item },
  ];

  const filteredAndSorted = useMemo(() => {
    let filtered =
      artifactTypeFilter === 'all'
        ? artifacts
        : artifacts.filter((a) => a.frontmatter.artifactType === artifactTypeFilter);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.frontmatter.name.toLowerCase().includes(query) ||
          a.frontmatter.description.toLowerCase().includes(query)
      );
    }
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.frontmatter.name.localeCompare(b.frontmatter.name);
        case 'tier':
          return a.frontmatter.canonTier.localeCompare(b.frontmatter.canonTier);
        case 'type':
          return a.frontmatter.artifactType.localeCompare(b.frontmatter.artifactType);
        default:
          return 0;
      }
    });
  }, [artifacts, artifactTypeFilter, searchQuery, sortBy]);

  const sortOptions = [
    { id: 'name', label: 'A–Z' },
    { id: 'tier', label: 'Canon Tier' },
    { id: 'type', label: 'Type' },
  ];

  const typeEmoji: Record<string, string> = {
    belief: '💭',
    system: '⚙️',
    faction: '⚔️',
    location: '📍',
    conflict: '⚡',
    thread: '🧵',
    item: '🏺',
  };

  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Artifacts
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              The beliefs, systems, factions, and relics that shape Fanhattan.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <LoreSearchBar placeholder="Search artifacts..." onSearch={setSearchQuery} />
              </div>
              <div className="w-full md:w-64">
                <LoreSortMenu options={sortOptions} activeSort={sortBy} onSortChange={setSortBy} />
              </div>
            </div>
            <LoreFilterChips
              filters={filterOptions}
              activeFilter={artifactTypeFilter}
              onFilterChange={setArtifactTypeFilter}
              className="mb-8"
            />
          </div>
          {filteredAndSorted.length > 0 ? (
            <div className="space-y-6">
              {filteredAndSorted.map((artifact) => (
                <Link
                  key={artifact.frontmatter.slug}
                  href={getArtifactHref(artifact.frontmatter.slug, artifact.frontmatter.artifactType)}
                  className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{typeEmoji[artifact.frontmatter.artifactType]}</div>
                      <div>
                        <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-2">
                          {artifact.frontmatter.name}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-platform uppercase tracking-wide">
                            {artifact.frontmatter.artifactType}
                          </span>
                          <CanonTierBadge tier={artifact.frontmatter.canonTier} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400">{artifact.frontmatter.description}</p>
                  {artifact.frontmatter.status && (
                    <div className="mt-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs rounded-full uppercase tracking-wide ${
                          artifact.frontmatter.status === 'active'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : artifact.frontmatter.status === 'dormant'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {artifact.frontmatter.status}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No artifacts found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
