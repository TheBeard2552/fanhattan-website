import { groq } from 'next-sanity';
import { client } from './client';
import { SanityLoreEntry, ResolvedLoreEntry, LoreType } from './types';
import { urlForImage } from './image';

// Base lore fields to query
const loreFields = groq`
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  heroImage,
  body,
  tags,
  "district": district->slug.current,
  "relatedLore": relatedLore[]->slug.current,
  relatedCollectibles,
  status,
  featured,
  timelineOrder,
  updatedAt
`;

// Convert Sanity type to LoreType
function sanityTypeToLoreType(sanityType: string): LoreType {
  switch (sanityType) {
    case 'loreCharacter':
      return 'characters';
    case 'loreDistrict':
      return 'districts';
    case 'loreArtifact':
      return 'artifacts';
    case 'loreChapter':
      return 'chapters';
    default:
      return 'characters';
  }
}

// Convert Sanity entry to resolved entry
function toResolvedEntry(entry: any): ResolvedLoreEntry {
  return {
    id: entry._id,
    slug: entry.slug,
    name: entry.title,
    type: sanityTypeToLoreType(entry._type),
    summary: entry.summary,
    district: entry.district || undefined,
    relatedCollectibles: entry.relatedCollectibles || [],
    relatedLore: entry.relatedLore || [],
    featured: entry.featured || false,
    image: entry.heroImage ? urlForImage(entry.heroImage).url() : '/images/lore/placeholder.jpg',
    timelineOrder: entry.timelineOrder || new Date(entry.updatedAt || entry._createdAt).getTime(),
    status: entry.status,
    heroImage: entry.heroImage,
    body: entry.body,
    updatedAt: entry.updatedAt || entry._updatedAt,
  };
}

// Get all lore entries (published only)
export async function getAllLore(): Promise<ResolvedLoreEntry[]> {
  const query = groq`*[
    _type in ["loreCharacter", "loreDistrict", "loreArtifact", "loreChapter"]
    && status != "draft"
  ] | order(_updatedAt desc) {
    ${loreFields}
  }`;
  
  const entries = await client.fetch<any[]>(query);
  return entries.map(toResolvedEntry);
}

// Get lore entries by type
export async function getLoreByType(type: LoreType): Promise<ResolvedLoreEntry[]> {
  const sanityType = typeToSanityType(type);
  
  const query = groq`*[
    _type == $sanityType
    && status != "draft"
  ] | order(_updatedAt desc) {
    ${loreFields}
  }`;
  
  const entries = await client.fetch<any[]>(query, { sanityType });
  return entries.map(toResolvedEntry);
}

// Convert LoreType to Sanity type
function typeToSanityType(type: LoreType): string {
  switch (type) {
    case 'characters':
      return 'loreCharacter';
    case 'districts':
      return 'loreDistrict';
    case 'artifacts':
      return 'loreArtifact';
    case 'chapters':
      return 'loreChapter';
  }
}

// Get a single lore entry by type and slug
export async function getLoreByTypeAndSlug(
  type: LoreType,
  slug: string
): Promise<ResolvedLoreEntry | null> {
  const sanityType = typeToSanityType(type);
  
  const query = groq`*[
    _type == $sanityType
    && slug.current == $slug
    && status != "draft"
  ][0] {
    ${loreFields}
  }`;
  
  const entry = await client.fetch<any>(query, { sanityType, slug });
  return entry ? toResolvedEntry(entry) : null;
}

// Get a single lore entry by slug (any type)
export async function getLoreBySlug(slug: string): Promise<ResolvedLoreEntry | null> {
  const query = groq`*[
    _type in ["loreCharacter", "loreDistrict", "loreArtifact", "loreChapter"]
    && slug.current == $slug
    && status != "draft"
  ][0] {
    ${loreFields}
  }`;
  
  const entry = await client.fetch<any>(query, { slug });
  return entry ? toResolvedEntry(entry) : null;
}

// Get featured lore entry
export async function getFeaturedLore(): Promise<ResolvedLoreEntry | null> {
  const query = groq`*[
    _type in ["loreCharacter", "loreDistrict", "loreArtifact", "loreChapter"]
    && featured == true
    && status != "draft"
  ] | order(_updatedAt desc) [0] {
    ${loreFields}
  }`;
  
  const entry = await client.fetch<any>(query);
  return entry ? toResolvedEntry(entry) : null;
}

// Get timeline lore entries
export async function getTimelineLore(limit: number = 5): Promise<ResolvedLoreEntry[]> {
  const query = groq`*[
    _type in ["loreCharacter", "loreDistrict", "loreArtifact", "loreChapter"]
    && status != "draft"
  ] | order(coalesce(timelineOrder, 0) desc, _updatedAt desc) [0...$limit] {
    ${loreFields}
  }`;
  
  const entries = await client.fetch<any[]>(query, { limit: limit - 1 });
  return entries.map(toResolvedEntry);
}

// Get district options (unique district slugs)
export async function getDistrictOptions(): Promise<string[]> {
  const query = groq`array::unique(*[
    _type == "loreDistrict"
    && status != "draft"
  ].slug.current)`;
  
  return client.fetch<string[]>(query);
}

// Filter entries by district
export async function filterByDistrict(
  entries: ResolvedLoreEntry[],
  districtSlug: string
): Promise<ResolvedLoreEntry[]> {
  return entries.filter((entry) => entry.district === districtSlug);
}

// Get related lore entries
export async function getRelatedLore(slugs: string[]): Promise<ResolvedLoreEntry[]> {
  if (slugs.length === 0) return [];
  
  const query = groq`*[
    _type in ["loreCharacter", "loreDistrict", "loreArtifact", "loreChapter"]
    && slug.current in $slugs
    && status != "draft"
  ] {
    ${loreFields}
  }`;
  
  const entries = await client.fetch<any[]>(query, { slugs });
  return entries.map(toResolvedEntry);
}

// Get lore type counts
export async function getLoreTypeCounts(): Promise<Record<LoreType, number>> {
  const query = groq`{
    "characters": count(*[_type == "loreCharacter" && status != "draft"]),
    "districts": count(*[_type == "loreDistrict" && status != "draft"]),
    "artifacts": count(*[_type == "loreArtifact" && status != "draft"]),
    "chapters": count(*[_type == "loreChapter" && status != "draft"])
  }`;
  
  return client.fetch<Record<LoreType, number>>(query);
}

// Get all slugs for static params generation
export async function getAllLoreSlugs(): Promise<Array<{ type: LoreType; slug: string }>> {
  const query = groq`*[
    _type in ["loreCharacter", "loreDistrict", "loreArtifact", "loreChapter"]
    && status != "draft"
  ] {
    _type,
    "slug": slug.current
  }`;
  
  const entries = await client.fetch<Array<{ _type: string; slug: string }>>(query);
  return entries.map((entry) => ({
    type: sanityTypeToLoreType(entry._type),
    slug: entry.slug,
  }));
}
