import { PortableTextBlock } from 'next-sanity';

export type LoreType = 'characters' | 'districts' | 'artifacts' | 'chapters';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanityLoreBase {
  _id: string;
  _type: 'loreCharacter' | 'loreDistrict' | 'loreArtifact' | 'loreChapter';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  summary: string;
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
  tags: string[];
  relatedLore?: SanityReference[];
  relatedCollectibles?: string[];
  status: 'draft' | 'canon' | 'apocrypha';
  featured: boolean;
  timelineOrder?: number;
  updatedAt: string;
}

export interface SanityLoreCharacter extends SanityLoreBase {
  _type: 'loreCharacter';
  district?: SanityReference;
}

export interface SanityLoreDistrict extends SanityLoreBase {
  _type: 'loreDistrict';
}

export interface SanityLoreArtifact extends SanityLoreBase {
  _type: 'loreArtifact';
  district?: SanityReference;
}

export interface SanityLoreChapter extends SanityLoreBase {
  _type: 'loreChapter';
  district?: SanityReference;
}

export type SanityLoreEntry =
  | SanityLoreCharacter
  | SanityLoreDistrict
  | SanityLoreArtifact
  | SanityLoreChapter;

// Resolved types (with references populated)
export interface ResolvedLoreEntry {
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
  status: 'draft' | 'canon' | 'apocrypha';
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
  updatedAt: string;
}
