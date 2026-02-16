import { getAllArtifacts, getArtifactsByType } from '@/lib/lore/resolvers';
import LoreArtifactsClient from '@/features/lore/components/LoreArtifactsClient';

export default function ArtifactsPage() {
  const artifacts = getAllArtifacts();
  const typeCounts = {
    all: artifacts.length,
    belief: getArtifactsByType('belief').length,
    system: getArtifactsByType('system').length,
    faction: getArtifactsByType('faction').length,
    location: getArtifactsByType('location').length,
    conflict: getArtifactsByType('conflict').length,
    thread: getArtifactsByType('thread').length,
    item: getArtifactsByType('item').length,
  };

  return <LoreArtifactsClient artifacts={artifacts} typeCounts={typeCounts} />;
}
