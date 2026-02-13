export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  status: 'available' | 'preorder' | 'sold-out';
  category: string;
}

export const products: Product[] = [
  {
    id: 'maya-chen-tee',
    name: 'Maya Chen Character T-Shirt',
    price: 29.99,
    image: '/images/products/maya-tee.jpg',
    description: 'Premium cotton tee featuring Maya Chen in her iconic hacker pose. Comfortable fit with high-quality print.',
    status: 'available',
    category: 'apparel',
  },
  {
    id: 'neon-district-poster',
    name: 'Neon District Art Print',
    price: 24.99,
    image: '/images/products/neon-poster.jpg',
    description: 'High-quality art print showcasing the vibrant Neon District. 18x24 inches on premium paper.',
    status: 'available',
    category: 'art',
  },
  {
    id: 'quantum-key-replica',
    name: 'Quantum Key Replica',
    price: 79.99,
    image: '/images/products/quantum-key.jpg',
    description: 'Detailed replica of the legendary Quantum Key artifact. LED-lit crystalline design with display stand included.',
    status: 'preorder',
    category: 'collectibles',
  },
  {
    id: 'obsidian-blade-replica',
    name: 'Obsidian Blade Display Replica',
    price: 149.99,
    image: '/images/products/obsidian-blade.jpg',
    description: 'Collector\'s edition replica of Victor Reyes\' legendary Obsidian Blade. Full-size display piece with premium finish.',
    status: 'preorder',
    category: 'collectibles',
  },
  {
    id: 'fanhattan-hoodie',
    name: 'Fanhattan Logo Hoodie',
    price: 54.99,
    image: '/images/products/hoodie.jpg',
    description: 'Comfortable hoodie with embroidered Fanhattan logo. Premium cotton blend, available in multiple colors.',
    status: 'available',
    category: 'apparel',
  },
  {
    id: 'district-map-poster',
    name: 'District Map Poster',
    price: 19.99,
    image: '/images/products/map.jpg',
    description: 'Detailed map of all Fanhattan districts. Perfect for fans wanting to explore the world.',
    status: 'available',
    category: 'art',
  },
  {
    id: 'character-pin-set',
    name: 'Character Enamel Pin Set',
    price: 34.99,
    image: '/images/products/pins.jpg',
    description: 'Set of 6 enamel pins featuring main characters. High-quality metal with secure backing.',
    status: 'available',
    category: 'collectibles',
  },
  {
    id: 'artbook',
    name: 'The Art of Fanhattan',
    price: 44.99,
    image: '/images/products/artbook.jpg',
    description: 'Hardcover artbook featuring concept art, character designs, and behind-the-scenes commentary. 160 pages.',
    status: 'preorder',
    category: 'books',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}
