export interface LoreDistrict {
  id: string;
  slug: string;
  name: string;
  type: 'districts';
  summary: string;
  district?: string;
  relatedCollectibles: string[];
  relatedLore: string[];
  featured: boolean;
  image: string;
  timelineOrder: number;
}

export const loreDistricts: LoreDistrict[] = [
  {
    id: 'dist-1',
    slug: 'neon-district',
    name: 'Neon District',
    type: 'districts',
    summary: 'The technological heart of Fanhattan, where towering data centers cast perpetual multicolored shadows across rain-slicked streets.',
    relatedCollectibles: ['heat-wave-bag', 'circuit-breaker-artifact'],
    relatedLore: ['maya-chen', 'billy-chen', 'quantum-key'],
    featured: false,
    image: '/images/lore/neon-district.jpg',
    timelineOrder: 50,
  },
  {
    id: 'dist-2',
    slug: 'shadow-district',
    name: 'Shadow District',
    type: 'districts',
    summary: 'The forgotten underbelly where the city\'s outcasts carve out their existence beneath crumbling infrastructure and fading neon signs.',
    relatedCollectibles: [],
    relatedLore: ['victor-reyes', 'obsidian-blade'],
    featured: false,
    image: '/images/lore/shadow-district.jpg',
    timelineOrder: 40,
  },
  {
    id: 'dist-3',
    slug: 'archive-district',
    name: 'Archive District',
    type: 'districts',
    summary: 'Where knowledge is preserved and history is written. The keepers of this district safeguard the truth of Fanhattan\'s past.',
    relatedCollectibles: ['archive-district-edition'],
    relatedLore: ['the-fall'],
    featured: false,
    image: '/images/lore/archive-district.jpg',
    timelineOrder: 30,
  },
];
