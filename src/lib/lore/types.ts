/**
 * Fanhattan Relational Lore Engine - Type Definitions
 * 
 * This defines the complete type system for the lore engine.
 * All relationships are typed and validated at build time.
 */

export type CanonTier = "tier-1" | "tier-2" | "tier-3";
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
  beliefs: string[]; // belief slugs
  factions: string[]; // faction slugs
  canonTier: CanonTier;
  coverImage?: string;
  thumbnail?: string;
}

/**
 * Story - A narrative event or chapter in Fanhattan
 */
export interface StoryFrontmatter {
  title: string;
  slug: string;
  districts: string[]; // district slugs
  characters: string[]; // character slugs
  beliefs: string[]; // belief slugs
  conflicts: string[]; // conflict slugs
  factions: string[]; // faction slugs
  systems: string[]; // system slugs
  threads: string[]; // thread slugs
  canonTier: CanonTier;
  summary: string;
  date?: string;
  coverImage?: string;
  thumbnail?: string;
}

/**
 * Belief - A core ideological principle
 */
export interface BeliefFrontmatter {
  name: string;
  slug: string;
  description: string;
  canonTier: CanonTier;
}

/**
 * Conflict - A tension or struggle
 */
export interface ConflictFrontmatter {
  name: string;
  slug: string;
  description: string;
  canonTier: CanonTier;
}

/**
 * Thread - An ongoing narrative thread
 */
export interface ThreadFrontmatter {
  name: string;
  slug: string;
  status: ThreadStatus;
  canonTier: CanonTier;
  description?: string;
}

/**
 * Faction - An organized group
 */
export interface FactionFrontmatter {
  name: string;
  slug: string;
  description: string;
  canonTier: CanonTier;
}

/**
 * System - A mechanic or rule of the world
 */
export interface SystemFrontmatter {
  name: string;
  slug: string;
  description: string;
  canonTier: CanonTier;
}

/**
 * Union type for all frontmatter types
 */
export type AnyFrontmatter =
  | DistrictFrontmatter
  | CharacterFrontmatter
  | StoryFrontmatter
  | BeliefFrontmatter
  | ConflictFrontmatter
  | ThreadFrontmatter
  | FactionFrontmatter
  | SystemFrontmatter;

/**
 * Content type discriminator
 */
export type ContentType =
  | "districts"
  | "characters"
  | "stories"
  | "beliefs"
  | "conflicts"
  | "threads"
  | "factions"
  | "systems";

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
export type BeliefEntry = LoreEntry<BeliefFrontmatter>;
export type ConflictEntry = LoreEntry<ConflictFrontmatter>;
export type ThreadEntry = LoreEntry<ThreadFrontmatter>;
export type FactionEntry = LoreEntry<FactionFrontmatter>;
export type SystemEntry = LoreEntry<SystemFrontmatter>;

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
