import { getAllCharacters, getAllDistricts } from '@/lib/lore/resolvers';
import LoreCharactersClient from '@/features/lore/components/LoreCharactersClient';

export default function CharactersPage() {
  const characters = getAllCharacters();
  const districts = getAllDistricts();
  const districtNames = Object.fromEntries(
    districts.map((d) => [d.frontmatter.slug, d.frontmatter.name])
  );

  return (
    <LoreCharactersClient
      characters={characters}
      districts={districts}
      districtNames={districtNames}
    />
  );
}
