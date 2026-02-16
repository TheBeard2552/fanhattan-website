import { notFound } from 'next/navigation';
import {
  getCharacterBySlug,
  getDistrictBySlug,
  getStoriesByCharacter,
  getBeliefsByCharacter,
  getFactionsByCharacter,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import CharacterBioClient from '@/features/lore/components/CharacterBioClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('characters');
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  
  if (!character) {
    notFound();
  }
  
  const district = getDistrictBySlug(character.frontmatter.district);
  const stories = getStoriesByCharacter(slug);
  const beliefs = getBeliefsByCharacter(slug);
  const factions = getFactionsByCharacter(slug);
  
  return (
    <CharacterBioClient
      character={character}
      district={district}
      stories={stories}
      beliefs={beliefs}
      factions={factions}
    />
  );
}
