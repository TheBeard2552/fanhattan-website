# Migration Notes: Dual Content Systems

## Current State

The Fanhattan site currently has **two content systems** running in parallel:

### 1. **Legacy Content System**
- **Location**: Uses `src/lib/content.ts`
- **Validation**: `scripts/validate-content.ts`
- **Schema**: Old format with `title`, numeric `canonTier`, `type`, `related`, `status`
- **Content**: Existing districts, characters, systems files in `/content`

### 2. **New Lore Engine** (Just Implemented)
- **Location**: Uses `src/lib/lore/`
- **Validation**: `scripts/validate-lore.ts`
- **Schema**: New format with `name`, string `canonTier` ("tier-1"), strict relational types
- **Content**: New stories, beliefs, conflicts, threads, factions folders
- **Routes**: New dynamic routes (`/district/`, `/character/`, `/story/`, etc.)

## Why Two Systems?

The new lore engine was built to specification as a **relational narrative engine** with:
- Strict typed relationships
- No freeform tags
- Build-time validation of all references
- Dedicated resolver functions for querying relationships

The old system remains in place for backward compatibility with existing content.

## Impact

### During Development

When running `npm run dev`, you'll see warnings from `validate-content.ts` about the new lore files. This is expected because:
- The new lore files use a different schema
- The old validator doesn't understand the new format
- **This is harmless** - the dev server still starts

Example warnings you can ignore:
```
✗ [content/districts/stadium-south.md] type: Required
✗ [content/districts/stadium-south.md] canonTier: Invalid input
```

These are the new lore files being checked against the old schema.

### During Build

The build script runs: `validate-content.ts --mode error && next build`

To avoid build failures, you have two options:

#### Option A: Run Both Validations Separately (Recommended)
```bash
npm run validate:lore  # Validate new lore system
npm run validate       # Validate old content system
```

#### Option B: Migrate Old Content to New Schema

Update old content files to match the new schema:

**Old Format:**
```yaml
title: "District Name"
type: district
canonTier: 1
related: []
status: active
```

**New Format:**
```yaml
name: "District Name"
slug: "district-name"
canonTier: "tier-1"
coreBelief: "Core belief statement"
rivalDistricts: ["rival-slug"]
```

## Migration Path

### Phase 1: Coexistence (Current)
- Both systems work independently
- New content uses new lore engine
- Old content continues with old system
- Different route patterns differentiate them

### Phase 2: Gradual Migration (Future)
- Move old content files to new schema one by one
- Update frontmatter to match new types
- Test with `validate:lore`
- Remove old content loader when complete

### Phase 3: Unified System (Future)
- All content on new lore engine
- Remove old content system
- Single validation script
- Consistent schema across all content

## How to Work With Both Systems

### Creating New Content

**For new narrative content** (stories, beliefs, etc.):
- Use new lore engine
- Follow schemas in `LORE_ENGINE.md`
- Use string canon tiers: "tier-1", "tier-2", "tier-3"
- Run `npm run validate:lore`

**For other content** (if needed):
- Use old system
- Follow existing patterns in old content files
- Use numeric canon tiers: 1, 2, 3
- Run `npm run validate`

### Testing Routes

**New Lore Routes:**
- `/lore-index` - Index of all lore content
- `/district/[slug]` - District pages
- `/character/[slug]` - Character pages
- `/story/[slug]` - Story pages
- `/belief/[slug]` - Belief pages
- `/conflict/[slug]` - Conflict pages
- `/thread/[slug]` - Thread pages
- `/faction/[slug]` - Faction pages
- `/system/[slug]` - System pages

**Old Routes:**
- `/lore/[slug]` - Old lore pages
- Other existing routes continue to work

## Resolving Validation Conflicts

### If `validate-content.ts` fails on new lore files:

1. **Option 1**: Modify `validate-content.ts` to skip new lore folders:
   ```typescript
   const LORE_FOLDERS = ['stories', 'beliefs', 'conflicts', 'threads', 'factions'];
   // Skip these folders in old validation
   ```

2. **Option 2**: Run validations separately:
   ```bash
   npm run validate:lore  # New system
   npm run validate       # Old system
   ```

3. **Option 3**: Migrate content to new schema

### If `validate-lore.ts` fails:

Check error messages - they show exactly which references are broken:
```
📄 /content/stories/my-story.md
   ⚠️  Reference "invalid-character" in field "characters" does not exist
```

Fix by ensuring all slug references point to real entities.

## Recommendation

**For this project**: Keep both systems during development. The new lore engine handles the relational narrative content as specified. Gradually migrate old content when ready.

**Build Process**: Update `package.json` to run both validations or make old validation skip new folders.

## Questions?

See `LORE_ENGINE.md` for complete documentation of the new system.
See `IMPLEMENTATION_SUMMARY.md` for what was built.
