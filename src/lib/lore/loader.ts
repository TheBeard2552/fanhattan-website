/**
 * Fanhattan Relational Lore Engine - Content Loader
 * 
 * Reads, parses, and validates MDX content files.
 * Enforces strict typed relationships.
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
  BeliefEntry,
  ConflictEntry,
  ThreadEntry,
  FactionEntry,
  SystemEntry,
  ValidationError,
  DistrictFrontmatter,
  CharacterFrontmatter,
  StoryFrontmatter,
  BeliefFrontmatter,
  ConflictFrontmatter,
  ThreadFrontmatter,
  FactionFrontmatter,
  SystemFrontmatter,
  CanonTier,
  ThreadStatus,
} from './types';

const VALID_CANON_TIERS: CanonTier[] = ['tier-1', 'tier-2', 'tier-3'];
const VALID_THREAD_STATUSES: ThreadStatus[] = ['active', 'dormant', 'resolved'];

const CONTENT_DIR = path.join(process.cwd(), 'content');

const CONTENT_TYPES: ContentType[] = [
  'districts',
  'characters',
  'stories',
  'beliefs',
  'conflicts',
  'threads',
  'factions',
  'systems',
];

/**
 * Get all MDX files for a specific content type
 */
function getFilesForType(type: ContentType): string[] {
  const typeDir = path.join(CONTENT_DIR, type);
  
  if (!fs.existsSync(typeDir)) {
    return [];
  }
  
  return fs.readdirSync(typeDir)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => path.join(typeDir, file));
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
  
  return {
    frontmatter: data as T,
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
 * Load all beliefs
 */
export function loadBeliefs(): BeliefEntry[] {
  return loadEntriesByType<BeliefFrontmatter>('beliefs');
}

/**
 * Load all conflicts
 */
export function loadConflicts(): ConflictEntry[] {
  return loadEntriesByType<ConflictFrontmatter>('conflicts');
}

/**
 * Load all threads
 */
export function loadThreads(): ThreadEntry[] {
  return loadEntriesByType<ThreadFrontmatter>('threads');
}

/**
 * Load all factions
 */
export function loadFactions(): FactionEntry[] {
  return loadEntriesByType<FactionFrontmatter>('factions');
}

/**
 * Load all systems
 */
export function loadSystems(): SystemEntry[] {
  return loadEntriesByType<SystemFrontmatter>('systems');
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
 * Validate enum values (canonTier, thread status)
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

  if (type === 'threads') {
    const t = frontmatter as ThreadFrontmatter;
    if (t.status && !VALID_THREAD_STATUSES.includes(t.status)) {
      errors.push({
        type: 'invalid_enum',
        message: `Invalid thread status "${t.status}". Must be one of: ${VALID_THREAD_STATUSES.join(', ')}`,
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
      if (!c.beliefs) errors.push({ type: 'missing_field', message: 'Missing required field: beliefs', file: filepath, field: 'beliefs' });
      else if (!Array.isArray(c.beliefs)) errors.push({ type: 'invalid_type', message: 'Field beliefs must be an array', file: filepath, field: 'beliefs' });
      if (!c.factions) errors.push({ type: 'missing_field', message: 'Missing required field: factions', file: filepath, field: 'factions' });
      else if (!Array.isArray(c.factions)) errors.push({ type: 'invalid_type', message: 'Field factions must be an array', file: filepath, field: 'factions' });
      break;
    }
    case 'stories': {
      const s = frontmatter as StoryFrontmatter;
      if (!s.title) errors.push({ type: 'missing_field', message: 'Missing required field: title', file: filepath, field: 'title' });
      if (!s.summary) errors.push({ type: 'missing_field', message: 'Missing required field: summary', file: filepath, field: 'summary' });
      const storyArrayFields = ['districts', 'characters', 'beliefs', 'conflicts', 'factions', 'systems', 'threads'] as const;
      for (const field of storyArrayFields) {
        const val = s[field];
        if (!val) errors.push({ type: 'missing_field', message: `Missing required field: ${field}`, file: filepath, field });
        else if (!Array.isArray(val)) errors.push({ type: 'invalid_type', message: `Field ${field} must be an array`, file: filepath, field });
      }
      break;
    }
    case 'beliefs':
    case 'conflicts':
    case 'threads':
    case 'factions':
    case 'systems': {
      const named = frontmatter as { name?: string; description?: string };
      if (!named.name) errors.push({ type: 'missing_field', message: 'Missing required field: name', file: filepath, field: 'name' });
      if (!named.description && type !== 'threads') {
        errors.push({ type: 'missing_field', message: 'Missing required field: description', file: filepath, field: 'description' });
      }
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
      checkRefs(c.beliefs, 'beliefs', 'beliefs');
      checkRefs(c.factions, 'factions', 'factions');
      break;
    }
    case 'stories': {
      const s = frontmatter as StoryFrontmatter;
      checkRefs(s.districts, 'districts', 'districts');
      checkRefs(s.characters, 'characters', 'characters');
      checkRefs(s.beliefs, 'beliefs', 'beliefs');
      checkRefs(s.conflicts, 'conflicts', 'conflicts');
      checkRefs(s.factions, 'factions', 'factions');
      checkRefs(s.systems, 'systems', 'systems');
      checkRefs(s.threads, 'threads', 'threads');
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
