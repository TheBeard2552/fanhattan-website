#!/usr/bin/env node

import { validateCanonContent, printValidationResults } from '../src/lib/validator';

const mode = process.argv.includes('--mode') 
  ? process.argv[process.argv.indexOf('--mode') + 1] as 'warn' | 'error'
  : 'error';

const errors = validateCanonContent();
const success = printValidationResults(errors, mode);

if (!success) {
  process.exit(1);
}
