export interface LoreCharacter {
  id: string;
  slug: string;
  name: string;
  type: 'characters';
  summary: string;
  district?: string;
  relatedCollectibles: string[];
  relatedLore: string[];
  featured: boolean;
  image: string;
  timelineOrder: number;
}

export const loreCharacters: LoreCharacter[] = [
  {
    id: 'char-1',
    slug: 'maya-chen',
    name: 'Maya Chen',
    type: 'characters',
    summary: 'A brilliant hacker from the Neon District who seeks to uncover the truth behind the Fanhattan Network\'s corruption.',
    district: 'neon-district',
    relatedCollectibles: ['electric-pulse-bag', 'circuit-breaker-artifact'],
    relatedLore: ['neon-district', 'quantum-key'],
    featured: false,
    image: '/images/lore/maya-chen.jpg',
    timelineOrder: 100,
  },
  {
    id: 'char-2',
    slug: 'billy-chen',
    name: 'Billy Chen',
    type: 'characters',
    summary: 'The legendary street competitor whose unbreakable win streaks inspired a generation. His fiery spirit burns eternal in the hearts of champions.',
    district: 'neon-district',
    relatedCollectibles: ['heat-wave-bag', 'inferno-crown-skin', 'scorched-earth-artifact'],
    relatedLore: ['neon-district', 'the-first-tournament'],
    featured: true,
    image: '/images/lore/billy-chen.jpg',
    timelineOrder: 150,
  },
  {
    id: 'char-3',
    slug: 'victor-reyes',
    name: 'Victor Reyes',
    type: 'characters',
    summary: 'A former corporate enforcer turned vigilante who now protects the citizens of the Shadow District.',
    district: 'shadow-district',
    relatedCollectibles: [],
    relatedLore: ['shadow-district', 'obsidian-blade'],
    featured: false,
    image: '/images/lore/victor-reyes.jpg',
    timelineOrder: 80,
  },
];
