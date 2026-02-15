/**
 * Fanhattan Relational Lore Engine - Resolvers
 * 
 * Functions to resolve relationships between entities.
 * All relationships are computed dynamically from frontmatter.
 */

import {
  LoreEntry,
  DistrictEntry,
  CharacterEntry,
  StoryEntry,
  BeliefEntry,
  ConflictEntry,
  ThreadEntry,
  FactionEntry,
  SystemEntry,
  DistrictFrontmatter,
  CharacterFrontmatter,
  StoryFrontmatter,
} from './types';
import { loadAllContent, createSlugIndex } from './loader';

// Cache for all content
let _allContent: LoreEntry[] | null = null;
let _slugIndex: Map<string, LoreEntry> | null = null;

/**
 * Get cached content or load it
 */
function getAllContent(): LoreEntry[] {
  if (!_allContent) {
    _allContent = loadAllContent();
  }
  return _allContent;
}

/**
 * Get cached slug index or create it
 */
function getSlugIndex(): Map<string, LoreEntry> {
  if (!_slugIndex) {
    _slugIndex = createSlugIndex(getAllContent());
  }
  return _slugIndex;
}

/**
 * Get any entry by slug
 */
export function getBySlug(slug: string): LoreEntry | null {
  return getSlugIndex().get(slug) || null;
}

/**
 * Get district by slug
 */
export function getDistrictBySlug(slug: string): DistrictEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'districts' ? (entry as DistrictEntry) : null;
}

/**
 * Get character by slug
 */
export function getCharacterBySlug(slug: string): CharacterEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'characters' ? (entry as CharacterEntry) : null;
}

/**
 * Get story by slug
 */
export function getStoryBySlug(slug: string): StoryEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'stories' ? (entry as StoryEntry) : null;
}

/**
 * Get belief by slug
 */
export function getBeliefBySlug(slug: string): BeliefEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'beliefs' ? (entry as BeliefEntry) : null;
}

/**
 * Get conflict by slug
 */
export function getConflictBySlug(slug: string): ConflictEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'conflicts' ? (entry as ConflictEntry) : null;
}

/**
 * Get thread by slug
 */
export function getThreadBySlug(slug: string): ThreadEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'threads' ? (entry as ThreadEntry) : null;
}

/**
 * Get faction by slug
 */
export function getFactionBySlug(slug: string): FactionEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'factions' ? (entry as FactionEntry) : null;
}

/**
 * Get system by slug
 */
export function getSystemBySlug(slug: string): SystemEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'systems' ? (entry as SystemEntry) : null;
}

/**
 * Get all districts (uses cache)
 */
export function getAllDistricts(): DistrictEntry[] {
  return getAllContent().filter((e): e is DistrictEntry => e.type === 'districts');
}

/**
 * Get all characters (uses cache)
 */
export function getAllCharacters(): CharacterEntry[] {
  return getAllContent().filter((e): e is CharacterEntry => e.type === 'characters');
}

/**
 * Get all stories (uses cache)
 */
export function getAllStories(): StoryEntry[] {
  return getAllContent().filter((e): e is StoryEntry => e.type === 'stories');
}

/**
 * Get all beliefs (uses cache)
 */
export function getAllBeliefs(): BeliefEntry[] {
  return getAllContent().filter((e): e is BeliefEntry => e.type === 'beliefs');
}

/**
 * Get all conflicts (uses cache)
 */
export function getAllConflicts(): ConflictEntry[] {
  return getAllContent().filter((e): e is ConflictEntry => e.type === 'conflicts');
}

/**
 * Get all threads (uses cache)
 */
export function getAllThreads(): ThreadEntry[] {
  return getAllContent().filter((e): e is ThreadEntry => e.type === 'threads');
}

/**
 * Get all factions (uses cache)
 */
export function getAllFactions(): FactionEntry[] {
  return getAllContent().filter((e): e is FactionEntry => e.type === 'factions');
}

/**
 * Get all systems (uses cache)
 */
export function getAllSystems(): SystemEntry[] {
  return getAllContent().filter((e): e is SystemEntry => e.type === 'systems');
}

// ============================================================================
// RELATIONAL RESOLVERS
// ============================================================================

/**
 * Get all characters that belong to a specific district
 */
export function getCharactersByDistrict(districtSlug: string): CharacterEntry[] {
  return getAllCharacters().filter(
    char => char.frontmatter.district === districtSlug
  );
}

/**
 * Get all stories that involve a specific district
 */
export function getStoriesByDistrict(districtSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.districts.includes(districtSlug)
  );
}

/**
 * Get all stories that involve a specific character
 */
export function getStoriesByCharacter(characterSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.characters.includes(characterSlug)
  );
}

/**
 * Get all stories that involve a specific belief
 */
export function getStoriesByBelief(beliefSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.beliefs.includes(beliefSlug)
  );
}

/**
 * Get all stories that involve a specific conflict
 */
export function getStoriesByConflict(conflictSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.conflicts.includes(conflictSlug)
  );
}

/**
 * Get all stories that are part of a specific thread
 */
export function getStoriesByThread(threadSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.threads.includes(threadSlug)
  );
}

/**
 * Get all stories that involve a specific faction
 */
export function getStoriesByFaction(factionSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.factions.includes(factionSlug)
  );
}

/**
 * Get all stories that involve a specific system
 */
export function getStoriesBySystem(systemSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.systems.includes(systemSlug)
  );
}

/**
 * Get all characters that belong to a specific faction
 */
export function getCharactersByFaction(factionSlug: string): CharacterEntry[] {
  return getAllCharacters().filter(
    char => char.frontmatter.factions.includes(factionSlug)
  );
}

/**
 * Get all characters that hold a specific belief
 */
export function getCharactersByBelief(beliefSlug: string): CharacterEntry[] {
  return getAllCharacters().filter(
    char => char.frontmatter.beliefs.includes(beliefSlug)
  );
}

/**
 * Get all conflicts that appear in stories involving a district
 */
export function getConflictsByDistrict(districtSlug: string): ConflictEntry[] {
  const stories = getStoriesByDistrict(districtSlug);
  const conflictSlugs = new Set<string>();
  
  for (const story of stories) {
    for (const conflictSlug of story.frontmatter.conflicts) {
      conflictSlugs.add(conflictSlug);
    }
  }
  
  const conflicts: ConflictEntry[] = [];
  for (const slug of conflictSlugs) {
    const conflict = getConflictBySlug(slug);
    if (conflict) conflicts.push(conflict);
  }
  
  return conflicts;
}

/**
 * Get all beliefs that appear in stories involving a district
 */
export function getBeliefsByDistrict(districtSlug: string): BeliefEntry[] {
  const stories = getStoriesByDistrict(districtSlug);
  const beliefSlugs = new Set<string>();
  
  for (const story of stories) {
    for (const beliefSlug of story.frontmatter.beliefs) {
      beliefSlugs.add(beliefSlug);
    }
  }
  
  const beliefs: BeliefEntry[] = [];
  for (const slug of beliefSlugs) {
    const belief = getBeliefBySlug(slug);
    if (belief) beliefs.push(belief);
  }
  
  return beliefs;
}

/**
 * Get all threads that appear in stories involving a district
 */
export function getThreadsByDistrict(districtSlug: string): ThreadEntry[] {
  const stories = getStoriesByDistrict(districtSlug);
  const threadSlugs = new Set<string>();
  
  for (const story of stories) {
    for (const threadSlug of story.frontmatter.threads) {
      threadSlugs.add(threadSlug);
    }
  }
  
  const threads: ThreadEntry[] = [];
  for (const slug of threadSlugs) {
    const thread = getThreadBySlug(slug);
    if (thread) threads.push(thread);
  }
  
  return threads;
}

/**
 * Get all districts that appear in stories involving a character
 */
export function getDistrictsByCharacter(characterSlug: string): DistrictEntry[] {
  const stories = getStoriesByCharacter(characterSlug);
  const districtSlugs = new Set<string>();
  
  for (const story of stories) {
    for (const districtSlug of story.frontmatter.districts) {
      districtSlugs.add(districtSlug);
    }
  }
  
  const districts: DistrictEntry[] = [];
  for (const slug of districtSlugs) {
    const district = getDistrictBySlug(slug);
    if (district) districts.push(district);
  }
  
  return districts;
}

/**
 * Get all districts that are connected to a belief (via stories)
 */
export function getDistrictsByBelief(beliefSlug: string): DistrictEntry[] {
  const stories = getStoriesByBelief(beliefSlug);
  const districtSlugs = new Set<string>();
  
  for (const story of stories) {
    for (const districtSlug of story.frontmatter.districts) {
      districtSlugs.add(districtSlug);
    }
  }
  
  const districts: DistrictEntry[] = [];
  for (const slug of districtSlugs) {
    const district = getDistrictBySlug(slug);
    if (district) districts.push(district);
  }
  
  return districts;
}

/**
 * Get all characters involved in a belief (via stories or direct)
 */
export function getCharactersByBeliefDirect(beliefSlug: string): CharacterEntry[] {
  // Characters who directly hold this belief
  const directCharacters = getCharactersByBelief(beliefSlug);
  
  // Characters who appear in stories about this belief
  const stories = getStoriesByBelief(beliefSlug);
  const characterSlugs = new Set<string>(directCharacters.map(c => c.frontmatter.slug));
  
  for (const story of stories) {
    for (const charSlug of story.frontmatter.characters) {
      characterSlugs.add(charSlug);
    }
  }
  
  const characters: CharacterEntry[] = [];
  for (const slug of characterSlugs) {
    const character = getCharacterBySlug(slug);
    if (character) characters.push(character);
  }
  
  return characters;
}

/**
 * Get all rival districts for a given district
 */
export function getRivalDistricts(districtSlug: string): DistrictEntry[] {
  const district = getDistrictBySlug(districtSlug);
  if (!district) return [];
  
  const rivals: DistrictEntry[] = [];
  for (const rivalSlug of district.frontmatter.rivalDistricts) {
    const rival = getDistrictBySlug(rivalSlug);
    if (rival) rivals.push(rival);
  }
  
  return rivals;
}

/**
 * Get all factions for a character
 */
export function getFactionsByCharacter(characterSlug: string): FactionEntry[] {
  const character = getCharacterBySlug(characterSlug);
  if (!character) return [];
  
  const factions: FactionEntry[] = [];
  for (const factionSlug of character.frontmatter.factions) {
    const faction = getFactionBySlug(factionSlug);
    if (faction) factions.push(faction);
  }
  
  return factions;
}

/**
 * Get all beliefs for a character
 */
export function getBeliefsByCharacter(characterSlug: string): BeliefEntry[] {
  const character = getCharacterBySlug(characterSlug);
  if (!character) return [];
  
  const beliefs: BeliefEntry[] = [];
  for (const beliefSlug of character.frontmatter.beliefs) {
    const belief = getBeliefBySlug(beliefSlug);
    if (belief) beliefs.push(belief);
  }
  
  return beliefs;
}

/**
 * Get all static paths for a content type (for Next.js generateStaticParams)
 */
export function getStaticPaths(type: 'districts' | 'characters' | 'stories' | 'beliefs' | 'conflicts' | 'threads' | 'factions' | 'systems'): { slug: string }[] {
  const allContent = getAllContent();
  return allContent
    .filter(entry => entry.type === type)
    .map(entry => ({ slug: entry.frontmatter.slug }));
}
