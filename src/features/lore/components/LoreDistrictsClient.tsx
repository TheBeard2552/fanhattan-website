'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CanonLayout from '@/features/lore/components/CanonLayout';
import { CanonTierBadge } from '@/features/lore/components/CanonTierBadge';
import LoreSearchBar from '@/features/lore/components/LoreSearchBar';
import LoreSortMenu from '@/features/lore/components/LoreSortMenu';
import type { DistrictEntry } from '@/lib/lore/types';

interface LoreDistrictsClientProps {
  districts: DistrictEntry[];
  districtStats: Record<string, { characters: number; stories: number }>;
}

export default function LoreDistrictsClient({
  districts,
  districtStats,
}: LoreDistrictsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedDistricts = useMemo(() => {
    let filtered = districts.filter((district) => {
      const query = searchQuery.toLowerCase();
      return (
        district.frontmatter.name.toLowerCase().includes(query) ||
        district.frontmatter.coreBelief.toLowerCase().includes(query) ||
        district.frontmatter.description?.toLowerCase().includes(query)
      );
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.frontmatter.name.localeCompare(b.frontmatter.name);
        case 'tier':
          return a.frontmatter.canonTier.localeCompare(b.frontmatter.canonTier);
        case 'characters':
          return (districtStats[b.frontmatter.slug]?.characters ?? 0) - (districtStats[a.frontmatter.slug]?.characters ?? 0);
        case 'stories':
          return (districtStats[b.frontmatter.slug]?.stories ?? 0) - (districtStats[a.frontmatter.slug]?.stories ?? 0);
        default:
          return 0;
      }
    });
    return filtered;
  }, [districts, searchQuery, sortBy, districtStats]);

  const sortOptions = [
    { id: 'name', label: 'A–Z' },
    { id: 'tier', label: 'Canon Tier' },
    { id: 'characters', label: 'Most Characters' },
    { id: 'stories', label: 'Most Stories' },
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
              Districts
            </h1>
            <p className="text-xl text-gray-400 mb-8">The territories of power in Fanhattan.</p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <LoreSearchBar placeholder="Search districts..." value={searchQuery} onSearch={setSearchQuery} />
              </div>
              <div className="w-full md:w-64">
                <LoreSortMenu options={sortOptions} activeSort={sortBy} onSortChange={setSortBy} />
              </div>
            </div>
          </div>
          {filteredAndSortedDistricts.length > 0 ? (
            <div className="space-y-6">
              {filteredAndSortedDistricts.map((district) => {
                const stats = districtStats[district.frontmatter.slug] ?? { characters: 0, stories: 0 };
                return (
                  <Link
                    key={district.frontmatter.slug}
                    href={`/district/${district.frontmatter.slug}`}
                    className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-2">
                          {district.frontmatter.name}
                        </h2>
                        <CanonTierBadge tier={district.frontmatter.canonTier} />
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{stats.characters} characters</div>
                        <div>{stats.stories} stories</div>
                      </div>
                    </div>
                    {district.frontmatter.description && (
                      <p className="text-gray-400 mb-3">{district.frontmatter.description}</p>
                    )}
                    <p className="text-lg text-gray-300 italic">
                      &ldquo;{district.frontmatter.coreBelief}&rdquo;
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No districts found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
