'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CanonLayout from '@/components/CanonLayout';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import LoreSearchBar from '@/components/lore/LoreSearchBar';
import LoreFilterChips from '@/components/lore/LoreFilterChips';
import LoreSortMenu from '@/components/lore/LoreSortMenu';
import type { CharacterEntry, DistrictEntry } from '@/lib/lore/types';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

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

  const sortOptions = [
    { id: 'name', label: 'A–Z' },
    { id: 'tier', label: 'Canon Tier' },
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
              onFilterChange={setDistrictFilter}
              className="mb-8"
            />
          </div>
          {filteredAndSortedCharacters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCharacters.map((character) => (
                <Link
                  key={character.frontmatter.slug}
                  href={`/character/${character.frontmatter.slug}`}
                  className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-6 hover:border-platform/50 transition-all duration-300"
                >
                  <h2 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-3">
                    {character.frontmatter.name}
                  </h2>
                  {character.frontmatter.role && (
                    <div className="text-sm text-gray-400 mb-2">{character.frontmatter.role}</div>
                  )}
                  {districtNames[character.frontmatter.district] && (
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                      {districtNames[character.frontmatter.district]}
                    </div>
                  )}
                  <CanonTierBadge tier={character.frontmatter.canonTier} />
                </Link>
              ))}
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
