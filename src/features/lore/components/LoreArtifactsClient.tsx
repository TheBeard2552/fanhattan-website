'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CanonLayout from '@/features/lore/components/CanonLayout';
import LoreSearchBar from '@/features/lore/components/LoreSearchBar';
import LoreSortMenu from '@/features/lore/components/LoreSortMenu';
import ArtifactCard from '@/features/lore/components/ArtifactCard';
import type { ArtifactEntry } from '@/lib/lore/types';

interface LoreArtifactsClientProps {
  artifacts: ArtifactEntry[];
}

/** Artifacts = unique items only. Rare, myth-level objects. */
export default function LoreArtifactsClient({ artifacts }: LoreArtifactsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSorted = useMemo(() => {
    let filtered = artifacts;
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
        default:
          return 0;
      }
    });
  }, [artifacts, searchQuery, sortBy]);

  const sortOptions = [
    { id: 'name', label: 'A–Z' },
    { id: 'tier', label: 'Canon Tier' },
  ];

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
              Rare objects that anchor the myth. Each one matters.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <LoreSearchBar placeholder="Search artifacts..." value={searchQuery} onSearch={setSearchQuery} />
              </div>
              <div className="w-full md:w-64">
                <LoreSortMenu options={sortOptions} activeSort={sortBy} onSortChange={setSortBy} />
              </div>
            </div>
          </div>

          {filteredAndSorted.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAndSorted.map((artifact) => (
                <ArtifactCard key={artifact.frontmatter.slug} artifact={artifact} />
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
