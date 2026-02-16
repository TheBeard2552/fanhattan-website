export type CollectibleType = 'bag' | 'skin' | 'artifact' | 'districtEdition';
export type CollectibleRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
export type CollectibleMode = 'billy' | 'super' | 'neutral';

export interface Collectible {
  id: string;
  slug: string;
  name: string;
  type: CollectibleType;
  rarity: CollectibleRarity;
  mode: CollectibleMode;
  district?: string;
  season: number;
  isLimited: boolean;
  unlockMethod: string;
  loreSummary: string;
  relatedLoreSlugs: string[];
  image: string;
}

export const collectibles: Collectible[] = [
  // Billy's Big Streak collectibles (3)
  {
    id: '1',
    slug: 'heat-wave-bag',
    name: 'Heat Wave Bag',
    type: 'bag',
    rarity: 'legendary',
    mode: 'billy',
    district: 'Neon District',
    season: 1,
    isLimited: false,
    unlockMethod: 'Achieve a 25-game win streak in Billy\'s Big Streak',
    loreSummary: 'Forged in the heat of competition, this bag carries the essence of Billy\'s relentless spirit. Each victory adds another ember to its glow.',
    relatedLoreSlugs: ['neon-district', 'billy-chen'],
    image: '/images/collectibles/heat-wave-bag.jpg',
  },
  {
    id: '2',
    slug: 'inferno-crown-skin',
    name: 'Inferno Crown',
    type: 'skin',
    rarity: 'mythical',
    mode: 'billy',
    season: 1,
    isLimited: true,
    unlockMethod: 'Top 10 global ranking in Season 1 Billy\'s Big Streak',
    loreSummary: 'Only the most elite competitors can claim this crown. Its flames never dim, a testament to those who conquered the heat.',
    relatedLoreSlugs: ['billy-chen'],
    image: '/images/collectibles/inferno-crown.jpg',
  },
  {
    id: '3',
    slug: 'scorched-earth-artifact',
    name: 'Scorched Earth Token',
    type: 'artifact',
    rarity: 'epic',
    mode: 'billy',
    district: 'Industrial Zone',
    season: 1,
    isLimited: false,
    unlockMethod: 'Complete 100 matches in Billy\'s Big Streak',
    loreSummary: 'A token from the Industrial Zone\'s forgotten foundries. It hums with residual heat from countless battles.',
    relatedLoreSlugs: ['industrial-zone'],
    image: '/images/collectibles/scorched-earth.jpg',
  },
  // Super Streak collectibles (3)
  {
    id: '4',
    slug: 'electric-pulse-bag',
    name: 'Electric Pulse Bag',
    type: 'bag',
    rarity: 'legendary',
    mode: 'super',
    district: 'Tech Haven',
    season: 1,
    isLimited: false,
    unlockMethod: 'Reach Diamond tier in Super Streak',
    loreSummary: 'Crackling with raw energy, this bag channels the unstoppable momentum of Super Streak champions.',
    relatedLoreSlugs: ['tech-haven', 'maya-chen'],
    image: '/images/collectibles/electric-pulse-bag.jpg',
  },
  {
    id: '5',
    slug: 'voltage-master-skin',
    name: 'Voltage Master',
    type: 'skin',
    rarity: 'mythical',
    mode: 'super',
    season: 1,
    isLimited: true,
    unlockMethod: 'Win 3 consecutive Super Streak tournaments',
    loreSummary: 'Reserved for legends who can harness lightning itself. The voltage flows through those worthy of its power.',
    relatedLoreSlugs: ['maya-chen'],
    image: '/images/collectibles/voltage-master.jpg',
  },
  {
    id: '6',
    slug: 'circuit-breaker-artifact',
    name: 'Circuit Breaker',
    type: 'artifact',
    rarity: 'rare',
    mode: 'super',
    district: 'Neon District',
    season: 1,
    isLimited: false,
    unlockMethod: 'Defeat 50 opponents in Super Streak ranked matches',
    loreSummary: 'A relic from Neon District\'s underground circuits. Its electric hum tells stories of near-impossible comebacks.',
    relatedLoreSlugs: ['neon-district', 'quantum-key'],
    image: '/images/collectibles/circuit-breaker.jpg',
  },
  // Neutral/Seasonal collectibles (3)
  {
    id: '7',
    slug: 'founders-edition-bag',
    name: 'Founder\'s Edition Bag',
    type: 'bag',
    rarity: 'legendary',
    mode: 'neutral',
    season: 1,
    isLimited: true,
    unlockMethod: 'Pre-register before Season 1 launch',
    loreSummary: 'A tribute to the pioneers who believed in Fanhattan from the beginning. Each bag is numbered and unique.',
    relatedLoreSlugs: [],
    image: '/images/collectibles/founders-bag.jpg',
  },
  {
    id: '8',
    slug: 'archive-district-edition',
    name: 'Archive District Special',
    type: 'districtEdition',
    rarity: 'epic',
    mode: 'neutral',
    district: 'Archive District',
    season: 1,
    isLimited: false,
    unlockMethod: 'Explore all lore entries in Archive District',
    loreSummary: 'The Archive District preserves the history of Fanhattan. This edition commemorates those who seek knowledge above all.',
    relatedLoreSlugs: ['archive-district'],
    image: '/images/collectibles/archive-edition.jpg',
  },
  {
    id: '9',
    slug: 'season-one-commemorative',
    name: 'Season One Commemorative',
    type: 'artifact',
    rarity: 'rare',
    mode: 'neutral',
    season: 1,
    isLimited: true,
    unlockMethod: 'Participate in any match during Season 1',
    loreSummary: 'Every beginning deserves to be remembered. This artifact marks the dawn of competition in Fanhattan.',
    relatedLoreSlugs: [],
    image: '/images/collectibles/season-one.jpg',
  },
  // Additional entries for variety
  {
    id: '10',
    slug: 'paper-trail-bag',
    name: 'Paper Trail Bag',
    type: 'bag',
    rarity: 'common',
    mode: 'neutral',
    season: 1,
    isLimited: false,
    unlockMethod: 'Complete the tutorial',
    loreSummary: 'Every legend starts somewhere. This humble bag carried the hopes of countless newcomers to Fanhattan.',
    relatedLoreSlugs: [],
    image: '/images/collectibles/paper-trail.jpg',
  },
  {
    id: '11',
    slug: 'blazing-glory-skin',
    name: 'Blazing Glory',
    type: 'skin',
    rarity: 'epic',
    mode: 'billy',
    season: 2,
    isLimited: false,
    unlockMethod: 'Win 10 consecutive matches in Season 2 Billy\'s Big Streak',
    loreSummary: 'Season 2 brought new challenges and new rewards. This skin represents the evolution of the heat.',
    relatedLoreSlugs: [],
    image: '/images/collectibles/blazing-glory.jpg',
  },
  {
    id: '12',
    slug: 'storm-chaser-skin',
    name: 'Storm Chaser',
    type: 'skin',
    rarity: 'epic',
    mode: 'super',
    season: 2,
    isLimited: false,
    unlockMethod: 'Reach Platinum tier in Season 2 Super Streak',
    loreSummary: 'Chase the storm, ride the lightning. Season 2\'s challengers earned this electric distinction.',
    relatedLoreSlugs: [],
    image: '/images/collectibles/storm-chaser.jpg',
  },
];

export function getCollectibleBySlug(slug: string): Collectible | undefined {
  return collectibles.find((c) => c.slug === slug);
}

export function getAllCollectibleSlugs(): string[] {
  return collectibles.map((c) => c.slug);
}

export function getCollectiblesByMode(mode: CollectibleMode | 'all'): Collectible[] {
  if (mode === 'all') return collectibles;
  return collectibles.filter((c) => c.mode === mode);
}

export function getCollectiblesByType(type: CollectibleType | 'all'): Collectible[] {
  if (type === 'all') return collectibles;
  return collectibles.filter((c) => c.type === type);
}

export function getCollectiblesByRarity(rarity: CollectibleRarity | 'all'): Collectible[] {
  if (rarity === 'all') return collectibles;
  return collectibles.filter((c) => c.rarity === rarity);
}
