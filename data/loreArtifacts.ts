export interface LoreArtifact {
  id: string;
  slug: string;
  name: string;
  type: 'artifacts';
  summary: string;
  district?: string;
  relatedCollectibles: string[];
  relatedLore: string[];
  featured: boolean;
  image: string;
  timelineOrder: number;
}

export const loreArtifacts: LoreArtifact[] = [
  {
    id: 'art-1',
    slug: 'quantum-key',
    name: 'The Quantum Key',
    type: 'artifacts',
    summary: 'A mysterious crystalline device rumored to grant access to Fanhattan\'s deepest systems and hidden truths.',
    district: 'neon-district',
    relatedCollectibles: ['circuit-breaker-artifact'],
    relatedLore: ['maya-chen', 'neon-district'],
    featured: false,
    image: '/images/lore/quantum-key.jpg',
    timelineOrder: 120,
  },
  {
    id: 'art-2',
    slug: 'obsidian-blade',
    name: 'The Obsidian Blade',
    type: 'artifacts',
    summary: 'An ancient weapon discovered in the ruins beneath Fanhattan. It cuts through both matter and energy, defying physical laws.',
    district: 'shadow-district',
    relatedCollectibles: [],
    relatedLore: ['victor-reyes', 'shadow-district', 'the-fall'],
    featured: false,
    image: '/images/lore/obsidian-blade.jpg',
    timelineOrder: 90,
  },
  {
    id: 'art-3',
    slug: 'memory-core',
    name: 'The Memory Core',
    type: 'artifacts',
    summary: 'A salvaged AI core from the old world, containing fragments of pre-collapse civilization. Its secrets remain locked.',
    district: 'archive-district',
    relatedCollectibles: ['archive-district-edition'],
    relatedLore: ['archive-district', 'the-fall'],
    featured: false,
    image: '/images/lore/memory-core.jpg',
    timelineOrder: 60,
  },
];
