import { Suspense } from 'react';
import { getAllCharacters, getAllDistricts } from '@/lib/lore/resolvers';
import LoreCharactersClient from '@/features/lore/components/LoreCharactersClient';

export default function CharactersPage() {
  const characters = getAllCharacters();
  const districts = getAllDistricts();
  const districtNames = Object.fromEntries(
    districts.map((d) => [d.frontmatter.slug, d.frontmatter.name])
  );

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0e0e0e]" />}>
      <LoreCharactersClient
        characters={characters}
        districts={districts}
        districtNames={districtNames}
      />
    </Suspense>
  );
}
