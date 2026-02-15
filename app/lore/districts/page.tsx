import { getAllDistricts, getCharactersByDistrict, getStoriesByDistrict } from '@/lib/lore/resolvers';
import LoreDistrictsClient from '@/components/lore/LoreDistrictsClient';

export default function DistrictsPage() {
  const districts = getAllDistricts();
  const districtStats: Record<string, { characters: number; stories: number }> = {};
  for (const d of districts) {
    districtStats[d.frontmatter.slug] = {
      characters: getCharactersByDistrict(d.frontmatter.slug).length,
      stories: getStoriesByDistrict(d.frontmatter.slug).length,
    };
  }

  return <LoreDistrictsClient districts={districts} districtStats={districtStats} />;
}
