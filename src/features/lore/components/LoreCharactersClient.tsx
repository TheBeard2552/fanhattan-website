'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CanonLayout from '@/features/lore/components/CanonLayout';
import LoreSearchBar from '@/features/lore/components/LoreSearchBar';
import LoreFilterChips from '@/features/lore/components/LoreFilterChips';
import LoreSortMenu from '@/features/lore/components/LoreSortMenu';
import CharacterPortraitCard from '@/features/lore/components/CharacterPortraitCard';
import { CanonTierBadge } from '@/features/lore/components/CanonTierBadge';
import type { CharacterEntry, DistrictEntry } from '@/lib/lore/types';

const TIER_ORDER = ['tier-1', 'tier-2', 'tier-3'] as const;

interface LoreCharactersClientProps {
  characters: CharacterEntry[];
  districts: DistrictEntry[];
  districtNames: Record<string, string>;
}

export default function LoreCharactersClient({
  characters,
  districts,
  districtNames,
}: LoreCharactersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('tier');

  // District filter: sync with URL so it works with back/forward and shareable links
  const validDistrictSlugs = new Set(districts.map((d) => d.frontmatter.slug));
  const districtFromUrl = searchParams.get('district') ?? 'all';
  const districtFilter =
    districtFromUrl === 'all' || validDistrictSlugs.has(districtFromUrl)
      ? districtFromUrl
      : 'all';

  const handleDistrictFilterChange = (districtId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (districtId === 'all') {
      params.delete('district');
    } else {
      params.set('district', districtId);
    }
    const queryString = params.toString();
    const url = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    router.push(url);
  };

  const districtFilters = [
    { id: 'all', label: 'All Districts', count: characters.length },
    ...districts.map((d) => ({
      id: d.frontmatter.slug,
      label: d.frontmatter.name,
      count: characters.filter((c) => c.frontmatter.district === d.frontmatter.slug).length,
    })),
  ];

  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = characters.filter((character) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        character.frontmatter.name.toLowerCase().includes(query) ||
        character.frontmatter.role.toLowerCase().includes(query) ||
        character.frontmatter.reputation.toLowerCase().includes(query);
      const matchesDistrict =
        districtFilter === 'all' || character.frontmatter.district === districtFilter;
      return matchesSearch && matchesDistrict;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.frontmatter.name.localeCompare(b.frontmatter.name);
        case 'tier':
          return a.frontmatter.canonTier.localeCompare(b.frontmatter.canonTier);
        case 'district':
          return a.frontmatter.district.localeCompare(b.frontmatter.district);
        default:
          return 0;
      }
    });
    return filtered;
  }, [characters, searchQuery, districtFilter, sortBy]);

  const charactersByTier = useMemo(() => {
    const grouped: Record<string, CharacterEntry[]> = {};
    for (const tier of TIER_ORDER) {
      grouped[tier] = [];
    }
    grouped['other'] = [];
    for (const character of filteredAndSortedCharacters) {
      const tier = character.frontmatter.canonTier;
      const key = TIER_ORDER.includes(tier as (typeof TIER_ORDER)[number]) ? tier : 'other';
      grouped[key].push(character);
    }
    return grouped;
  }, [filteredAndSortedCharacters]);

  const sortOptions = [
    { id: 'tier', label: 'Canon Tier' },
    { id: 'name', label: 'A–Z' },
    { id: 'district', label: 'District' },
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
              Characters
            </h1>
            <p className="text-xl text-gray-400 mb-8">Those who shape the city.</p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <LoreSearchBar placeholder="Search characters..." onSearch={setSearchQuery} />
              </div>
              <div className="w-full md:w-64">
                <LoreSortMenu options={sortOptions} activeSort={sortBy} onSortChange={setSortBy} />
              </div>
            </div>
            <LoreFilterChips
              filters={districtFilters}
              activeFilter={districtFilter}
              onFilterChange={handleDistrictFilterChange}
              className="mb-8"
            />
          </div>
          {filteredAndSortedCharacters.length > 0 ? (
            <div className="space-y-12">
              {[...TIER_ORDER, 'other'].map((tier) => {
                const tierCharacters = charactersByTier[tier] ?? [];
                if (tierCharacters.length === 0) return null;
                return (
                  <section key={tier}>
                    <div className="flex items-center gap-3 mb-6">
                      {tier !== 'other' ? (
                        <CanonTierBadge tier={tier as (typeof TIER_ORDER)[number]} />
                      ) : (
                        <span className="font-display text-sm uppercase tracking-wider text-gray-400">
                          Other
                        </span>
                      )}
                      <span className="text-gray-400 text-sm">
                        {tierCharacters.length} character{tierCharacters.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {tierCharacters.map((character) => (
                        <CharacterPortraitCard
                          key={character.frontmatter.slug}
                          character={character}
                          districtName={districtNames[character.frontmatter.district]}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No characters found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
