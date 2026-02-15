import { getAllStories, getEpisodicStories } from '@/lib/lore/resolvers';
import LoreStoriesClient from '@/components/lore/LoreStoriesClient';

export default function StoriesPage() {
  const allStories = getAllStories();
  const episodicStories = getEpisodicStories();

  const seriesMap = new Map<string, typeof episodicStories>();
  for (const story of episodicStories) {
    const seriesSlug = story.frontmatter.seriesSlug;
    if (seriesSlug) {
      if (!seriesMap.has(seriesSlug)) {
        seriesMap.set(seriesSlug, []);
      }
      seriesMap.get(seriesSlug)!.push(story);
    }
  }
  for (const episodes of seriesMap.values()) {
    episodes.sort((a, b) => (a.frontmatter.episodeNumber ?? 0) - (b.frontmatter.episodeNumber ?? 0));
  }

  const seriesMapArray = Array.from(seriesMap.entries()).map(([seriesSlug, episodes]) => ({
    seriesSlug,
    episodes,
  }));

  return <LoreStoriesClient allStories={allStories} seriesMap={seriesMapArray} />;
}
