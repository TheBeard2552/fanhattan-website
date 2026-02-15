# Fanhattan Relational Lore Engine

## Overview

This is a **structured, relational narrative engine** for Fanhattan. It is NOT a blog or wiki—it's a belief-driven content graph where all relationships are strictly typed and validated at build time.

## Architecture

### Content Types

The system supports **4 core content types**:

1. **Districts** - Geographic and cultural regions
2. **Characters** - Individuals in Fanhattan
3. **Stories** - Narrative events (standalone or episodic)
4. **Artifacts** - World elements (beliefs, systems, factions, locations, conflicts, threads, items)

### Folder Structure

```
/content
  /districts      - District MDX files
  /characters     - Character MDX files
  /stories        - Story MDX files
  /artifacts      - Artifact MDX files
  
  # Legacy folders (still supported, auto-detected as artifacts):
  /beliefs        - Legacy belief files
  /conflicts      - Legacy conflict files
  /threads        - Legacy thread files
  /factions       - Legacy faction files
  /systems        - Legacy system files
  /world          - Legacy location files
```

## Frontmatter Schemas

### District

```yaml
---
name: "District Name"
slug: "district-slug"
coreBelief: "The district's foundational belief"
rivalDistricts: ["rival-slug-1", "rival-slug-2"]
canonTier: "tier-1" # or "tier-2" or "tier-3"
description: "Optional description"
coverImage: "/images/districts/slug.jpg"
thumbnail: "/images/districts/slug-thumb.jpg"
---
```

### Character

```yaml
---
name: "Character Name"
slug: "character-slug"
district: "district-slug"
role: "Their role in society"
reputation: "Public perception"
privateTruth: "Hidden truth about them"
artifacts: ["belief-slug", "faction-slug", "item-slug"]  # All world elements
canonTier: "tier-1"
coverImage: "/images/characters/slug.jpg"
thumbnail: "/images/characters/slug-thumb.jpg"
---
```

### Story (Standalone)

```yaml
---
title: "Story Title"
slug: "story-slug"
storyType: "standalone"
districts: ["district-slug-1", "district-slug-2"]
characters: ["character-slug-1", "character-slug-2"]
artifacts: [
  "belief-slug",
  "conflict-slug",
  "faction-slug",
  "system-slug",
  "thread-slug"
]
canonTier: "tier-1"
summary: "Brief summary of the story"
date: "2024-03-15"
coverImage: "/images/stories/slug.jpg"
thumbnail: "/images/stories/slug-thumb.jpg"
---
```

### Story (Episodic)

```yaml
---
title: "Story Title - Episode 1"
slug: "story-slug-episode-1"
storyType: "episodic"
episodeNumber: 1
seriesSlug: "story-series-slug"
districts: ["district-slug-1"]
characters: ["character-slug-1"]
artifacts: ["belief-slug", "faction-slug"]
canonTier: "tier-1"
summary: "Brief summary of this episode"
date: "2024-03-15"
coverImage: "/images/stories/slug.jpg"
thumbnail: "/images/stories/slug-thumb.jpg"
---
```

### Artifact

All world elements (beliefs, systems, factions, locations, conflicts, threads, items) use this schema:

```yaml
---
name: "Artifact Name"
slug: "artifact-slug"
artifactType: "belief"  # belief, system, faction, location, conflict, thread, item
description: "What this artifact represents"
canonTier: "tier-1"

# Optional fields:
district: "district-slug"  # For location-type artifacts
status: "active"           # For thread-type artifacts (active, dormant, resolved)
related: ["slug-1", "slug-2"]  # Related artifacts or characters

coverImage: "/images/artifacts/slug.jpg"
thumbnail: "/images/artifacts/slug-thumb.jpg"
---
```

#### Artifact Types

- **belief** - Ideological principles (e.g., "Survival Over Glory")
- **system** - World mechanics/rules (e.g., "District Trials")
- **faction** - Organized groups (e.g., "The Syndicate")
- **location** - Physical places (e.g., "Shep's Bar")
- **conflict** - Tensions/struggles (e.g., "Neutrality Collapse")
- **thread** - Narrative arcs (e.g., "Syndicate Offensive")
- **item** - Physical objects/relics (e.g., "The Golden Trophy")

## Validation

### Build-Time Validation

Run validation with:

```bash
npm run validate:lore
```

This checks:
- All required fields are present
- All slug references point to valid entities
- No broken relationships

**The build will fail if validation fails.**

### Required Fields

Each content type has strict required fields (see schemas above). Missing fields will cause build errors.

### Relational Integrity

All slug references are validated:
- `district` field in Character must reference a valid District
- `rivalDistricts` array must contain valid District slugs
- `beliefs`, `factions`, etc. must reference valid entities

## API / Resolver Functions

### Single Entity Getters

```typescript
import { 
  getDistrictBySlug,
  getCharacterBySlug,
  getStoryBySlug,
  // ... etc
} from '@/lib/lore/resolvers';

const district = getDistrictBySlug('stadium-south');
const character = getCharacterBySlug('shep');
```

### All Entities Getters

```typescript
import { 
  getAllDistricts,
  getAllCharacters,
  getAllStories,
  // ... etc
} from '@/lib/lore/resolvers';

const allDistricts = getAllDistricts();
```

### Relational Queries

```typescript
import {
  getCharactersByDistrict,
  getStoriesByDistrict,
  getStoriesByCharacter,
  getStoriesByArtifact,
  getArtifactsByType,
  getStoriesBySeries,
  // ... many more
} from '@/lib/lore/resolvers';

// Get all characters in Stadium South
const characters = getCharactersByDistrict('stadium-south');

// Get all stories involving Shep
const stories = getStoriesByCharacter('shep');

// Get all stories involving a specific artifact
const artifactStories = getStoriesByArtifact('survival-over-glory');

// Get all beliefs
const beliefs = getArtifactsByType('belief');

// Get all episodes in a series
const episodes = getStoriesBySeries('billy-saga');

// Get standalone vs episodic stories
const standalone = getStandaloneStories();
const episodic = getEpisodicStories();
```

### Available Relational Resolvers

#### District Resolvers
- `getCharactersByDistrict(districtSlug)` - Characters in a district
- `getStoriesByDistrict(districtSlug)` - Stories involving a district
- `getArtifactsByDistrict(districtSlug)` - Artifacts in stories about a district
- `getArtifactsByDistrictAndType(districtSlug, artifactType)` - Filtered artifacts
- `getRivalDistricts(districtSlug)` - Rival districts

#### Character Resolvers
- `getStoriesByCharacter(characterSlug)` - Stories involving a character
- `getDistrictsByCharacter(characterSlug)` - Districts in character's stories
- `getArtifactsByCharacter(characterSlug)` - Character's artifacts
- `getArtifactsByCharacterAndType(characterSlug, artifactType)` - Filtered artifacts
- `getCharactersByArtifact(artifactSlug)` - Characters with an artifact
- `getCharactersByArtifactType(artifactType)` - Characters with artifact type
- `getCharactersByArtifactWithStories(artifactSlug)` - Direct + story associations

#### Story Resolvers
- `getStoriesByArtifact(artifactSlug)` - Stories involving an artifact
- `getStoriesByArtifactType(artifactType)` - Stories with artifact type
- `getArtifactsByStory(storySlug)` - Artifacts in a story
- `getArtifactsByStoryAndType(storySlug, artifactType)` - Filtered artifacts
- `getStandaloneStories()` - All standalone stories
- `getEpisodicStories()` - All episodic stories
- `getStoriesBySeries(seriesSlug)` - Episodes in a series (sorted)

#### Artifact Resolvers
- `getDistrictsByArtifact(artifactSlug)` - Districts in stories with artifact
- `getArtifactsByType(artifactType)` - All artifacts of a type
- `getAllBeliefs()` - Shorthand for getArtifactsByType('belief')
- `getAllSystems()` - Shorthand for getArtifactsByType('system')
- `getAllFactions()` - Shorthand for getArtifactsByType('faction')
- `getAllLocations()` - Shorthand for getArtifactsByType('location')
- `getAllConflicts()` - Shorthand for getArtifactsByType('conflict')
- `getAllThreads()` - Shorthand for getArtifactsByType('thread')
- `getAllItems()` - Shorthand for getArtifactsByType('item')

## Dynamic Routes

The following routes are automatically generated:

- `/district/[slug]` - Shows district with related characters, stories, artifacts
- `/character/[slug]` - Shows character with district, stories, artifacts
- `/story/[slug]` - Shows story with all related entities (characters, districts, artifacts)
- `/artifact/[slug]` - Shows artifact with related districts, characters, stories
- `/series/[slug]` - Shows all episodes in a series (for episodic stories)

## Example Seed Content

See the following example files:

**Districts:**
- `content/districts/stadium-south.md`
- `content/districts/the-proving-grounds.md`

**Characters:**
- `content/characters/shep.md`
- `content/characters/brown-bag-billy.md`

**Stories:**
- `content/stories/the-night-neutrality-broke.md` (standalone)

**Artifacts:**
- `content/artifacts/survival-over-glory.md` (belief)
- `content/artifacts/the-syndicate.md` (faction)
- `content/artifacts/district-trials.md` (system)
- `content/artifacts/sheps-bar.md` (location)
- `content/artifacts/neutrality-collapse.md` (conflict)
- `content/artifacts/syndicate-offensive.md` (thread)

**Legacy folders** (still supported):
- `content/beliefs/` - Auto-detected as belief artifacts
- `content/factions/` - Auto-detected as faction artifacts
- `content/systems/` - Auto-detected as system artifacts
- `content/world/` - Auto-detected as location artifacts

## Key Principles

### 1. Four Core Types

The system uses exactly 4 content types: Districts, Characters, Stories, Artifacts. All other world elements are artifacts with a type field.

### 2. No Freeform Tags

All relationships are typed slug references. You cannot use arbitrary strings—only valid slugs that reference actual content.

### 3. Single Source of Truth

Frontmatter is the only source of relationships. There are no duplicate relationship definitions.

### 4. Build-Time Validation

Broken references fail the build. This ensures the graph remains consistent.

### 5. Static Generation

All pages are statically generated at build time using Next.js App Router.

### 6. Scalability

The system is designed to handle 500+ stories with performant static generation.

### 7. Story Types

Stories can be **standalone** (complete in one story) or **episodic** (part of a series). Episodic stories require `episodeNumber` and `seriesSlug`.

## Implementation Files

### Type Definitions
- `src/lib/lore/types.ts` - All TypeScript interfaces

### Content Loading
- `src/lib/lore/loader.ts` - MDX parsing and validation

### Relational Queries
- `src/lib/lore/resolvers.ts` - All resolver functions

### Dynamic Routes
- `app/district/[slug]/page.tsx`
- `app/character/[slug]/page.tsx`
- `app/story/[slug]/page.tsx`
- `app/belief/[slug]/page.tsx`
- `app/conflict/[slug]/page.tsx`
- `app/thread/[slug]/page.tsx`
- `app/faction/[slug]/page.tsx`
- `app/system/[slug]/page.tsx`

### Validation Script
- `scripts/validate-lore.ts` - Build-time validation

## Usage in Build

The validation runs automatically during build:

```bash
npm run build
# Runs: validate-lore → validate-content → next build
```

To run validation independently:

```bash
npm run validate:lore
```

## Creating New Content

### 1. Create the MDX file

Place it in the appropriate `/content/{type}/` folder.

### 2. Use proper frontmatter

Follow the schema for that content type exactly.

### 3. Reference valid slugs

All slug references must point to existing entities.

### 4. Run validation

```bash
npm run validate:lore
```

### 5. Build

```bash
npm run build
```

If validation passes, the build continues. If not, you'll see exactly which references are broken.

## Future Enhancements

- Canon tier filtering UI
- Belief graph visualization
- Advanced search by multiple criteria
- Timeline view for threads
- Character relationship graphs

---

**This is a relational narrative engine, not a blog. All data is structured, validated, and interconnected.**
