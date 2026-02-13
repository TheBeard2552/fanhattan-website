import path from 'path';
import { LoreFrontmatterSchema } from './schema';
import { getAllLoreEntries } from './fs';
import { ValidationError } from './types';

export function validateLoreContent(): ValidationError[] {
  const errors: ValidationError[] = [];
  const entries = getAllLoreEntries();
  
  if (entries.length === 0) {
    errors.push({
      type: 'warning',
      message: 'No lore content found in /content directory',
    });
    return errors;
  }
  
  // Track slugs for uniqueness check
  const slugs = new Map<string, string>();
  
  // Collect all valid slugs for related link resolution
  const validSlugs = new Set<string>();
  
  for (const entry of entries) {
    const relativePath = path.relative(process.cwd(), entry.filepath);
    
    // Validate frontmatter schema
    const result = LoreFrontmatterSchema.safeParse(entry.frontmatter);
    
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
    const expectedType = path.basename(path.dirname(entry.filepath));
    if (frontmatter.type !== expectedType) {
      errors.push({
        type: 'error',
        message: `[${relativePath}] Type mismatch: frontmatter type is "${frontmatter.type}" but file is in "${expectedType}" directory`,
        filepath: entry.filepath,
      });
    }
  }
  
  // Check related links
  for (const entry of entries) {
    const relativePath = path.relative(process.cwd(), entry.filepath);
    const result = LoreFrontmatterSchema.safeParse(entry.frontmatter);
    
    if (result.success) {
      const frontmatter = result.data;
      for (const relatedSlug of frontmatter.related) {
        if (!validSlugs.has(relatedSlug)) {
          errors.push({
            type: 'warning',
            message: `[${relativePath}] Related slug "${relatedSlug}" not found in any lore entry`,
            filepath: entry.filepath,
          });
        }
      }
    }
  }
  
  return errors;
}

export function printValidationResults(errors: ValidationError[], mode: 'warn' | 'error'): boolean {
  const errorCount = errors.filter(e => e.type === 'error').length;
  const warningCount = errors.filter(e => e.type === 'warning').length;
  
  if (errors.length === 0) {
    console.log('✓ Lore content validation passed');
    return true;
  }
  
  console.log('\n=== Lore Content Validation Results ===\n');
  
  for (const error of errors) {
    const symbol = error.type === 'error' ? '✗' : '⚠';
    console.log(`${symbol} ${error.message}`);
  }
  
  console.log('\n=======================================');
  console.log(`Errors: ${errorCount}, Warnings: ${warningCount}\n`);
  
  if (mode === 'error' && errorCount > 0) {
    return false;
  }
  
  return true;
}
