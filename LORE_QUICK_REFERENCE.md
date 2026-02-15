# Lore System Quick Reference

## Content Types (4 Total)

```
┌─────────────────────────────────────────────────────────────────┐
│                      DISTRICTS                                   │
│  Geographic/cultural regions                                     │
│  - Stadium South, The Proving Grounds, Vol Valley, etc.         │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ contains
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CHARACTERS                                   │
│  Individuals in Fanhattan                                        │
│  - Shep, Brown Bag Billy, Vito, etc.                           │
│  - References: district, artifacts[]                             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ appear in
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STORIES                                     │
│  Narratives (standalone or episodic)                            │
│  - The Night Neutrality Broke, etc.                            │
│  - References: districts[], characters[], artifacts[]            │
│  - Types: standalone | episodic                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ involves
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ARTIFACTS                                    │
│  All world elements                                              │
│  - Beliefs, Systems, Factions, Locations, Conflicts, Threads    │
│  - artifactType: belief | system | faction | location |         │
│                  conflict | thread | item                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Story Types

### Standalone
```yaml
storyType: "standalone"
```
Complete story in one file.

### Episodic
```yaml
storyType: "episodic"
episodeNumber: 1
seriesSlug: "series-name"
```
Part of a series. Episodes auto-sort by number.

---

## Artifact Types

| Type | Description | Examples |
|------|-------------|----------|
| `belief` | Ideological principles | "Survival Over Glory" |
| `system` | World mechanics | "District Trials" |
| `faction` | Organized groups | "The Syndicate" |
| `location` | Physical places | "Shep's Bar" |
| `conflict` | Tensions/struggles | "Neutrality Collapse" |
| `thread` | Narrative arcs | "Syndicate Offensive" |
| `item` | Physical objects | "Golden Trophy" |

---

## Frontmatter Cheat Sheet

### District
```yaml
name: "District Name"
slug: "district-slug"
coreBelief: "Core belief"
rivalDistricts: ["slug1", "slug2"]
canonTier: "tier-1"
```

### Character
```yaml
name: "Character Name"
slug: "character-slug"
district: "district-slug"
role: "Their role"
reputation: "Public perception"
privateTruth: "Hidden truth"
artifacts: ["artifact1", "artifact2"]
canonTier: "tier-1"
```

### Story (Standalone)
```yaml
title: "Story Title"
slug: "story-slug"
storyType: "standalone"
districts: ["district1"]
characters: ["char1"]
artifacts: ["artifact1"]
summary: "Summary"
canonTier: "tier-1"
```

### Story (Episodic)
```yaml
title: "Story Title - Episode 1"
slug: "story-slug-ep1"
storyType: "episodic"
episodeNumber: 1
seriesSlug: "series-slug"
districts: ["district1"]
characters: ["char1"]
artifacts: ["artifact1"]
summary: "Summary"
canonTier: "tier-1"
```

### Artifact
```yaml
name: "Artifact Name"
slug: "artifact-slug"
artifactType: "belief"  # or system, faction, etc.
description: "Description"
canonTier: "tier-1"

# Optional:
district: "district-slug"  # for locations
status: "active"           # for threads
related: ["slug1"]         # related content
```

---

## Common Queries

```typescript
// Get all content of a type
getAllDistricts()
getAllCharacters()
getAllStories()
getAllArtifacts()

// Filter stories by type
getStandaloneStories()
getEpisodicStories()
getStoriesBySeries('series-slug')

// Filter artifacts by type
getArtifactsByType('belief')
getAllBeliefs()      // shorthand
getAllFactions()     // shorthand
getAllLocations()    // shorthand

// Get related content
getCharactersByDistrict('stadium-south')
getStoriesByCharacter('shep')
getArtifactsByCharacter('shep')
getStoriesByArtifact('survival-over-glory')
getCharactersByArtifact('the-resistance')

// Get filtered artifacts
getArtifactsByCharacterAndType('shep', 'belief')
getArtifactsByStoryAndType('story-slug', 'faction')
getArtifactsByDistrictAndType('stadium-south', 'location')
```

---

## Migration Commands

```bash
# Run migration (creates backup first)
npm run migrate:lore

# Validate after migration
npm run validate:lore

# Build (runs validation automatically)
npm run build

# Dev mode (validation warnings only)
npm run dev
```

---

## Folder Structure

```
content/
├── districts/
│   ├── stadium-south.md
│   └── the-proving-grounds.md
├── characters/
│   ├── shep.md
│   └── brown-bag-billy.md
├── stories/
│   └── the-night-neutrality-broke.md
├── artifacts/               # New unified folder
│   ├── survival-over-glory.md
│   ├── the-syndicate.md
│   └── sheps-bar.md
│
# Legacy folders (still work, auto-detected as artifacts)
├── beliefs/                 # → artifactType: "belief"
├── factions/                # → artifactType: "faction"
├── systems/                 # → artifactType: "system"
├── conflicts/               # → artifactType: "conflict"
├── threads/                 # → artifactType: "thread"
└── world/                   # → artifactType: "location"
```

---

## Before vs After

### Character Migration
```yaml
# BEFORE
beliefs: ["survival-over-glory"]
factions: ["the-resistance"]

# AFTER
artifacts: ["survival-over-glory", "the-resistance"]
```

### Story Migration
```yaml
# BEFORE
beliefs: ["belief1"]
conflicts: ["conflict1"]
factions: ["faction1"]
systems: ["system1"]
threads: ["thread1"]

# AFTER
storyType: "standalone"
artifacts: ["belief1", "conflict1", "faction1", "system1", "thread1"]
```

### Artifact Migration
```yaml
# BEFORE (in content/beliefs/survival-over-glory.md)
name: "Survival Over Glory"
slug: "survival-over-glory"
description: "..."
canonTier: "tier-1"

# AFTER
name: "Survival Over Glory"
slug: "survival-over-glory"
artifactType: "belief"      # ← Added
description: "..."
canonTier: "tier-1"
```

---

## Validation Errors

Common errors after migration:

**Missing artifactType:**
```
Missing required field: artifactType
```
→ Add `artifactType: "belief"` (or appropriate type)

**Missing storyType:**
```
Missing required field: storyType
```
→ Add `storyType: "standalone"` or `storyType: "episodic"`

**Episodic without episode number:**
```
Episodic stories require episodeNumber
```
→ Add `episodeNumber: 1` and `seriesSlug: "series-name"`

**Invalid reference:**
```
Reference "old-belief-slug" does not exist
```
→ Check that the slug exists in content

---

## Tips

✅ **DO:**
- Use descriptive artifact slugs
- Group related artifacts with `related` field
- Use episodic for story series
- Use locations for physical places
- Keep legacy folders during transition

❌ **DON'T:**
- Mix old and new frontmatter formats
- Forget to add `storyType` to stories
- Skip validation after migration
- Delete backups before testing

---

## Quick Decision Tree

**Adding new content?**

1. Is it a place? → **District** or **Artifact (location)**
2. Is it a person? → **Character**
3. Is it a narrative? → **Story**
4. Is it anything else? → **Artifact**

**What artifact type?**

- Belief/ideology → `belief`
- Rule/mechanic → `system`
- Group/organization → `faction`
- Physical place → `location`
- Tension/problem → `conflict`
- Ongoing arc → `thread`
- Physical object → `item`

---

## Need Help?

📖 **Full Migration Guide:** `LORE_REDESIGN_MIGRATION.md`
📖 **Complete Documentation:** `LORE_ENGINE.md`
📖 **Implementation Summary:** `LORE_REDESIGN_COMPLETE.md`

🔧 **Validation:** `npm run validate:lore`
🔧 **Migration:** `npm run migrate:lore`
