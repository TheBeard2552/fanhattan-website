import { allLoreEntries } from './data';
import { LoreEntry, LoreType } from './types';

export function getAllLore(): LoreEntry[] {
  return allLoreEntries;
}

export function getLoreByType(type: LoreType): LoreEntry[] {
  return allLoreEntries.filter((entry) => entry.type === type);
}

export function getLoreByTypeAndSlug(type: LoreType, slug: string): LoreEntry | null {
  return allLoreEntries.find((entry) => entry.type === type && entry.slug === slug) || null;
}

export function getLoreBySlug(slug: string): LoreEntry | null {
  return allLoreEntries.find((entry) => entry.slug === slug) || null;
}

export function getFeaturedLore(): LoreEntry | null {
  return allLoreEntries.find((entry) => entry.featured) || null;
}

export function getTimelineLore(limit: number = 5): LoreEntry[] {
  return [...allLoreEntries]
    .sort((a, b) => b.timelineOrder - a.timelineOrder)
    .slice(0, limit);
}

export function getDistrictOptions(): string[] {
  const districts = new Set<string>();
  allLoreEntries.forEach((entry) => {
    if (entry.district) {
      districts.add(entry.district);
    }
  });
  return Array.from(districts).sort();
}

export function filterByDistrict(entries: LoreEntry[], districtSlug: string): LoreEntry[] {
  return entries.filter((entry) => entry.district === districtSlug);
}

export function getRelatedLore(slugs: string[]): LoreEntry[] {
  return slugs
    .map((slug) => getLoreBySlug(slug))
    .filter((entry): entry is LoreEntry => entry !== null);
}

export function getLoreTypeCounts(): Record<LoreType, number> {
  const counts: Record<LoreType, number> = {
    characters: 0,
    districts: 0,
    artifacts: 0,
    chapters: 0,
  };
  
  allLoreEntries.forEach((entry) => {
    counts[entry.type]++;
  });
  
  return counts;
}
