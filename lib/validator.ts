import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { z } from 'zod';
import { getAllCanon, CanonEntry, CanonType } from './content';

// Zod schema for canon frontmatter
export const CanonTypeSchema = z.enum(['district', 'character', 'system', 'world', 'event', 'myth']);
export const CanonTierSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export const CanonStatusSchema = z.enum(['active', 'archived']);

export const CanonFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  type: CanonTypeSchema,
  canonTier: CanonTierSchema,
  district: z.string().optional(),
  coreBelief: z.string().min(1, 'Core belief is required'),
  coverImage: z.string().min(1, 'Cover image is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  related: z.array(z.string()),
  status: CanonStatusSchema,
}).refine(
  (data) => {
    // District is required for characters
    if (data.type === 'character') {
      return data.district !== undefined && data.district.length > 0;
    }
    return true;
  },
  {
    message: 'District is required for character type',
    path: ['district'],
  }
);

export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  filepath?: string;
}

interface Tier1Lock {
  [slug: string]: string; // slug -> sha256 hash
}

const TIER1_LOCK_FILE = path.join(process.cwd(), 'content', '.tier1-lock.json');

/**
 * Calculate SHA256 hash of file contents
 */
function calculateHash(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf-8').digest('hex');
}

/**
 * Load Tier 1 lockfile
 */
function loadTier1Lock(): Tier1Lock {
  if (!fs.existsSync(TIER1_LOCK_FILE)) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(TIER1_LOCK_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading Tier 1 lockfile:', error);
    return {};
  }
}

/**
 * Save Tier 1 lockfile
 */
function saveTier1Lock(lock: Tier1Lock): void {
  const content = JSON.stringify(lock, null, 2);
  fs.writeFileSync(TIER1_LOCK_FILE, content, 'utf-8');
}

/**
 * Update Tier 1 lockfile with current Tier 1 entries
 */
export function updateTier1Lock(): void {
  const allEntries = getAllCanon();
  const lock: Tier1Lock = {};
  
  for (const entry of allEntries) {
    if (entry.frontmatter.canonTier === 1) {
      const fileContent = fs.readFileSync(entry.filepath, 'utf-8');
      lock[entry.frontmatter.slug] = calculateHash(fileContent);
    }
  }
  
  saveTier1Lock(lock);
  console.log(`✓ Updated Tier 1 lockfile with ${Object.keys(lock).length} entries`);
}

/**
 * Get the folder name for a canon type
 */
function getExpectedFolder(type: CanonType): string {
  // Map singular type to plural folder name
  const folderMap: Record<CanonType, string> = {
    district: 'districts',
    character: 'characters',
    system: 'systems',
    world: 'world',
    event: 'events',
    myth: 'myths',
  };
  return folderMap[type];
}

/**
 * Validate all canon content
 */
export function validateCanonContent(): ValidationError[] {
  const errors: ValidationError[] = [];
  const entries = getAllCanon();
  
  if (entries.length === 0) {
    errors.push({
      type: 'warning',
      message: 'No canon content found in /content directory',
    });
    return errors;
  }
  
  // Track slugs for uniqueness check
  const slugs = new Map<string, string>();
  
  // Collect all valid slugs for related link resolution
  const validSlugs = new Set<string>();
  
  // Collect all district slugs for character validation
  const districtSlugs = new Set<string>();
  
  for (const entry of entries) {
    const relativePath = path.relative(process.cwd(), entry.filepath);
    
    // Validate frontmatter schema
    const result = CanonFrontmatterSchema.safeParse(entry.frontmatter);
    
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          type: 'error',
          message: `[${relativePath}] ${issue.path.join('.')}: ${issue.message}`,
          filepath: entry.filepath,
        });
      }
      continue;
    }
    
    const frontmatter = result.data;
    
    // Check slug uniqueness
    if (slugs.has(frontmatter.slug)) {
      errors.push({
        type: 'error',
        message: `[${relativePath}] Duplicate slug "${frontmatter.slug}" (also found in ${slugs.get(frontmatter.slug)})`,
        filepath: entry.filepath,
      });
    } else {
      slugs.set(frontmatter.slug, relativePath);
      validSlugs.add(frontmatter.slug);
    }
    
    // Check if type matches directory
    const expectedFolder = getExpectedFolder(frontmatter.type);
    const actualFolder = path.basename(path.dirname(entry.filepath));
    
    if (actualFolder !== expectedFolder) {
      errors.push({
        type: 'error',
        message: `[${relativePath}] Type mismatch: frontmatter type is "${frontmatter.type}" but file is in "${actualFolder}" directory (expected "${expectedFolder}")`,
        filepath: entry.filepath,
      });
    }
    
    // Check slug matches filename
    const filename = path.basename(entry.filepath, path.extname(entry.filepath));
    if (frontmatter.slug !== filename) {
      errors.push({
        type: 'error',
        message: `[${relativePath}] Slug mismatch: frontmatter slug is "${frontmatter.slug}" but filename is "${filename}"`,
        filepath: entry.filepath,
      });
    }
    
    // Collect district slugs
    if (frontmatter.type === 'district') {
      districtSlugs.add(frontmatter.slug);
    }
  }
  
  // Second pass: validate relationships and district references
  for (const entry of entries) {
    const relativePath = path.relative(process.cwd(), entry.filepath);
    const result = CanonFrontmatterSchema.safeParse(entry.frontmatter);
    
    if (result.success) {
      const frontmatter = result.data;
      
      // Check related links exist
      for (const relatedSlug of frontmatter.related) {
        if (!validSlugs.has(relatedSlug)) {
          errors.push({
            type: 'error',
            message: `[${relativePath}] Related slug "${relatedSlug}" not found in any canon entry`,
            filepath: entry.filepath,
          });
        }
      }
      
      // Check character's district exists
      if (frontmatter.type === 'character' && frontmatter.district) {
        if (!districtSlugs.has(frontmatter.district)) {
          errors.push({
            type: 'error',
            message: `[${relativePath}] District "${frontmatter.district}" not found (character must belong to an existing district)`,
            filepath: entry.filepath,
          });
        }
      }
    }
  }
  
  // Tier 1 tamper protection
  const allowTier1Changes = process.env.CANON_ALLOW_TIER1_CHANGES === '1';
  const tier1Lock = loadTier1Lock();
  
  for (const entry of entries) {
    const relativePath = path.relative(process.cwd(), entry.filepath);
    
    if (entry.frontmatter.canonTier === 1) {
      const currentHash = calculateHash(fs.readFileSync(entry.filepath, 'utf-8'));
      const lockedHash = tier1Lock[entry.frontmatter.slug];
      
      if (lockedHash && lockedHash !== currentHash) {
        if (!allowTier1Changes) {
          errors.push({
            type: 'error',
            message: `[${relativePath}] Tier 1 canon file has been modified without authorization. Set CANON_ALLOW_TIER1_CHANGES=1 to override, then run 'npm run canon:lock' to update the lockfile.`,
            filepath: entry.filepath,
          });
        } else {
          errors.push({
            type: 'warning',
            message: `[${relativePath}] Tier 1 canon file has been modified (CANON_ALLOW_TIER1_CHANGES is set)`,
            filepath: entry.filepath,
          });
        }
      }
    }
  }
  
  return errors;
}

/**
 * Print validation results
 */
export function printValidationResults(errors: ValidationError[], mode: 'warn' | 'error'): boolean {
  const errorCount = errors.filter(e => e.type === 'error').length;
  const warningCount = errors.filter(e => e.type === 'warning').length;
  
  if (errors.length === 0) {
    console.log('✓ Canon content validation passed');
    return true;
  }
  
  console.log('\n=== Canon Content Validation Results ===\n');
  
  for (const error of errors) {
    const symbol = error.type === 'error' ? '✗' : '⚠';
    console.log(`${symbol} ${error.message}`);
  }
  
  console.log('\n========================================');
  console.log(`Errors: ${errorCount}, Warnings: ${warningCount}\n`);
  
  if (mode === 'error' && errorCount > 0) {
    return false;
  }
  
  return true;
}

/**
 * Validate canon content and throw if errors found (for build-time use)
 */
export function validateCanonOrThrow(): void {
  const errors = validateCanonContent();
  const success = printValidationResults(errors, 'error');
  
  if (!success) {
    throw new Error('Canon validation failed');
  }
}
