#!/usr/bin/env node

import { validateLoreContent, printValidationResults } from '../src/lib/lore/validate';

const mode = process.argv.includes('--mode') 
  ? process.argv[process.argv.indexOf('--mode') + 1] as 'warn' | 'error'
  : 'error';

const errors = validateLoreContent();
const success = printValidationResults(errors, mode);

if (!success) {
  process.exit(1);
}
