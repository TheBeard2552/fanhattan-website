#!/usr/bin/env node

import { updateTier1Lock } from '../src/lib/validator';

try {
  updateTier1Lock();
  console.log('Tier 1 lockfile updated successfully');
} catch (error) {
  console.error('Error updating Tier 1 lockfile:', error);
  process.exit(1);
}
