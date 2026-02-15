import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type CanonType = 'district' | 'character' | 'system' | 'world' | 'event' | 'myth';
export type CanonTier = 1 | 2 | 3;
export type CanonStatus = 'active' | 'archived';

export interface CanonFrontmatter {
  title: string;
  slug: string;
  type: CanonType;
  canonTier: CanonTier;
  district?: string;
  coreBelief: string;
  coverImage: string;
  thumbnail: string;
  related: string[];
  status: CanonStatus;
}

export interface CanonEntry {
  frontmatter: CanonFrontmatter;
  content: string;
  filepath: string;
  sections: Map<string, string>;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Folder names under /content (plural in most cases). This is intentionally
// distinct from CanonType, which is the singular frontmatter "type" value.
const CANON_TYPES: string[] = ['world', 'districts', 'characters', 'systems', 'events', 'myths'];

/**
 * Get all markdown files from a specific content type folder
 */
function getFilesForType(type: string): string[] {
  const typeDir = path.join(CONTENT_DIR, type);
  
  if (!fs.existsSync(typeDir)) {
    return [];
  }
  
  return fs.readdirSync(typeDir)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => path.join(typeDir, file));
}

/**
 * Extract sections from markdown content by H2 headings
 */
function extractSections(content: string): Map<string, string> {
  const sections = new Map<string, string>();
  const lines = content.split('\n');
  
  let currentSection: string | null = null;
  let currentContent: string[] = [];
  
  for (const line of lines) {
    // Check if line is an H2 heading (## Heading)
    const h2Match = line.match(/^##\s+(.+)$/);
    
    if (h2Match) {
      // Save previous section if exists
      if (currentSection) {
        sections.set(currentSection, currentContent.join('\n').trim());
      }
      
      // Start new section
      currentSection = h2Match[1].trim();
      currentContent = [];
    } else if (currentSection) {
      // Add line to current section
      currentContent.push(line);
    }
  }
  
  // Save last section
  if (currentSection) {
    sections.set(currentSection, currentContent.join('\n').trim());
  }
  
  return sections;
}

/**
 * Parse a single markdown file into a CanonEntry
 */
function parseCanonFile(filepath: string): CanonEntry {
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data as CanonFrontmatter,
    content,
    filepath,
    sections: extractSections(content),
  };
}

/**
 * Get all canon entries across all types
 */
export function getAllCanon(): CanonEntry[] {
  const entries: CanonEntry[] = [];
  
  for (const type of CANON_TYPES) {
    const files = getFilesForType(type);
    for (const file of files) {
      try {
        entries.push(parseCanonFile(file));
      } catch (error) {
        console.error(`Error parsing ${file}:`, error);
      }
    }
  }
  
  return entries;
}

/**
 * Get canon entries by type (e.g., 'districts', 'characters')
 * Note: type parameter is the plural folder name
 */
export function getCanonByType(type: string): CanonEntry[] {
  const files = getFilesForType(type);
  return files.map(parseCanonFile);
}

/**
 * Get a single canon entry by slug (searches all types)
 */
export function getCanonBySlug(slug: string): CanonEntry | null {
  const allEntries = getAllCanon();
  return allEntries.find(entry => entry.frontmatter.slug === slug) || null;
}

/**
 * Get canon entries by their canon type (from frontmatter, singular form)
 */
export function getCanonByCanonType(canonType: CanonType): CanonEntry[] {
  const allEntries = getAllCanon();
  return allEntries.filter(entry => entry.frontmatter.type === canonType);
}

/**
 * Get all slugs for static params generation
 */
export function getStaticSlugs(): string[] {
  const allEntries = getAllCanon();
  return allEntries.map(entry => entry.frontmatter.slug);
}

/**
 * Get related entries for a given canon entry
 */
export function getRelatedEntries(entry: CanonEntry): CanonEntry[] {
  if (!entry.frontmatter.related || entry.frontmatter.related.length === 0) {
    return [];
  }
  
  const allEntries = getAllCanon();
  const related: CanonEntry[] = [];
  
  for (const relatedSlug of entry.frontmatter.related) {
    const relatedEntry = allEntries.find(e => e.frontmatter.slug === relatedSlug);
    if (relatedEntry) {
      related.push(relatedEntry);
    }
  }
  
  return related;
}

/**
 * Get all characters that belong to a specific district
 */
export function getCharactersByDistrict(districtSlug: string): CanonEntry[] {
  const allCharacters = getCanonByCanonType('character');
  return allCharacters.filter(char => char.frontmatter.district === districtSlug);
}

/**
 * Get a district entry by slug
 */
export function getDistrictBySlug(slug: string): CanonEntry | null {
  const districts = getCanonByCanonType('district');
  return districts.find(d => d.frontmatter.slug === slug) || null;
}

/**
 * Get content for a specific section from an entry
 */
export function getSection(entry: CanonEntry, sectionName: string): string | null {
  return entry.sections.get(sectionName) || null;
}

/**
 * Check if a slug exists in the canon
 */
export function slugExists(slug: string): boolean {
  return getCanonBySlug(slug) !== null;
}
