import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { LoreEntry, LoreType } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllLoreFiles(): string[] {
  const types: LoreType[] = ['characters', 'districts', 'artifacts'];
  const files: string[] = [];
  
  for (const type of types) {
    const typeDir = path.join(CONTENT_DIR, type);
    if (fs.existsSync(typeDir)) {
      const typeFiles = fs.readdirSync(typeDir)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
        .map(file => path.join(typeDir, file));
      files.push(...typeFiles);
    }
  }
  
  return files;
}

export function parseLoreFile(filepath: string): LoreEntry {
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data as any,
    content,
    filepath,
  };
}

export function getAllLoreEntries(): LoreEntry[] {
  const files = getAllLoreFiles();
  return files.map(parseLoreFile);
}

export function getLoreEntriesByType(type: LoreType): LoreEntry[] {
  const allEntries = getAllLoreEntries();
  return allEntries.filter(entry => entry.frontmatter.type === type);
}

export function getLoreEntryBySlug(slug: string): LoreEntry | null {
  const allEntries = getAllLoreEntries();
  return allEntries.find(entry => entry.frontmatter.slug === slug) || null;
}

export function getLoreEntryByTypeAndSlug(type: LoreType, slug: string): LoreEntry | null {
  const entries = getLoreEntriesByType(type);
  return entries.find(entry => entry.frontmatter.slug === slug) || null;
}
