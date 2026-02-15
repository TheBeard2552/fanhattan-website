/**
 * Fanhattan Relational Lore Engine - Content Loader
 * 
 * Reads, parses, and validates MDX content files.
 * Enforces strict typed relationships.
 * 
 * Four Core Content Types:
 * 1. Districts - Geographic/cultural regions
 * 2. Characters - Individuals
 * 3. Stories - Narratives (standalone or episodic)
 * 4. Artifacts - World elements (beliefs, systems, factions, locations, etc.)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  ContentType,
  LoreEntry,
  AnyFrontmatter,
  DistrictEntry,
  CharacterEntry,
  StoryEntry,
  ArtifactEntry,
  ValidationError,
  DistrictFrontmatter,
  CharacterFrontmatter,
  StoryFrontmatter,
  ArtifactFrontmatter,
  CanonTier,
  StoryType,
  ArtifactType,
  ThreadStatus,
} from './types';

const VALID_CANON_TIERS: CanonTier[] = ['tier-1', 'tier-2', 'tier-3'];
const VALID_STORY_TYPES: StoryType[] = ['standalone', 'episodic'];
const VALID_ARTIFACT_TYPES: ArtifactType[] = ['belief', 'system', 'faction', 'location', 'conflict', 'thread', 'item'];
const VALID_THREAD_STATUSES: ThreadStatus[] = ['active', 'dormant', 'resolved'];

const CONTENT_DIR = path.join(process.cwd(), 'content');

const CONTENT_TYPES: ContentType[] = [
  'districts',
  'characters',
  'stories',
  'artifacts',
];

// Legacy folders that map to artifacts
const LEGACY_ARTIFACT_FOLDERS = [
  'beliefs',
  'conflicts',
  'threads',
  'factions',
  'systems',
  'world',
];

/**
 * Get all MDX files for a specific content type
 * For artifacts, this includes both the /artifacts folder and legacy folders
 */
function getFilesForType(type: ContentType): string[] {
  const files: string[] = [];
  
  if (type === 'artifacts') {
    // Check main artifacts folder
    const artifactsDir = path.join(CONTENT_DIR, 'artifacts');
    if (fs.existsSync(artifactsDir)) {
      const artifactFiles = fs.readdirSync(artifactsDir)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => path.join(artifactsDir, file));
      files.push(...artifactFiles);
    }
    
    // Check legacy folders and include them as artifacts
    for (const legacyFolder of LEGACY_ARTIFACT_FOLDERS) {
      const legacyDir = path.join(CONTENT_DIR, legacyFolder);
      if (fs.existsSync(legacyDir)) {
        const legacyFiles = fs.readdirSync(legacyDir)
          .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
          .map(file => path.join(legacyDir, file));
        files.push(...legacyFiles);
      }
    }
  } else {
    // Standard content types
    const typeDir = path.join(CONTENT_DIR, type);
    if (fs.existsSync(typeDir)) {
      const typeFiles = fs.readdirSync(typeDir)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => path.join(typeDir, file));
      files.push(...typeFiles);
    }
  }
  
  return files;
}

/**
 * Normalize legacy frontmatter values (e.g. numeric canonTier, coreBelief as description)
 */
function normalizeFrontmatter(data: Record<string, unknown>, type: ContentType): Record<string, unknown> {
  const normalized = { ...data };

  // Normalize canonTier: 1/2/3 or "1"/"2"/"3" -> "tier-1"/"tier-2"/"tier-3"
  if (normalized.canonTier !== undefined) {
    const t = normalized.canonTier;
    if (t === 1 || t === '1') normalized.canonTier = 'tier-1';
    else if (t === 2 || t === '2') normalized.canonTier = 'tier-2';
    else if (t === 3 || t === '3') normalized.canonTier = 'tier-3';
  }

  // For artifacts (e.g. legacy world locations): use coreBelief as description fallback
  if (type === 'artifacts' && !normalized.description && normalized.coreBelief) {
    normalized.description = normalized.coreBelief;
  }

  return normalized;
}

/**
 * Parse a single MDX file into a LoreEntry
 */
function parseFile<T extends AnyFrontmatter>(
  filepath: string,
  type: ContentType
): LoreEntry<T> {
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(fileContent);
  const normalized = normalizeFrontmatter(data as Record<string, unknown>, type);

  return {
    frontmatter: normalized as T,
    content,
    filepath,
    type,
  };
}

/**
 * Load all entries of a specific type
 */
export function loadEntriesByType<T extends AnyFrontmatter>(
  type: ContentType
): LoreEntry<T>[] {
  const files = getFilesForType(type);
  return files.map(file => parseFile<T>(file, type));
}

/**
 * Load all districts
 */
export function loadDistricts(): DistrictEntry[] {
  return loadEntriesByType<DistrictFrontmatter>('districts');
}

/**
 * Load all characters
 */
export function loadCharacters(): CharacterEntry[] {
  return loadEntriesByType<CharacterFrontmatter>('characters');
}

/**
 * Load all stories
 */
export function loadStories(): StoryEntry[] {
  return loadEntriesByType<StoryFrontmatter>('stories');
}

/**
 * Load all artifacts
 */
export function loadArtifacts(): ArtifactEntry[] {
  return loadEntriesByType<ArtifactFrontmatter>('artifacts');
}

/**
 * Load all content across all types
 */
export function loadAllContent(): LoreEntry[] {
  const allEntries: LoreEntry[] = [];
  
  for (const type of CONTENT_TYPES) {
    const entries = loadEntriesByType(type);
    allEntries.push(...entries);
  }
  
  return allEntries;
}

/**
 * Create a slug-to-entry index for fast lookups
 */
export function createSlugIndex(entries: LoreEntry[]): Map<string, LoreEntry> {
  const index = new Map<string, LoreEntry>();
  
  for (const entry of entries) {
    index.set(entry.frontmatter.slug, entry);
  }
  
  return index;
}

/**
 * Validate enum values (canonTier, storyType, artifactType, thread status)
 */
function validateEnumValues(entry: LoreEntry): ValidationError[] {
  const errors: ValidationError[] = [];
  const { frontmatter, filepath, type } = entry;

  if (frontmatter.canonTier && !VALID_CANON_TIERS.includes(frontmatter.canonTier as CanonTier)) {
    errors.push({
      type: 'invalid_enum',
      message: `Invalid canonTier "${frontmatter.canonTier}". Must be one of: ${VALID_CANON_TIERS.join(', ')}`,
      file: filepath,
      field: 'canonTier',
    });
  }

  if (type === 'stories') {
    const s = frontmatter as StoryFrontmatter;
    if (s.storyType && !VALID_STORY_TYPES.includes(s.storyType)) {
      errors.push({
        type: 'invalid_enum',
        message: `Invalid storyType "${s.storyType}". Must be one of: ${VALID_STORY_TYPES.join(', ')}`,
        file: filepath,
        field: 'storyType',
      });
    }
  }

  if (type === 'artifacts') {
    const a = frontmatter as ArtifactFrontmatter;
    if (a.artifactType && !VALID_ARTIFACT_TYPES.includes(a.artifactType)) {
      errors.push({
        type: 'invalid_enum',
        message: `Invalid artifactType "${a.artifactType}". Must be one of: ${VALID_ARTIFACT_TYPES.join(', ')}`,
        file: filepath,
        field: 'artifactType',
      });
    }
    if (a.status && !VALID_THREAD_STATUSES.includes(a.status)) {
      errors.push({
        type: 'invalid_enum',
        message: `Invalid status "${a.status}". Must be one of: ${VALID_THREAD_STATUSES.join(', ')}`,
        file: filepath,
        field: 'status',
      });
    }
  }

  return errors;
}

/**
 * Validate slug uniqueness across all content
 */
function validateSlugUniqueness(entries: LoreEntry[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const slugToFiles = new Map<string, { file: string; type: ContentType }>();

  for (const entry of entries) {
    const slug = entry.frontmatter.slug;
    if (!slug) continue;

    const existing = slugToFiles.get(slug);
    if (existing) {
      errors.push({
        type: 'duplicate_slug',
        message: `Duplicate slug "${slug}" (also used in ${existing.file}). Slugs must be unique across all content types.`,
        file: entry.filepath,
        field: 'slug',
        reference: slug,
      });
    } else {
      slugToFiles.set(slug, { file: entry.filepath, type: entry.type });
    }
  }

  return errors;
}

/**
 * Validate required fields for each content type
 */
function validateRequiredFields(entry: LoreEntry): ValidationError[] {
  const errors: ValidationError[] = [];
  const { frontmatter, filepath, type } = entry;
  
  // Common fields
  if (!frontmatter.slug) {
    errors.push({
      type: 'missing_field',
      message: 'Missing required field: slug',
      file: filepath,
      field: 'slug',
    });
  }
  
  if (!frontmatter.canonTier) {
    errors.push({
      type: 'missing_field',
      message: 'Missing required field: canonTier',
      file: filepath,
      field: 'canonTier',
    });
  }
  
  // Type-specific validation (including array type checks)
  switch (type) {
    case 'districts': {
      const d = frontmatter as DistrictFrontmatter;
      if (!d.name) errors.push({ type: 'missing_field', message: 'Missing required field: name', file: filepath, field: 'name' });
      if (!d.coreBelief) errors.push({ type: 'missing_field', message: 'Missing required field: coreBelief', file: filepath, field: 'coreBelief' });
      if (!d.rivalDistricts) errors.push({ type: 'missing_field', message: 'Missing required field: rivalDistricts', file: filepath, field: 'rivalDistricts' });
      else if (!Array.isArray(d.rivalDistricts)) errors.push({ type: 'invalid_type', message: 'Field rivalDistricts must be an array', file: filepath, field: 'rivalDistricts' });
      break;
    }
    case 'characters': {
      const c = frontmatter as CharacterFrontmatter;
      if (!c.name) errors.push({ type: 'missing_field', message: 'Missing required field: name', file: filepath, field: 'name' });
      if (!c.district) errors.push({ type: 'missing_field', message: 'Missing required field: district', file: filepath, field: 'district' });
      if (!c.role) errors.push({ type: 'missing_field', message: 'Missing required field: role', file: filepath, field: 'role' });
      if (!c.reputation) errors.push({ type: 'missing_field', message: 'Missing required field: reputation', file: filepath, field: 'reputation' });
      if (!c.privateTruth) errors.push({ type: 'missing_field', message: 'Missing required field: privateTruth', file: filepath, field: 'privateTruth' });
      if (!c.artifacts) errors.push({ type: 'missing_field', message: 'Missing required field: artifacts', file: filepath, field: 'artifacts' });
      else if (!Array.isArray(c.artifacts)) errors.push({ type: 'invalid_type', message: 'Field artifacts must be an array', file: filepath, field: 'artifacts' });
      break;
    }
    case 'stories': {
      const s = frontmatter as StoryFrontmatter;
      if (!s.title) errors.push({ type: 'missing_field', message: 'Missing required field: title', file: filepath, field: 'title' });
      if (!s.summary) errors.push({ type: 'missing_field', message: 'Missing required field: summary', file: filepath, field: 'summary' });
      if (!s.storyType) errors.push({ type: 'missing_field', message: 'Missing required field: storyType', file: filepath, field: 'storyType' });
      
      // Episodic stories require episodeNumber and seriesSlug
      if (s.storyType === 'episodic') {
        if (s.episodeNumber === undefined) errors.push({ type: 'missing_field', message: 'Episodic stories require episodeNumber', file: filepath, field: 'episodeNumber' });
        if (!s.seriesSlug) errors.push({ type: 'missing_field', message: 'Episodic stories require seriesSlug', file: filepath, field: 'seriesSlug' });
      }
      
      const storyArrayFields = ['districts', 'characters', 'artifacts'] as const;
      for (const field of storyArrayFields) {
        const val = s[field];
        if (!val) errors.push({ type: 'missing_field', message: `Missing required field: ${field}`, file: filepath, field });
        else if (!Array.isArray(val)) errors.push({ type: 'invalid_type', message: `Field ${field} must be an array`, file: filepath, field });
      }
      break;
    }
    case 'artifacts': {
      const a = frontmatter as ArtifactFrontmatter;
      if (!a.name) errors.push({ type: 'missing_field', message: 'Missing required field: name', file: filepath, field: 'name' });
      if (!a.artifactType) errors.push({ type: 'missing_field', message: 'Missing required field: artifactType', file: filepath, field: 'artifactType' });
      if (!a.description) errors.push({ type: 'missing_field', message: 'Missing required field: description', file: filepath, field: 'description' });
      break;
    }
  }
  
  return errors;
}

/**
 * Validate all references in an entry (type-aware: references must point to correct content type)
 */
function validateReferences(
  entry: LoreEntry,
  slugIndex: Map<string, LoreEntry>
): ValidationError[] {
  const errors: ValidationError[] = [];
  const { frontmatter, filepath, type } = entry;

  const checkRefs = (
    refs: string[] | undefined,
    fieldName: string,
    expectedType: ContentType
  ) => {
    const arr = Array.isArray(refs) ? refs : [];
    for (const ref of arr) {
      const target = slugIndex.get(ref);
      if (!target) {
        errors.push({
          type: 'missing_reference',
          message: `Reference "${ref}" in field "${fieldName}" does not exist`,
          file: filepath,
          field: fieldName,
          reference: ref,
        });
      } else if (target.type !== expectedType) {
        errors.push({
          type: 'invalid_type',
          message: `Reference "${ref}" in field "${fieldName}" must point to ${expectedType}, but points to ${target.type}`,
          file: filepath,
          field: fieldName,
          reference: ref,
        });
      }
    }
  };

  const checkSingleRef = (ref: string | undefined, fieldName: string, expectedType: ContentType) => {
    if (!ref) return;
    const target = slugIndex.get(ref);
    if (!target) {
      errors.push({
        type: 'missing_reference',
        message: `Reference "${ref}" in field "${fieldName}" does not exist`,
        file: filepath,
        field: fieldName,
        reference: ref,
      });
    } else if (target.type !== expectedType) {
      errors.push({
        type: 'invalid_type',
        message: `Reference "${ref}" in field "${fieldName}" must point to ${expectedType}, but points to ${target.type}`,
        file: filepath,
        field: fieldName,
        reference: ref,
      });
    }
  };

  switch (type) {
    case 'districts': {
      const d = frontmatter as DistrictFrontmatter;
      checkRefs(d.rivalDistricts, 'rivalDistricts', 'districts');
      break;
    }
    case 'characters': {
      const c = frontmatter as CharacterFrontmatter;
      checkSingleRef(c.district, 'district', 'districts');
      checkRefs(c.artifacts, 'artifacts', 'artifacts');
      break;
    }
    case 'stories': {
      const s = frontmatter as StoryFrontmatter;
      checkRefs(s.districts, 'districts', 'districts');
      checkRefs(s.characters, 'characters', 'characters');
      checkRefs(s.artifacts, 'artifacts', 'artifacts');
      break;
    }
    case 'artifacts': {
      const a = frontmatter as ArtifactFrontmatter;
      // Optional district reference for location-type artifacts
      if (a.district) {
        checkSingleRef(a.district, 'district', 'districts');
      }
      // Optional related artifacts/characters
      if (a.related) {
        for (const ref of a.related) {
          const target = slugIndex.get(ref);
          if (!target) {
            errors.push({
              type: 'missing_reference',
              message: `Reference "${ref}" in field "related" does not exist`,
              file: filepath,
              field: 'related',
              reference: ref,
            });
          }
          // Related can be any content type, so we don't validate type
        }
      }
      break;
    }
  }

  return errors;
}

/**
 * Validate all content - throws error if validation fails
 */
export function validateAllContent(entries: LoreEntry[]): void {
  const allErrors: ValidationError[] = [];

  // Pass 1: validate required fields and enum values
  for (const entry of entries) {
    allErrors.push(...validateRequiredFields(entry));
    allErrors.push(...validateEnumValues(entry));
  }

  // Pass 2: validate slug uniqueness (before reference validation)
  allErrors.push(...validateSlugUniqueness(entries));

  // Pass 3: validate references (type-aware)
  const slugIndex = createSlugIndex(entries);
  for (const entry of entries) {
    allErrors.push(...validateReferences(entry, slugIndex));
  }
  
  if (allErrors.length > 0) {
    const errorMessage = [
      '❌ CONTENT VALIDATION FAILED',
      '═══════════════════════════════════════════════',
      '',
      ...allErrors.map(err => {
        const relPath = err.file.replace(process.cwd(), '');
        return `📄 ${relPath}\n   ⚠️  ${err.message}`;
      }),
      '',
      `Total errors: ${allErrors.length}`,
      '',
      '🚫 Build cannot continue with broken references.',
    ].join('\n');
    
    throw new Error(errorMessage);
  }
}

/**
 * Load and validate all content - use this in build processes
 */
export function loadAndValidateAllContent(): LoreEntry[] {
  const entries = loadAllContent();
  validateAllContent(entries);
  return entries;
}
