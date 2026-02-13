export type LoreType = 'characters' | 'districts' | 'artifacts' | 'chapters';

export interface LoreEntry {
  id: string;
  slug: string;
  name: string;
  type: LoreType;
  summary: string;
  district?: string;
  relatedCollectibles: string[];
  relatedLore: string[];
  featured: boolean;
  image: string;
  timelineOrder: number;
}
