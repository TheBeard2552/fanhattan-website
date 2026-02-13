// Product types for Bagged Up curated collectible storefront
export type ProductType = 'vinyl' | 'apparel' | 'digital' | 'accessory';
export type DropType = 'standard' | 'limited' | 'seasonal';
export type Mode = 'billy' | 'super' | 'neutral';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  rarity?: Rarity;
  price: number;
  description: string;
  dropType: DropType;
  mode?: Mode;
  relatedLore: string[];
  relatedCollectible?: string;
  image: string;
  isSoldOut: boolean;
}

export const products: Product[] = [
  // VINYL (3)
  {
    id: 'fanhattan-ost-vinyl',
    slug: 'fanhattan-ost-vinyl',
    name: 'Fanhattan Original Soundtrack',
    type: 'vinyl',
    price: 34.99,
    description: 'Limited edition vinyl pressing of the complete Fanhattan original soundtrack. Features exclusive artwork and liner notes from the composers. 180g heavyweight vinyl in gatefold sleeve.',
    dropType: 'limited',
    mode: 'neutral',
    relatedLore: ['neon-district', 'shadow-district'],
    image: '/images/products/ost-vinyl.jpg',
    isSoldOut: false,
  },
  {
    id: 'billy-mode-ep',
    slug: 'billy-mode-ep',
    name: 'Billy Mode EP',
    type: 'vinyl',
    price: 24.99,
    description: 'Exclusive 7" vinyl featuring the high-energy Billy Mode tracks. Orange translucent vinyl with heat-activated sleeve art that shifts as you handle it.',
    dropType: 'standard',
    mode: 'billy',
    relatedLore: ['maya-chen'],
    image: '/images/products/billy-vinyl.jpg',
    isSoldOut: false,
  },
  {
    id: 'super-mode-sessions',
    slug: 'super-mode-sessions',
    name: 'Super Mode Sessions',
    type: 'vinyl',
    price: 29.99,
    description: 'Limited pressing of the chillwave Super Mode sessions. Electric blue vinyl with holographic foil stamping. Includes digital download code.',
    dropType: 'seasonal',
    mode: 'super',
    relatedLore: ['victor-reyes'],
    image: '/images/products/super-vinyl.jpg',
    isSoldOut: true,
  },

  // APPAREL (3)
  {
    id: 'quantum-key-tee',
    slug: 'quantum-key-tee',
    name: 'Quantum Key T-Shirt',
    type: 'apparel',
    price: 32.99,
    description: 'Premium heavyweight cotton tee featuring embossed Quantum Key artwork. Oversized fit with stadium teal accents. Limited drop celebrating the artifact\'s discovery.',
    dropType: 'limited',
    mode: 'neutral',
    relatedLore: ['quantum-key', 'neon-district'],
    relatedCollectible: 'quantum-key',
    image: '/images/products/quantum-tee.jpg',
    isSoldOut: false,
  },
  {
    id: 'fanhattan-hoodie-premium',
    slug: 'fanhattan-hoodie-premium',
    name: 'Fanhattan Premium Hoodie',
    type: 'apparel',
    price: 64.99,
    description: 'Heavyweight 450gsm cotton hoodie with embroidered Fanhattan logo. Features hidden interior pocket and reinforced cuffs. Available in asphalt and sand colorways.',
    dropType: 'standard',
    mode: 'neutral',
    relatedLore: [],
    image: '/images/products/hoodie-premium.jpg',
    isSoldOut: false,
  },
  {
    id: 'obsidian-blade-jacket',
    slug: 'obsidian-blade-jacket',
    name: 'Obsidian Blade Coach Jacket',
    type: 'apparel',
    price: 89.99,
    description: 'Water-resistant coach jacket inspired by Victor Reyes\' legendary weapon. Features reflective Obsidian Blade print on back and teal interior lining.',
    dropType: 'seasonal',
    mode: 'super',
    relatedLore: ['obsidian-blade', 'victor-reyes'],
    relatedCollectible: 'obsidian-blade',
    image: '/images/products/blade-jacket.jpg',
    isSoldOut: false,
  },

  // DIGITAL (3)
  {
    id: 'maya-chen-digital-collectible',
    slug: 'maya-chen-digital-collectible',
    name: 'Maya Chen Digital Collectible',
    type: 'digital',
    rarity: 'legendary',
    price: 49.99,
    description: 'Legendary-tier animated digital collectible featuring Maya Chen in iconic hacker pose. Unlocks exclusive in-game perks and profile customization. Limited to 500 editions.',
    dropType: 'limited',
    mode: 'billy',
    relatedLore: ['maya-chen', 'neon-district'],
    image: '/images/products/maya-digital.jpg',
    isSoldOut: false,
  },
  {
    id: 'neon-district-art-print',
    slug: 'neon-district-art-print',
    name: 'Neon District Art Print (Digital)',
    type: 'digital',
    rarity: 'rare',
    price: 19.99,
    description: 'High-resolution digital art print of the iconic Neon District skyline. Perfect for desktop wallpapers or printing. Includes 4K, 5K, and mobile versions.',
    dropType: 'standard',
    mode: 'neutral',
    relatedLore: ['neon-district'],
    image: '/images/products/neon-print.jpg',
    isSoldOut: false,
  },
  {
    id: 'fanhattan-starter-pack',
    slug: 'fanhattan-starter-pack',
    name: 'Fanhattan Starter Pack',
    type: 'digital',
    rarity: 'common',
    price: 9.99,
    description: 'Essential digital starter pack including 3 common collectibles, in-game currency, and exclusive welcome badge. Perfect entry point for new collectors.',
    dropType: 'standard',
    mode: 'neutral',
    relatedLore: [],
    image: '/images/products/starter-pack.jpg',
    isSoldOut: false,
  },

  // ACCESSORIES (2 bonus)
  {
    id: 'district-map-poster',
    slug: 'district-map-poster',
    name: 'Fanhattan District Map',
    type: 'accessory',
    price: 24.99,
    description: 'Museum-quality poster featuring detailed map of all Fanhattan districts. Printed on premium archival paper. 18x24 inches.',
    dropType: 'standard',
    mode: 'neutral',
    relatedLore: ['neon-district', 'shadow-district'],
    image: '/images/products/map-poster.jpg',
    isSoldOut: false,
  },
  {
    id: 'collector-pin-set',
    slug: 'collector-pin-set',
    name: 'Limited Collector Pin Set',
    type: 'accessory',
    price: 39.99,
    description: 'Deluxe enamel pin set featuring 5 exclusive designs: Maya Chen, Victor Reyes, Quantum Key, Obsidian Blade, and Fanhattan logo. Gold-plated with secure locking backs.',
    dropType: 'seasonal',
    mode: 'neutral',
    relatedLore: ['maya-chen', 'victor-reyes', 'quantum-key', 'obsidian-blade'],
    image: '/images/products/pin-set.jpg',
    isSoldOut: false,
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedLimitedDrop(): Product | undefined {
  // First try to find a limited drop that's not sold out
  const availableLimited = products.find(
    (p) => p.dropType === 'limited' && !p.isSoldOut
  );
  
  if (availableLimited) {
    return availableLimited;
  }
  
  // Fallback to any limited drop
  return products.find((p) => p.dropType === 'limited');
}

export function getProductsByType(type: ProductType): Product[] {
  return products.filter((p) => p.type === type);
}

export function getProductsByDropType(dropType: DropType): Product[] {
  return products.filter((p) => p.dropType === dropType);
}

export function getAllProductTypes(): ProductType[] {
  return ['vinyl', 'apparel', 'digital', 'accessory'];
}

export function getAllDropTypes(): DropType[] {
  return ['standard', 'limited', 'seasonal'];
}
