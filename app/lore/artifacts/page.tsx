import { getArtifactsByType } from '@/lib/lore/resolvers';
import LoreArtifactsClient from '@/features/lore/components/LoreArtifactsClient';

/** Artifacts = unique items only. Rare, myth-level objects that anchor the world. */
export default function ArtifactsPage() {
  const items = getArtifactsByType('item');

  return <LoreArtifactsClient artifacts={items} />;
}
