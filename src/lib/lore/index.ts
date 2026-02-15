/**
 * Fanhattan Relational Lore Engine
 * 
 * Main export file for the lore system.
 * 
 * Four Core Content Types:
 * 1. Districts - Geographic/cultural regions
 * 2. Characters - Individuals
 * 3. Stories - Narratives (standalone or episodic)
 * 4. Artifacts - World elements (beliefs, systems, factions, locations, etc.)
 */

// Types
export * from './types';

// Loaders
export {
  loadDistricts,
  loadCharacters,
  loadStories,
  loadArtifacts,
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
  getArtifactBySlug,
  
  // All entities getters
  getAllDistricts,
  getAllCharacters,
  getAllStories,
  getAllArtifacts,
  
  // Artifact type getters
  getArtifactsByType,
  getAllBeliefs,
  getAllSystems,
  getAllFactions,
  getAllLocations,
  getAllConflicts,
  getAllThreads,
  getAllItems,
  
  // Story type getters
  getStandaloneStories,
  getEpisodicStories,
  getStoriesBySeries,
  
  // Relational resolvers - Districts
  getCharactersByDistrict,
  getStoriesByDistrict,
  getArtifactsByDistrict,
  getArtifactsByDistrictAndType,
  getRivalDistricts,
  
  // Relational resolvers - Characters
  getStoriesByCharacter,
  getDistrictsByCharacter,
  getArtifactsByCharacter,
  getArtifactsByCharacterAndType,
  getCharactersByArtifact,
  getCharactersByArtifactType,
  getCharactersByArtifactWithStories,
  
  // Relational resolvers - Stories
  getStoriesByArtifact,
  getStoriesByArtifactType,
  getArtifactsByStory,
  getArtifactsByStoryAndType,
  
  // Relational resolvers - Artifacts
  getDistrictsByArtifact,
  
  // Utilities
  getStaticPaths,
  getArtifactTypeStaticPaths,
  // Artifact-type aliases
  getBeliefBySlug,
  getConflictBySlug,
  getThreadBySlug,
  getFactionBySlug,
  getSystemBySlug,
  getStoriesByBelief,
  getStoriesByConflict,
  getStoriesByThread,
  getStoriesByFaction,
  getStoriesBySystem,
  getDistrictsByBelief,
  getCharactersByBeliefDirect,
  getBeliefsByDistrict,
  getConflictsByDistrict,
  getThreadsByDistrict,
  getBeliefsByCharacter,
  getFactionsByCharacter,
  getCharactersByFaction,
} from './resolvers';
