/**
 * Fanhattan Relational Lore Engine
 * 
 * Main export file for the lore system.
 */

// Types
export * from './types';

// Loaders
export {
  loadDistricts,
  loadCharacters,
  loadStories,
  loadBeliefs,
  loadConflicts,
  loadThreads,
  loadFactions,
  loadSystems,
  loadAllContent,
  loadAndValidateAllContent,
  validateAllContent,
} from './loader';

// Resolvers
export {
  // Single entity getters
  getBySlug,
  getDistrictBySlug,
  getCharacterBySlug,
  getStoryBySlug,
  getBeliefBySlug,
  getConflictBySlug,
  getThreadBySlug,
  getFactionBySlug,
  getSystemBySlug,
  
  // All entities getters
  getAllDistricts,
  getAllCharacters,
  getAllStories,
  getAllBeliefs,
  getAllConflicts,
  getAllThreads,
  getAllFactions,
  getAllSystems,
  
  // Relational resolvers
  getCharactersByDistrict,
  getStoriesByDistrict,
  getStoriesByCharacter,
  getStoriesByBelief,
  getStoriesByConflict,
  getStoriesByThread,
  getStoriesByFaction,
  getStoriesBySystem,
  getCharactersByFaction,
  getCharactersByBelief,
  getConflictsByDistrict,
  getBeliefsByDistrict,
  getThreadsByDistrict,
  getDistrictsByCharacter,
  getDistrictsByBelief,
  getCharactersByBeliefDirect,
  getRivalDistricts,
  getFactionsByCharacter,
  getBeliefsByCharacter,
  
  // Utilities
  getStaticPaths,
} from './resolvers';
