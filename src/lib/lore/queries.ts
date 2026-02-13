import { getAllLoreEntries, getLoreEntriesByType, getLoreEntryBySlug, getLoreEntryByTypeAndSlug } from './fs';
import { LoreEntry, LoreType } from './types';

export function getAllLore(): LoreEntry[] {
  return getAllLoreEntries();
}

export function getLoreByType(type: LoreType): LoreEntry[] {
  return getLoreEntriesByType(type);
}

export function getLoreBySlug(slug: string): LoreEntry | null {
  return getLoreEntryBySlug(slug);
}

export function getLore(type: LoreType, slug: string): LoreEntry | null {
  return getLoreEntryByTypeAndSlug(type, slug);
}

export function getRelatedLore(relatedSlugs: string[]): LoreEntry[] {
  const allLore = getAllLoreEntries();
  return relatedSlugs
    .map(slug => allLore.find(entry => entry.frontmatter.slug === slug))
    .filter((entry): entry is LoreEntry => entry !== undefined);
}

export function getAllTags(): string[] {
  const allLore = getAllLoreEntries();
  const tagSet = new Set<string>();
  
  for (const entry of allLore) {
    for (const tag of entry.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  
  return Array.from(tagSet).sort();
}

export function getTagsForType(type: LoreType): string[] {
  const loreByType = getLoreEntriesByType(type);
  const tagSet = new Set<string>();
  
  for (const entry of loreByType) {
    for (const tag of entry.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  
  return Array.from(tagSet).sort();
}

export function filterLoreByTag(entries: LoreEntry[], tag: string): LoreEntry[] {
  return entries.filter(entry => entry.frontmatter.tags.includes(tag));
}
