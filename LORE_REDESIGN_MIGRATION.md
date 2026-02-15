# Lore System Redesign - Migration Guide

## Overview

The lore system has been redesigned to use **4 core content types** instead of 8:

### New Structure
1. **Districts** - Geographic/cultural regions (unchanged)
2. **Characters** - Individuals (simplified)
3. **Stories** - Narratives with **standalone** vs **episodic** types
4. **Artifacts** - World elements (consolidates beliefs, systems, factions, locations, conflicts, threads, items)

### What Changed

#### Before (8 types):
- Districts
- Characters (with separate `beliefs` and `factions` arrays)
- Stories (with 7 different reference arrays)
- Beliefs
- Conflicts
- Threads
- Factions
- Systems

#### After (4 types):
- Districts (unchanged)
- Characters (with single `artifacts` array)
- Stories (with `storyType`, `episodeNumber`, `seriesSlug`, and single `artifacts` array)
- Artifacts (all other world elements)

---

## Migration Steps

### 1. Character Files

**Before:**
```yaml
---
name: "Brown Bag Billy"
slug: "brown-bag-billy"
district: "the-proving-grounds"
role: "Survival Expert & Information Broker"
reputation: "The man who knows how to disappear"
privateTruth: "He's from Stadium South elite"
beliefs: ["survival-over-glory"]
factions: ["the-resistance"]
canonTier: "tier-1"
---
```

**After:**
```yaml
---
name: "Brown Bag Billy"
slug: "brown-bag-billy"
district: "the-proving-grounds"
role: "Survival Expert & Information Broker"
reputation: "The man who knows how to disappear"
privateTruth: "He's from Stadium South elite"
artifacts: ["survival-over-glory", "the-resistance"]
canonTier: "tier-1"
---
```

**Changes:**
- Merge `beliefs` and `factions` into single `artifacts` array
- Remove empty arrays (can be `artifacts: []`)

### 2. Story Files

**Before:**
```yaml
---
title: "The Night Neutrality Broke"
slug: "the-night-neutrality-broke"
districts: ["stadium-south", "the-proving-grounds"]
characters: ["shep", "brown-bag-billy"]
beliefs: ["survival-over-glory", "meritocracy-is-honest"]
conflicts: ["neutrality-collapse"]
factions: ["the-syndicate", "the-resistance"]
systems: ["district-trials"]
threads: ["syndicate-offensive"]
canonTier: "tier-1"
summary: "When the Syndicate demanded Shep choose a side..."
date: "2024-03-15"
---
```

**After (Standalone Story):**
```yaml
---
title: "The Night Neutrality Broke"
slug: "the-night-neutrality-broke"
storyType: "standalone"
districts: ["stadium-south", "the-proving-grounds"]
characters: ["shep", "brown-bag-billy"]
artifacts: [
  "survival-over-glory",
  "meritocracy-is-honest",
  "neutrality-collapse",
  "the-syndicate",
  "the-resistance",
  "district-trials",
  "syndicate-offensive"
]
canonTier: "tier-1"
summary: "When the Syndicate demanded Shep choose a side..."
date: "2024-03-15"
---
```

**After (Episodic Story):**
```yaml
---
title: "The Night Neutrality Broke - Part 1"
slug: "the-night-neutrality-broke-part-1"
storyType: "episodic"
episodeNumber: 1
seriesSlug: "neutrality-saga"
districts: ["stadium-south", "the-proving-grounds"]
characters: ["shep", "brown-bag-billy"]
artifacts: [
  "survival-over-glory",
  "the-syndicate",
  "the-resistance"
]
canonTier: "tier-1"
summary: "The first encounter..."
date: "2024-03-15"
---
```

**Changes:**
- Add `storyType: "standalone"` or `storyType: "episodic"`
- For episodic: Add `episodeNumber` and `seriesSlug`
- Merge `beliefs`, `conflicts`, `factions`, `systems`, `threads` into single `artifacts` array

### 3. Artifact Files

All of these content types are now **artifacts** with an `artifactType` field:
- `beliefs` → `artifactType: "belief"`
- `systems` → `artifactType: "system"`
- `factions` → `artifactType: "faction"`
- `conflicts` → `artifactType: "conflict"`
- `threads` → `artifactType: "thread"`
- `world` locations → `artifactType: "location"`
- New: `artifactType: "item"` for physical objects

#### Example: Belief → Artifact

**Before (`content/beliefs/survival-over-glory.md`):**
```yaml
---
name: "Survival Over Glory"
slug: "survival-over-glory"
description: "In a cutthroat world, surviving to fight another day matters more than dying for honor."
canonTier: "tier-1"
---
```

**After (Option 1: Move to `content/artifacts/`):**
```yaml
---
name: "Survival Over Glory"
slug: "survival-over-glory"
artifactType: "belief"
description: "In a cutthroat world, surviving to fight another day matters more than dying for honor."
canonTier: "tier-1"
---
```

**After (Option 2: Keep in legacy folder):**
- The system will auto-detect files in `content/beliefs/`, `content/factions/`, etc.
- Just add `artifactType: "belief"` to the frontmatter
- Files can stay in their current folders during migration

#### Example: World Location → Artifact

**Before (`content/world/sheps-bar.md`):**
```yaml
---
title: "Shep's Bar"
slug: "sheps-bar"
type: "world"
canonTier: "tier-1"
district: "stadium-south"
coreBelief: "The beating heart of Stadium South"
---
```

**After:**
```yaml
---
name: "Shep's Bar"
slug: "sheps-bar"
artifactType: "location"
description: "The beating heart of Stadium South—where more deals get made than at City Hall"
district: "stadium-south"
canonTier: "tier-1"
---
```

**Changes:**
- `title` → `name`
- Add `artifactType: "location"`
- `type` → remove
- `coreBelief` → can move to `description` or keep as legacy field

---

## Artifact Types Reference

| artifactType | Description | Examples |
|-------------|-------------|----------|
| `belief` | Ideological principles | "Survival Over Glory", "Meritocracy Is Honest" |
| `system` | World mechanics/rules | "District Trials", "Draft Board" |
| `faction` | Organized groups | "The Syndicate", "The Resistance" |
| `location` | Physical places | "Shep's Bar", "The Combine Arena" |
| `conflict` | Tensions/struggles | "Neutrality Collapse", "Territory War" |
| `thread` | Narrative arcs | "Syndicate Offensive", "Rise of Billy" |
| `item` | Physical objects/relics | "The Golden Trophy", "Ancient Playbook" |

---

## Backward Compatibility

### Legacy Folder Support
The system still reads from old folders:
- `content/beliefs/` → auto-detected as artifacts
- `content/factions/` → auto-detected as artifacts
- `content/systems/` → auto-detected as artifacts
- `content/conflicts/` → auto-detected as artifacts
- `content/threads/` → auto-detected as artifacts
- `content/world/` → auto-detected as artifacts

**You can migrate gradually** - no need to move all files at once.

### API Compatibility
Old resolver functions still work via artifact type filtering:
```typescript
// Old API (still works)
getAllBeliefs()  // Returns artifacts with artifactType: "belief"
getAllFactions() // Returns artifacts with artifactType: "faction"

// New API (recommended)
getArtifactsByType('belief')
getArtifactsByType('faction')
```

---

## Migration Script

A migration script is recommended to automate this process:

```bash
npm run migrate:lore
```

This script will:
1. Scan all character files and merge `beliefs` + `factions` → `artifacts`
2. Scan all story files and merge belief/conflict/faction/system/thread arrays → `artifacts`
3. Add `storyType: "standalone"` to stories (you can manually change to "episodic" later)
4. Add `artifactType` to all belief/faction/system/conflict/thread/world files
5. Create backups before making changes

---

## New Features

### Episodic Stories
You can now create story series:

```yaml
# Episode 1
storyType: "episodic"
episodeNumber: 1
seriesSlug: "billy-saga"

# Episode 2
storyType: "episodic"
episodeNumber: 2
seriesSlug: "billy-saga"
```

Query all episodes:
```typescript
getStoriesBySeries('billy-saga') // Returns sorted by episode number
```

### Flexible Artifacts
The artifact system is extensible - you can add new `artifactType` values as needed:
- `"relic"` - historical artifacts
- `"document"` - in-universe documents
- `"event"` - time-bound events
- etc.

---

## Validation

After migration, run:
```bash
npm run validate:lore
```

This checks:
- All required fields present
- Valid enum values (canonTier, storyType, artifactType)
- All slug references resolve correctly
- Episodic stories have episodeNumber and seriesSlug

---

## Questions?

- Characters now use `artifacts` instead of separate arrays
- Stories now use `artifacts` and have `storyType`
- Beliefs/factions/systems/etc are now **artifacts** with `artifactType`
- Old folders still work during migration
- Old API functions still work via type filtering
