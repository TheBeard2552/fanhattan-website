export interface LoreChapter {
  id: string;
  slug: string;
  name: string;
  type: 'chapters';
  summary: string;
  district?: string;
  relatedCollectibles: string[];
  relatedLore: string[];
  featured: boolean;
  image: string;
  timelineOrder: number;
}

export const loreChapters: LoreChapter[] = [
  {
    id: 'chap-1',
    slug: 'the-first-tournament',
    name: 'The First Tournament',
    type: 'chapters',
    summary: 'The legendary event that launched competitive play in Fanhattan. Billy Chen made history, and the city would never be the same.',
    district: 'neon-district',
    relatedCollectibles: ['heat-wave-bag', 'inferno-crown-skin', 'season-one-commemorative'],
    relatedLore: ['billy-chen', 'neon-district'],
    featured: false,
    image: '/images/lore/first-tournament.jpg',
    timelineOrder: 140,
  },
  {
    id: 'chap-2',
    slug: 'the-fall',
    name: 'The Fall',
    type: 'chapters',
    summary: 'Before Fanhattan rose, the old world collapsed. The Archive District preserves what little remains of that dark chapter.',
    district: 'archive-district',
    relatedCollectibles: [],
    relatedLore: ['archive-district', 'memory-core', 'obsidian-blade'],
    featured: false,
    image: '/images/lore/the-fall.jpg',
    timelineOrder: 10,
  },
];
