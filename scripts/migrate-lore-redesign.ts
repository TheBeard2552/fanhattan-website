#!/usr/bin/env ts-node

/**
 * Lore System Migration Script
 * 
 * Migrates content from the old 8-type system to the new 4-type system:
 * - Characters: merge beliefs + factions → artifacts
 * - Stories: merge multiple arrays → artifacts, add storyType
 * - Artifacts: add artifactType to beliefs/factions/systems/conflicts/threads/world
 * 
 * Creates backups before making changes.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BACKUP_DIR = path.join(process.cwd(), 'content-backup');

interface MigrationStats {
  characters: { processed: number; updated: number };
  stories: { processed: number; updated: number };
  artifacts: { processed: number; updated: number };
  errors: string[];
}

const stats: MigrationStats = {
  characters: { processed: 0, updated: 0 },
  stories: { processed: 0, updated: 0 },
  artifacts: { processed: 0, updated: 0 },
  errors: [],
};

/**
 * Create backup of content directory
 */
function createBackup(): void {
  console.log('📦 Creating backup...');
  
  if (fs.existsSync(BACKUP_DIR)) {
    console.log('   Removing old backup...');
    fs.rmSync(BACKUP_DIR, { recursive: true });
  }
  
  fs.cpSync(CONTENT_DIR, BACKUP_DIR, { recursive: true });
  console.log(`   ✅ Backup created at: ${BACKUP_DIR}\n`);
}

/**
 * Get all .md and .mdx files in a directory
 */
function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => path.join(dir, file));
}

/**
 * Migrate character files
 * Merge beliefs + factions → artifacts
 */
function migrateCharacters(): void {
  console.log('👤 Migrating characters...');
  
  const charDir = path.join(CONTENT_DIR, 'characters');
  const files = getMarkdownFiles(charDir);
  
  for (const filepath of files) {
    stats.characters.processed++;
    
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const { data, content: body } = matter(content);
      
      let updated = false;
      
      // Merge beliefs and factions into artifacts
      if (data.beliefs || data.factions) {
        const artifacts = [
          ...(Array.isArray(data.beliefs) ? data.beliefs : []),
          ...(Array.isArray(data.factions) ? data.factions : []),
        ];
        
        data.artifacts = artifacts;
        delete data.beliefs;
        delete data.factions;
        updated = true;
      }
      
      if (updated) {
        const newContent = matter.stringify(body, data);
        fs.writeFileSync(filepath, newContent);
        stats.characters.updated++;
        console.log(`   ✅ ${path.basename(filepath)}`);
      }
    } catch (error) {
      const err = error as Error;
      stats.errors.push(`Character ${filepath}: ${err.message}`);
      console.log(`   ❌ ${path.basename(filepath)}: ${err.message}`);
    }
  }
  
  console.log(`   Processed: ${stats.characters.processed}, Updated: ${stats.characters.updated}\n`);
}

/**
 * Migrate story files
 * Merge beliefs/conflicts/factions/systems/threads → artifacts
 * Add storyType: "standalone"
 */
function migrateStories(): void {
  console.log('📖 Migrating stories...');
  
  const storiesDir = path.join(CONTENT_DIR, 'stories');
  const files = getMarkdownFiles(storiesDir);
  
  for (const filepath of files) {
    stats.stories.processed++;
    
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const { data, content: body } = matter(content);
      
      let updated = false;
      
      // Merge all artifact arrays
      const artifactFields = ['beliefs', 'conflicts', 'factions', 'systems', 'threads'];
      let hasArtifactFields = false;
      
      for (const field of artifactFields) {
        if (data[field]) {
          hasArtifactFields = true;
          break;
        }
      }
      
      if (hasArtifactFields) {
        const artifacts = [];
        
        for (const field of artifactFields) {
          if (Array.isArray(data[field])) {
            artifacts.push(...data[field]);
          }
          delete data[field];
        }
        
        data.artifacts = artifacts;
        updated = true;
      }
      
      // Add storyType if missing
      if (!data.storyType) {
        data.storyType = 'standalone';
        updated = true;
      }
      
      if (updated) {
        const newContent = matter.stringify(body, data);
        fs.writeFileSync(filepath, newContent);
        stats.stories.updated++;
        console.log(`   ✅ ${path.basename(filepath)}`);
      }
    } catch (error) {
      const err = error as Error;
      stats.errors.push(`Story ${filepath}: ${err.message}`);
      console.log(`   ❌ ${path.basename(filepath)}: ${err.message}`);
    }
  }
  
  console.log(`   Processed: ${stats.stories.processed}, Updated: ${stats.stories.updated}\n`);
}

/**
 * Migrate artifact files
 * Add artifactType to beliefs/factions/systems/conflicts/threads/world
 */
function migrateArtifacts(): void {
  console.log('🏺 Migrating artifacts...');
  
  const artifactMappings: Record<string, string> = {
    beliefs: 'belief',
    factions: 'faction',
    systems: 'system',
    conflicts: 'conflict',
    threads: 'thread',
    world: 'location',
  };
  
  for (const [folder, artifactType] of Object.entries(artifactMappings)) {
    const dir = path.join(CONTENT_DIR, folder);
    const files = getMarkdownFiles(dir);
    
    if (files.length === 0) continue;
    
    console.log(`   Processing ${folder}/ (${artifactType})...`);
    
    for (const filepath of files) {
      stats.artifacts.processed++;
      
      try {
        const content = fs.readFileSync(filepath, 'utf-8');
        const { data, content: body } = matter(content);
        
        let updated = false;
        
        // Add artifactType if missing
        if (!data.artifactType) {
          data.artifactType = artifactType;
          updated = true;
        }
        
        // Normalize title → name for world locations
        if (folder === 'world' && data.title && !data.name) {
          data.name = data.title;
          delete data.title;
          updated = true;
        }
        
        // Remove old "type" field from world locations
        if (folder === 'world' && data.type) {
          delete data.type;
          updated = true;
        }
        
        if (updated) {
          const newContent = matter.stringify(body, data);
          fs.writeFileSync(filepath, newContent);
          stats.artifacts.updated++;
          console.log(`      ✅ ${path.basename(filepath)}`);
        }
      } catch (error) {
        const err = error as Error;
        stats.errors.push(`Artifact ${filepath}: ${err.message}`);
        console.log(`      ❌ ${path.basename(filepath)}: ${err.message}`);
      }
    }
  }
  
  console.log(`   Processed: ${stats.artifacts.processed}, Updated: ${stats.artifacts.updated}\n`);
}

/**
 * Print migration summary
 */
function printSummary(): void {
  console.log('═══════════════════════════════════════════════');
  console.log('📊 MIGRATION SUMMARY');
  console.log('═══════════════════════════════════════════════\n');
  
  console.log(`Characters:`);
  console.log(`  Processed: ${stats.characters.processed}`);
  console.log(`  Updated:   ${stats.characters.updated}\n`);
  
  console.log(`Stories:`);
  console.log(`  Processed: ${stats.stories.processed}`);
  console.log(`  Updated:   ${stats.stories.updated}\n`);
  
  console.log(`Artifacts:`);
  console.log(`  Processed: ${stats.artifacts.processed}`);
  console.log(`  Updated:   ${stats.artifacts.updated}\n`);
  
  const totalProcessed = stats.characters.processed + stats.stories.processed + stats.artifacts.processed;
  const totalUpdated = stats.characters.updated + stats.stories.updated + stats.artifacts.updated;
  
  console.log(`TOTAL:`);
  console.log(`  Processed: ${totalProcessed}`);
  console.log(`  Updated:   ${totalUpdated}`);
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️  ERRORS (${stats.errors.length}):\n`);
    for (const error of stats.errors) {
      console.log(`  - ${error}`);
    }
  } else {
    console.log(`\n✅ No errors!`);
  }
  
  console.log('\n═══════════════════════════════════════════════');
  console.log(`\n💾 Backup saved at: ${BACKUP_DIR}`);
  console.log(`\n🔍 Next steps:`);
  console.log(`   1. Review the changes in git diff`);
  console.log(`   2. Run: npm run validate:lore`);
  console.log(`   3. If validation passes: commit the changes`);
  console.log(`   4. If validation fails: fix errors and run migration again`);
  console.log(`\n   To restore from backup:`);
  console.log(`   rm -rf content && cp -r content-backup content\n`);
}

/**
 * Main migration function
 */
function main(): void {
  console.log('\n═══════════════════════════════════════════════');
  console.log('🚀 LORE SYSTEM MIGRATION');
  console.log('═══════════════════════════════════════════════\n');
  console.log('This will migrate your content to the new 4-type system:');
  console.log('  - Characters: beliefs + factions → artifacts');
  console.log('  - Stories: multiple arrays → artifacts + storyType');
  console.log('  - Artifacts: add artifactType field\n');
  
  createBackup();
  migrateCharacters();
  migrateStories();
  migrateArtifacts();
  printSummary();
}

// Run migration
main();
