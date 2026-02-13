import { loreCharacters } from '../../../data/loreCharacters';
import { loreDistricts } from '../../../data/loreDistricts';
import { loreArtifacts } from '../../../data/loreArtifacts';
import { loreChapters } from '../../../data/loreChapters';
import { LoreEntry } from './types';

// Merge all lore entries into a single array
export const allLoreEntries: LoreEntry[] = [
  ...loreCharacters,
  ...loreDistricts,
  ...loreArtifacts,
  ...loreChapters,
];
