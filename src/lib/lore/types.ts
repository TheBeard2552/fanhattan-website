/**
 * Fanhattan Relational Lore Engine - Type Definitions
 * 
 * This defines the complete type system for the lore engine.
 * All relationships are typed and validated at build time.
 * 
 * Four Core Content Types:
 * 1. Districts - Geographic/cultural regions
 * 2. Characters - Individuals
 * 3. Stories - Narratives (standalone or episodic)
 * 4. Artifacts - World elements (beliefs, systems, factions, locations, etc.)
 */

export type CanonTier = "tier-1" | "tier-2" | "tier-3";
export type StoryType = "standalone" | "episodic";
export type ArtifactType = 
  | "belief"      // Ideological principles
  | "system"      // World mechanics/rules
  | "faction"     // Organized groups
  | "location"    // Physical places
  | "conflict"    // Tensions/struggles
  | "thread"      // Narrative arcs
  | "item";       // Physical objects/relics

export type ThreadStatus = "active" | "dormant" | "resolved";

/**
 * District - A geographical and cultural region in Fanhattan
 */
export interface DistrictFrontmatter {
  name: string;
  slug: string;
  coreBelief: string;
  rivalDistricts: string[]; // slugs
  canonTier: CanonTier;
  description?: string;
  coverImage?: string;
  thumbnail?: string;
}

/**
 * Character - An individual in Fanhattan
 */
export interface CharacterFrontmatter {
  name: string;
  slug: string;
  district: string; // district slug
  role: string;
  reputation: string;
  privateTruth: string;
  artifacts: string[]; // artifact slugs (beliefs, factions, items, etc.)
  canonTier: CanonTier;
  coverImage?: string;
  thumbnail?: string;
}

/**
 * Story - A narrative event or chapter in Fanhattan
 * Can be standalone (complete in one story) or episodic (part of a series)
 */
export interface StoryFrontmatter {
  title: string;
  slug: string;
  storyType: StoryType; // standalone or episodic
  episodeNumber?: number; // required if storyType is "episodic"
  seriesSlug?: string; // required if storyType is "episodic"
  districts: string[]; // district slugs
  characters: string[]; // character slugs
  artifacts: string[]; // artifact slugs
  canonTier: CanonTier;
  summary: string;
  date?: string;
  coverImage?: string;
  thumbnail?: string;
}

/**
 * Artifact - Any world element (belief, system, faction, location, conflict, thread, item)
 * Consolidates multiple old content types into one flexible type
 */
export interface ArtifactFrontmatter {
  name: string;
  slug: string;
  artifactType: ArtifactType;
  description: string;
  canonTier: CanonTier;
  district?: string; // optional - for locations or district-specific artifacts
  
  // Legacy fields for backward compatibility
  status?: ThreadStatus; // for thread-type artifacts
  coreBelief?: string; // for location-type artifacts
  related?: string[]; // related artifact/character slugs
  
  coverImage?: string;
  thumbnail?: string;
}

/**
 * Union type for all frontmatter types
 */
export type AnyFrontmatter =
  | DistrictFrontmatter
  | CharacterFrontmatter
  | StoryFrontmatter
  | ArtifactFrontmatter;

/**
 * Content type discriminator
 */
export type ContentType =
  | "districts"
  | "characters"
  | "stories"
  | "artifacts";

/**
 * Generic entry wrapper
 */
export interface LoreEntry<T extends AnyFrontmatter = AnyFrontmatter> {
  frontmatter: T;
  content: string;
  filepath: string;
  type: ContentType;
}

/**
 * Typed entry aliases for convenience
 */
export type DistrictEntry = LoreEntry<DistrictFrontmatter>;
export type CharacterEntry = LoreEntry<CharacterFrontmatter>;
export type StoryEntry = LoreEntry<StoryFrontmatter>;
export type ArtifactEntry = LoreEntry<ArtifactFrontmatter>;

/**
 * Validation error types
 */
export interface ValidationError {
  type: "missing_reference" | "invalid_type" | "missing_field" | "duplicate_slug" | "invalid_enum";
  message: string;
  file: string;
  field?: string;
  reference?: string;
}
