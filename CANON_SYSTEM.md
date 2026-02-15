# Fanhattan Canon System

## Overview

The Fanhattan Canon System is a static, filesystem-based lore engine built with Next.js 15, TypeScript, and Markdown. It replaces the previous Sanity CMS implementation with a build-time validated, type-safe content system.

## Key Features

### ✅ Static Generation
- All canon pages are statically generated at build time
- No runtime data fetching or database dependencies
- Deployable to Vercel with zero configuration

### ✅ Build-Time Validation
- Zod schema validation for all frontmatter
- Unique slug enforcement across all types
- Folder/type matching validation
- Related slug existence checking
- Character-district relationship validation
- **Tier 1 lockfile protection** prevents unauthorized changes to immutable canon

### ✅ Content Structure

```
/content
  /world       → world-building entries
  /districts   → territorial powers
  /characters  → key figures
  /systems     → game mechanics and rules
  /events      → historical moments
  /myths       → legendary stories
```

Each markdown file includes typed frontmatter:

```yaml
---
title: Stadium South
slug: stadium-south
type: district
canonTier: 1 | 2 | 3
district: required-for-characters
coreBelief: The philosophical core
coverImage: /images/districts/stadium-south.jpg
thumbnail: /images/districts/stadium-south-thumb.jpg
related: [slug-array]
status: active | archived
---
```

## Routes

| Route | Purpose | Generation |
|-------|---------|------------|
| `/lore` | Canon hub | Static |
| `/lore/districts` | District index | Static |
| `/lore/characters` | Character index | Static |
| `/lore/systems` | Systems index | Static |
| `/lore/[slug]` | Detail pages with type-specific templates | Static (SSG) |

## Components

### Core Components
- `CanonLayout` - Base layout with grain overlay and dark theme
- `CanonTierBadge` - Visual tier indicator (1-3)
- `Markdown` - Remark-based markdown renderer

### Templates
- **District Template**: Full-width hero, core belief highlight, sectioned content, auto-linked characters
- **Character Template**: Portrait layout, district badge, structured character sections
- **Generic Template**: Flexible layout for systems/events/myths

## Validation System

### Build-Time Rules
Run via: `npm run validate` or `npm run build`

1. **Schema Validation** - All frontmatter fields must match Zod schema
2. **Unique Slugs** - No duplicate slugs across any type
3. **Slug-Filename Match** - `slug: stadium-south` must be in `stadium-south.md`
4. **Folder-Type Match** - Files in `/districts` must have `type: district`
5. **District References** - Characters must reference existing district slugs
6. **Related Links** - All `related[]` slugs must exist
7. **Tier 1 Protection** - Tier 1 files are hashed and locked

### Tier 1 Lockfile

Tier 1 canon files are protected from unauthorized changes:

```bash
# Generate lockfile after authorized Tier 1 changes
npm run canon:lock

# Allow Tier 1 changes during build (use with caution)
CANON_ALLOW_TIER1_CHANGES=1 npm run build
```

Lock state stored in: `content/.tier1-lock.json`

## Development Workflow

### Adding New Canon

1. Create markdown file in appropriate `/content/{type}/` folder
2. Add required frontmatter
3. Write content using H2 headers for sections
4. Run validation: `npm run validate`
5. Add images to `/public/images/{type}/`
6. Build to verify: `npm run build`

### Modifying Tier 1 Canon

1. Set `CANON_ALLOW_TIER1_CHANGES=1` in `.env.local`
2. Make changes to Tier 1 files
3. Validate: `npm run validate`
4. Update lockfile: `npm run canon:lock`
5. Commit both the content and `.tier1-lock.json`

### Scripts

```json
{
  "dev": "tsx scripts/validate-content.ts --mode warn && next dev",
  "build": "tsx scripts/validate-content.ts --mode error && next build",
  "validate": "tsx scripts/validate-content.ts --mode error",
  "canon:lock": "tsx scripts/update-tier1-lock.ts"
}
```

## Design System

### Visual Identity
- **Background**: `#0e0e0e` (deep charcoal)
- **Accent**: Burnt orange (`platform` color)
- **Typography**: Large serif headlines, editorial spacing
- **Texture**: Subtle grain overlay
- **Tone**: Cinematic, mythic, urban sports doc

### Layout Principles
- Not blog-style card grids
- Editorial typographic hierarchy
- Full-width hero images for districts
- Generous whitespace and breathing room
- Sectioned content with clear H2 headers

## Sample Content

Stadium South (Tier 1 district) is included as reference:
- `content/districts/stadium-south.md`
- Demonstrates all required sections
- Shows proper frontmatter structure
- Includes core belief, power dynamics, fears, visual identity

## Migration Notes

### Removed
- ✅ Sanity CMS and all dependencies
- ✅ Studio routes and authentication
- ✅ ISR/revalidation routes
- ✅ Database-based lore queries
- ✅ PortableText component

### Preserved
- ✅ Supabase authentication (for account/auth)
- ✅ Email signup API route
- ✅ Collection and shop pages (lore integration commented out)

## Next Steps (Not Implemented)

Per the plan, these are future enhancements:

1. **CI Hook** - Fail CI on validation errors
2. **Slug Map** - Generate static slug → type mapping
3. **Relationship Graph** - Visualize canon connections
4. **Search** - Client-side or Algolia integration
5. **Optional CMS Layer** - Admin UI for non-technical editors

## File Structure

```
/content                      # Canon markdown files
  /.tier1-lock.json          # Tier 1 hash lockfile
  /districts/
  /characters/
  /systems/
  /events/
  /myths/
  /world/

/public/images               # Local images for canon
  /districts/
  /characters/

/src/lib
  /content.ts                # Filesystem loader utilities
  /validator.ts              # Validation and Tier 1 protection

/app/lore
  /page.tsx                  # Canon hub
  /districts/page.tsx
  /characters/page.tsx
  /systems/page.tsx
  /[slug]/page.tsx           # Detail pages with templates

/src/components
  /CanonLayout.tsx           # Base canon layout
  /CanonTierBadge.tsx        # Tier indicator
  /Markdown.tsx              # Remark renderer

/scripts
  /validate-content.ts       # Validation script
  /update-tier1-lock.ts      # Tier 1 lockfile generator
```

## Deployment

```bash
# Validate content
npm run validate

# Build static site
npm run build

# Deploy to Vercel
vercel --prod
```

The build will fail if any validation errors occur, ensuring only valid canon reaches production.

---

**Built with**: Next.js 15, TypeScript, Zod, gray-matter, remark, Tailwind CSS
