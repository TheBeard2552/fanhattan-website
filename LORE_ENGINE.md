# Fanhattan Relational Lore Engine

## Overview

This is a **structured, relational narrative engine** for Fanhattan. It is NOT a blog or wiki—it's a belief-driven content graph where all relationships are strictly typed and validated at build time.

## Architecture

### Content Types

The system supports 8 core content types:

1. **Districts** - Geographic and cultural regions
2. **Characters** - Individuals in Fanhattan
3. **Stories** - Narrative events that tie everything together
4. **Beliefs** - Core ideological principles
5. **Conflicts** - Tensions and struggles
6. **Threads** - Ongoing narrative arcs
7. **Factions** - Organized groups
8. **Systems** - World mechanics and rules

### Folder Structure

```
/content
  /districts      - District MDX files
  /characters     - Character MDX files
  /stories        - Story MDX files
  /beliefs        - Belief MDX files
  /conflicts      - Conflict MDX files
  /threads        - Thread MDX files
  /factions       - Faction MDX files
  /systems        - System MDX files
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
beliefs: ["belief-slug-1", "belief-slug-2"]
factions: ["faction-slug-1"]
canonTier: "tier-1"
coverImage: "/images/characters/slug.jpg"
thumbnail: "/images/characters/slug-thumb.jpg"
---
```

### Story

```yaml
---
title: "Story Title"
slug: "story-slug"
districts: ["district-slug-1", "district-slug-2"]
characters: ["character-slug-1", "character-slug-2"]
beliefs: ["belief-slug-1"]
conflicts: ["conflict-slug-1"]
factions: ["faction-slug-1"]
systems: ["system-slug-1"]
threads: ["thread-slug-1"]
canonTier: "tier-1"
summary: "Brief summary of the story"
date: "2024-03-15"
---
```

### Belief

```yaml
---
name: "Belief Name"
slug: "belief-slug"
description: "What this belief represents"
canonTier: "tier-1"
---
```

### Conflict

```yaml
---
name: "Conflict Name"
slug: "conflict-slug"
description: "Nature of the conflict"
canonTier: "tier-1"
---
```

### Thread

```yaml
---
name: "Thread Name"
slug: "thread-slug"
status: "active" # or "dormant" or "resolved"
canonTier: "tier-1"
description: "Optional description"
---
```

### Faction

```yaml
---
name: "Faction Name"
slug: "faction-slug"
description: "What the faction represents"
canonTier: "tier-1"
---
```

### System

```yaml
---
name: "System Name"
slug: "system-slug"
description: "How this system works"
canonTier: "tier-1"
---
```

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
  getStoriesByBelief,
  getCharactersByFaction,
  // ... many more
} from '@/lib/lore/resolvers';

// Get all characters in Stadium South
const characters = getCharactersByDistrict('stadium-south');

// Get all stories involving Shep
const stories = getStoriesByCharacter('shep');

// Get all stories exploring a belief
const beliefStories = getStoriesByBelief('survival-over-glory');
```

### Available Relational Resolvers

- `getCharactersByDistrict(districtSlug)`
- `getStoriesByDistrict(districtSlug)`
- `getStoriesByCharacter(characterSlug)`
- `getStoriesByBelief(beliefSlug)`
- `getStoriesByConflict(conflictSlug)`
- `getStoriesByThread(threadSlug)`
- `getStoriesByFaction(factionSlug)`
- `getStoriesBySystem(systemSlug)`
- `getCharactersByFaction(factionSlug)`
- `getCharactersByBelief(beliefSlug)`
- `getConflictsByDistrict(districtSlug)`
- `getBeliefsByDistrict(districtSlug)`
- `getThreadsByDistrict(districtSlug)`
- `getDistrictsByCharacter(characterSlug)`
- `getDistrictsByBelief(beliefSlug)`
- `getRivalDistricts(districtSlug)`
- `getFactionsByCharacter(characterSlug)`
- `getBeliefsByCharacter(characterSlug)`

## Dynamic Routes

The following routes are automatically generated:

- `/district/[slug]` - Shows district with related characters, stories, beliefs, conflicts, threads
- `/character/[slug]` - Shows character with district, stories, beliefs, factions
- `/story/[slug]` - Shows story with all related entities
- `/belief/[slug]` - Shows belief with related districts, characters, stories
- `/conflict/[slug]` - Shows conflict with related stories
- `/thread/[slug]` - Shows thread with related stories
- `/faction/[slug]` - Shows faction with members and stories
- `/system/[slug]` - Shows system with related stories

## Example Seed Content

See the following example files:

**Beliefs:**
- `content/beliefs/survival-over-glory.md`
- `content/beliefs/meritocracy-is-honest.md`

**Conflicts:**
- `content/conflicts/neutrality-collapse.md`

**Threads:**
- `content/threads/syndicate-offensive.md`

**Factions:**
- `content/factions/the-syndicate.md`
- `content/factions/the-resistance.md`

**Districts:**
- `content/districts/stadium-south.md`
- `content/districts/the-proving-grounds.md`

**Characters:**
- `content/characters/shep.md`
- `content/characters/brown-bag-billy.md`

**Stories:**
- `content/stories/the-night-neutrality-broke.md`

## Key Principles

### 1. No Freeform Tags

All relationships are typed slug references. You cannot use arbitrary strings—only valid slugs that reference actual content.

### 2. Single Source of Truth

Frontmatter is the only source of relationships. There are no duplicate relationship definitions.

### 3. Build-Time Validation

Broken references fail the build. This ensures the graph remains consistent.

### 4. Static Generation

All pages are statically generated at build time using Next.js App Router.

### 5. Scalability

The system is designed to handle 500+ stories with performant static generation.

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
