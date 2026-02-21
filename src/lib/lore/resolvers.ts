/**
 * Fanhattan Relational Lore Engine - Resolvers
 * 
 * Functions to resolve relationships between entities.
 * All relationships are computed dynamically from frontmatter.
 * 
 * Four Core Content Types:
 * 1. Districts - Geographic/cultural regions
 * 2. Characters - Individuals
 * 3. Stories - Narratives (standalone or episodic)
 * 4. Artifacts - World elements (beliefs, systems, factions, locations, etc.)
 */

import {
  LoreEntry,
  DistrictEntry,
  CharacterEntry,
  StoryEntry,
  ArtifactEntry,
  DistrictFrontmatter,
  CharacterFrontmatter,
  StoryFrontmatter,
  ArtifactFrontmatter,
  ArtifactType,
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
 * Get artifact by slug
 */
export function getArtifactBySlug(slug: string): ArtifactEntry | null {
  const entry = getBySlug(slug);
  return entry?.type === 'artifacts' ? (entry as ArtifactEntry) : null;
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
 * Get all artifacts (uses cache)
 */
export function getAllArtifacts(): ArtifactEntry[] {
  return getAllContent().filter((e): e is ArtifactEntry => e.type === 'artifacts');
}

/**
 * Get artifacts by type
 */
export function getArtifactsByType(artifactType: ArtifactType): ArtifactEntry[] {
  return getAllArtifacts().filter(a => a.frontmatter.artifactType === artifactType);
}

/**
 * Get all beliefs (artifacts with artifactType: "belief")
 */
export function getAllBeliefs(): ArtifactEntry[] {
  return getArtifactsByType('belief');
}

/**
 * Get all systems (artifacts with artifactType: "system")
 */
export function getAllSystems(): ArtifactEntry[] {
  return getArtifactsByType('system');
}

/**
 * Get all factions (artifacts with artifactType: "faction")
 */
export function getAllFactions(): ArtifactEntry[] {
  return getArtifactsByType('faction');
}

/**
 * Get all locations (artifacts with artifactType: "location")
 */
export function getAllLocations(): ArtifactEntry[] {
  return getArtifactsByType('location');
}

/**
 * Get all conflicts (artifacts with artifactType: "conflict")
 */
export function getAllConflicts(): ArtifactEntry[] {
  return getArtifactsByType('conflict');
}

/**
 * Get all threads (artifacts with artifactType: "thread")
 */
export function getAllThreads(): ArtifactEntry[] {
  return getArtifactsByType('thread');
}

/**
 * Get all items (artifacts with artifactType: "item")
 */
export function getAllItems(): ArtifactEntry[] {
  return getArtifactsByType('item');
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
 * Get all stories that involve a specific artifact
 */
export function getStoriesByArtifact(artifactSlug: string): StoryEntry[] {
  return getAllStories().filter(
    story => story.frontmatter.artifacts.includes(artifactSlug)
  );
}

/**
 * Get all stories that involve a specific artifact type
 */
export function getStoriesByArtifactType(artifactType: ArtifactType): StoryEntry[] {
  const artifactsOfType = getArtifactsByType(artifactType);
  const artifactSlugs = new Set(artifactsOfType.map(a => a.frontmatter.slug));
  
  return getAllStories().filter(story =>
    story.frontmatter.artifacts.some(slug => artifactSlugs.has(slug))
  );
}

/**
 * Get all standalone stories
 */
export function getStandaloneStories(): StoryEntry[] {
  return getAllStories().filter(story => story.frontmatter.storyType === 'standalone');
}

/**
 * Get all episodic stories
 */
export function getEpisodicStories(): StoryEntry[] {
  return getAllStories().filter(story => story.frontmatter.storyType === 'episodic');
}

/**
 * Get all episodes in a series, sorted by episode number
 */
export function getStoriesBySeries(seriesSlug: string): StoryEntry[] {
  return getAllStories()
    .filter(story => 
      story.frontmatter.storyType === 'episodic' && 
      story.frontmatter.seriesSlug === seriesSlug
    )
    .sort((a, b) => (a.frontmatter.episodeNumber || 0) - (b.frontmatter.episodeNumber || 0));
}

/**
 * Get all characters associated with a specific artifact
 */
export function getCharactersByArtifact(artifactSlug: string): CharacterEntry[] {
  return getAllCharacters().filter(
    char => char.frontmatter.artifacts.includes(artifactSlug)
  );
}

/**
 * Get all characters associated with a specific artifact type
 */
export function getCharactersByArtifactType(artifactType: ArtifactType): CharacterEntry[] {
  const artifactsOfType = getArtifactsByType(artifactType);
  const artifactSlugs = new Set(artifactsOfType.map(a => a.frontmatter.slug));
  
  return getAllCharacters().filter(char =>
    char.frontmatter.artifacts.some(slug => artifactSlugs.has(slug))
  );
}

/**
 * Get all artifacts that appear in stories involving a district
 */
export function getArtifactsByDistrict(districtSlug: string): ArtifactEntry[] {
  const stories = getStoriesByDistrict(districtSlug);
  const artifactSlugs = new Set<string>();
  
  for (const story of stories) {
    for (const artifactSlug of story.frontmatter.artifacts) {
      artifactSlugs.add(artifactSlug);
    }
  }
  
  const artifacts: ArtifactEntry[] = [];
  for (const slug of artifactSlugs) {
    const artifact = getArtifactBySlug(slug);
    if (artifact) artifacts.push(artifact);
  }
  
  return artifacts;
}

/**
 * Get artifacts of a specific type that appear in stories involving a district
 */
export function getArtifactsByDistrictAndType(districtSlug: string, artifactType: ArtifactType): ArtifactEntry[] {
  return getArtifactsByDistrict(districtSlug).filter(
    artifact => artifact.frontmatter.artifactType === artifactType
  );
}

/**
 * Get unique items (artifactType: "item") associated with a district.
 * Sources: stories set in the district + items held by characters in the district.
 * Artifacts are rare, myth-level objects — this keeps the list focused and important.
 */
export function getItemsByDistrict(districtSlug: string): ArtifactEntry[] {
  const itemSlugs = new Set<string>();

  // From stories involving this district
  const storyArtifacts = getArtifactsByDistrictAndType(districtSlug, 'item');
  for (const a of storyArtifacts) itemSlugs.add(a.frontmatter.slug);

  // From characters who live in this district
  const characters = getCharactersByDistrict(districtSlug);
  for (const char of characters) {
    for (const slug of char.frontmatter.artifacts) {
      const artifact = getArtifactBySlug(slug);
      if (artifact?.frontmatter.artifactType === 'item') itemSlugs.add(slug);
    }
  }

  const items: ArtifactEntry[] = [];
  for (const slug of itemSlugs) {
    const artifact = getArtifactBySlug(slug);
    if (artifact) items.push(artifact);
  }
  return items;
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
 * Get all districts that are connected to an artifact (via stories)
 */
export function getDistrictsByArtifact(artifactSlug: string): DistrictEntry[] {
  const stories = getStoriesByArtifact(artifactSlug);
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
 * Get all characters involved with an artifact (via direct association or stories)
 */
export function getCharactersByArtifactWithStories(artifactSlug: string): CharacterEntry[] {
  // Characters who directly reference this artifact
  const directCharacters = getCharactersByArtifact(artifactSlug);
  
  // Characters who appear in stories involving this artifact
  const stories = getStoriesByArtifact(artifactSlug);
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
 * Get all artifacts for a character
 */
export function getArtifactsByCharacter(characterSlug: string): ArtifactEntry[] {
  const character = getCharacterBySlug(characterSlug);
  if (!character) return [];
  
  const artifacts: ArtifactEntry[] = [];
  for (const artifactSlug of character.frontmatter.artifacts) {
    const artifact = getArtifactBySlug(artifactSlug);
    if (artifact) artifacts.push(artifact);
  }
  
  return artifacts;
}

/**
 * Get artifacts of a specific type for a character
 */
export function getArtifactsByCharacterAndType(characterSlug: string, artifactType: ArtifactType): ArtifactEntry[] {
  return getArtifactsByCharacter(characterSlug).filter(
    artifact => artifact.frontmatter.artifactType === artifactType
  );
}

/**
 * Get all artifacts for a story
 */
export function getArtifactsByStory(storySlug: string): ArtifactEntry[] {
  const story = getStoryBySlug(storySlug);
  if (!story) return [];
  
  const artifacts: ArtifactEntry[] = [];
  for (const artifactSlug of story.frontmatter.artifacts) {
    const artifact = getArtifactBySlug(artifactSlug);
    if (artifact) artifacts.push(artifact);
  }
  
  return artifacts;
}

/**
 * Get artifacts of a specific type for a story
 */
export function getArtifactsByStoryAndType(storySlug: string, artifactType: ArtifactType): ArtifactEntry[] {
  return getArtifactsByStory(storySlug).filter(
    artifact => artifact.frontmatter.artifactType === artifactType
  );
}

/**
 * Get all static paths for a content type (for Next.js generateStaticParams)
 */
export function getStaticPaths(type: 'districts' | 'characters' | 'stories' | 'artifacts'): { slug: string }[] {
  const allContent = getAllContent();
  return allContent
    .filter(entry => entry.type === type)
    .map(entry => ({ slug: entry.frontmatter.slug }));
}

/**
 * Get static paths for artifact subtypes (belief, conflict, faction, system, thread)
 */
export function getArtifactTypeStaticPaths(artifactType: ArtifactType): { slug: string }[] {
  return getArtifactsByType(artifactType).map(a => ({ slug: a.frontmatter.slug }));
}

// ============================================================================
// ARTIFACT-TYPE ALIASES (for backward compatibility with entity pages)
// ============================================================================

export function getBeliefBySlug(slug: string): ArtifactEntry | null {
  const a = getArtifactBySlug(slug);
  return a?.frontmatter.artifactType === 'belief' ? a : null;
}

export function getConflictBySlug(slug: string): ArtifactEntry | null {
  const a = getArtifactBySlug(slug);
  return a?.frontmatter.artifactType === 'conflict' ? a : null;
}

export function getThreadBySlug(slug: string): ArtifactEntry | null {
  const a = getArtifactBySlug(slug);
  return a?.frontmatter.artifactType === 'thread' ? a : null;
}

export function getFactionBySlug(slug: string): ArtifactEntry | null {
  const a = getArtifactBySlug(slug);
  return a?.frontmatter.artifactType === 'faction' ? a : null;
}

export function getSystemBySlug(slug: string): ArtifactEntry | null {
  const a = getArtifactBySlug(slug);
  return a?.frontmatter.artifactType === 'system' ? a : null;
}

export function getStoriesByBelief(slug: string): StoryEntry[] {
  return getStoriesByArtifact(slug);
}

export function getStoriesByConflict(slug: string): StoryEntry[] {
  return getStoriesByArtifact(slug);
}

export function getStoriesByThread(slug: string): StoryEntry[] {
  return getStoriesByArtifact(slug);
}

export function getStoriesByFaction(slug: string): StoryEntry[] {
  return getStoriesByArtifact(slug);
}

export function getStoriesBySystem(slug: string): StoryEntry[] {
  return getStoriesByArtifact(slug);
}

export function getDistrictsByBelief(slug: string): DistrictEntry[] {
  return getDistrictsByArtifact(slug);
}

export function getCharactersByBeliefDirect(slug: string): CharacterEntry[] {
  return getCharactersByArtifact(slug);
}

export function getBeliefsByDistrict(districtSlug: string): ArtifactEntry[] {
  return getArtifactsByDistrictAndType(districtSlug, 'belief');
}

export function getConflictsByDistrict(districtSlug: string): ArtifactEntry[] {
  return getArtifactsByDistrictAndType(districtSlug, 'conflict');
}

export function getThreadsByDistrict(districtSlug: string): ArtifactEntry[] {
  return getArtifactsByDistrictAndType(districtSlug, 'thread');
}

export function getBeliefsByCharacter(characterSlug: string): ArtifactEntry[] {
  return getArtifactsByCharacterAndType(characterSlug, 'belief');
}

export function getFactionsByCharacter(characterSlug: string): ArtifactEntry[] {
  return getArtifactsByCharacterAndType(characterSlug, 'faction');
}

export function getCharactersByFaction(slug: string): CharacterEntry[] {
  return getCharactersByArtifact(slug);
}
