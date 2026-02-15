#!/usr/bin/env node
/**
 * Lore Validation Script
 * 
 * Validates all lore content at build time.
 * Throws errors if relationships are broken.
 * 
 * Usage: npm run validate:lore
 */

import { loadAndValidateAllContent } from '../src/lib/lore/loader';

console.log('🔍 Validating Fanhattan Lore Content...\n');

try {
  const entries = loadAndValidateAllContent();
  
  console.log('✅ VALIDATION SUCCESSFUL\n');
  console.log('═══════════════════════════════════════════════');
  console.log(`📊 Validated ${entries.length} total entries:\n`);
  
  const counts = entries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(counts).forEach(([type, count]) => {
    console.log(`   ${type.padEnd(15)} ${count} entries`);
  });
  
  console.log('\n═══════════════════════════════════════════════');
  console.log('✨ All relationships are valid. Build can proceed.\n');
  
  process.exit(0);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.log('\n');
  process.exit(1);
}
