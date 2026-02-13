# Fanhattan v0

A Next.js-powered website for the Fanhattan universe featuring a game landing page, Riot-Universe-style lore hub, and merchandise shop.

## Features

- 🎮 **Game Landing & Play Pages**: Hero sections, feature showcases, and download CTAs
- 📖 **Lore Hub**: File-based MDX content with strict schema validation for characters, districts, and artifacts
- 🛍️ **Shop**: Product catalog with add-to-cart functionality (no payment processing yet)
- ✅ **Content Validation**: Build-time checks for schema compliance, slug uniqueness, and related links
- 🎨 **Modern Design**: Tailwind-based design system with reusable components
- 🚀 **Vercel-Ready**: Deploy with zero configuration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with gray-matter for frontmatter parsing
- **Validation**: Zod schemas with custom validation logic
- **Deployment**: Vercel (or any Node.js host)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd WebsiteV1
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm run dev` - Start development server with content validation (warn mode)
- `npm run build` - Build for production (fails if content validation errors exist)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run validate` - Run content validation only (error mode)

## Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with nav/footer
│   ├── page.tsx                 # Landing page
│   ├── play/                    # Play/download page
│   ├── lore/                    # Lore hub and type pages
│   │   ├── [type]/[slug]/       # Dynamic lore detail pages
│   │   ├── characters/
│   │   ├── districts/
│   │   └── artifacts/
│   └── shop/                    # Shop pages
│       └── [id]/                # Product detail pages
├── content/                      # MDX lore content
│   ├── characters/
│   ├── districts/
│   └── artifacts/
├── data/
│   └── products.ts              # Shop product data
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── Card.tsx
│   │   ├── Section.tsx
│   │   ├── TagFilter.tsx
│   │   ├── MDXContent.tsx
│   │   └── shop/                # Shop-specific components
│   └── lib/
│       └── lore/                # Lore content system
│           ├── types.ts
│           ├── schema.ts
│           ├── fs.ts
│           ├── validate.ts
│           └── queries.ts
├── scripts/
│   └── validate-content.ts      # Content validation CLI
└── tailwind.config.ts           # Design tokens
```

## Adding Lore Content

### Content Schema

All lore entries must be MDX files placed in the appropriate directory (`content/characters/`, `content/districts/`, or `content/artifacts/`) with valid frontmatter.

#### Required Frontmatter Fields

```yaml
---
title: string              # Display name
slug: string               # URL-safe identifier (lowercase, alphanumeric, hyphens only)
type: enum                 # Must be 'characters', 'districts', or 'artifacts'
summary: string            # Brief description (used in cards and meta tags)
tags: string[]             # Array of tags (at least one required)
related: string[]          # Array of related content slugs (can be empty)
updatedAt: string          # ISO 8601 datetime (e.g., "2026-02-13T12:00:00Z")
status: enum               # 'canon', 'apocrypha', or 'draft'
heroImage: string          # Optional image path
---
```

#### Example Lore Entry

Create `content/characters/example-character.mdx`:

```mdx
---
title: Example Character
slug: example-character
type: characters
summary: A brief description of this character that appears in card previews.
tags: [warrior, hero, faction-name]
related: [related-district, related-artifact]
updatedAt: 2026-02-13T10:00:00Z
status: canon
heroImage: /images/characters/example.jpg
---

# Example Character

Write your character lore here using full Markdown/MDX syntax.

## Section Headings

- Lists
- **Bold text**
- *Italic text*

You can use all standard Markdown features.
```

### Validation Rules

The validation system enforces:

1. **Schema Compliance**: All required fields must be present and correctly typed
2. **Slug Uniqueness**: No two entries can share the same slug (across all types)
3. **Type Matching**: The `type` field must match the directory name
4. **Related Links**: Warns if `related[]` references non-existent slugs
5. **ISO Dates**: `updatedAt` must be a valid ISO 8601 datetime

### When Validation Runs

- **Dev (`npm run dev`)**: Runs once on startup in **warn** mode (shows issues but doesn't block)
- **Build (`npm run build`)**: Runs before build in **error** mode (fails build if errors exist)
- **Manual (`npm run validate`)**: Run validation anytime in **error** mode

### Validation Output Example

```
=== Lore Content Validation Results ===

✗ [content/characters/broken.mdx] slug: Slug must be lowercase alphanumeric with hyphens
⚠ [content/districts/neon-district.mdx] Related slug "missing-character" not found in any lore entry

=======================================
Errors: 1, Warnings: 1
```

## Design System

### Tailwind Tokens

Custom CSS variables are defined in `app/globals.css` and exposed via Tailwind config:

- **Colors**: `primary`, `secondary`, `accent`, `muted`, `border`, `card`
- **Radius**: `--radius` for consistent border-radius
- **Fonts**: `--font-sans`, `--font-display`

### Reusable Components

- **`<Section>`**: Page section wrapper with consistent padding
- **`<Card>`**: Content card with optional link and hover states
- **`<TagFilter>`**: Client-side tag filtering UI
- **`<MDXContent>`**: Server-side MDX renderer using next-mdx-remote

## Shop System (v0)

The shop is a **UI-only prototype** with:

- Product data contract in `data/products.ts`
- Add-to-cart functionality with local state (React Context)
- Product grid and detail pages
- No payment processing (Phase 1 feature)

### Adding Products

Edit `data/products.ts`:

```typescript
{
  id: 'unique-product-id',
  name: 'Product Name',
  price: 29.99,
  image: '/images/products/image.jpg',  // Placeholder for v0
  description: 'Product description',
  status: 'available' | 'preorder' | 'sold-out',
  category: 'apparel' | 'art' | 'collectibles' | 'books',
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket

2. Import your repository on [Vercel](https://vercel.com)

3. Vercel will auto-detect Next.js and use these settings:
   - **Build Command**: `npm run build` (includes validation)
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. Deploy! 🚀

The build will **fail** if content validation errors exist, ensuring canon integrity.

### Other Platforms

This is a standard Next.js app and can be deployed to:

- Netlify
- Cloudflare Pages
- AWS Amplify
- Any Node.js host

Just ensure the build command is `npm run build` to enable validation.

## Environment Variables

No environment variables are required for v0. All content is file-based and shop is UI-only.

## Phase 1 Roadmap

### Payment Integration

**Option A: Headless Shopify**
- Migrate products to Shopify
- Use Shopify Storefront API
- Keep existing UI, add checkout flow

**Option B: Stripe + Supabase**
- Store products in Supabase
- Implement Stripe checkout
- Add order management
- Requires backend API routes

### Features to Add

1. **Authentication** (if needed for shop accounts)
   - NextAuth.js or Clerk
   - User profiles and order history

2. **CMS Integration** (optional)
   - Sanity or Contentful for lore content
   - Admin UI for non-technical content updates
   - Keep validation schema

3. **Enhanced Lore Features**
   - Search functionality
   - Timeline view
   - Interactive district map

4. **Shop Enhancements**
   - Inventory management
   - Order tracking
   - Email notifications
   - Product reviews

5. **Analytics**
   - Vercel Analytics (built-in)
   - Google Analytics 4
   - Content engagement tracking

## Troubleshooting

### Build Fails with Validation Errors

Check the console output for specific errors. Common issues:

- **Duplicate slugs**: Two entries have the same `slug` value
- **Type mismatch**: Entry's `type` doesn't match its directory
- **Invalid date**: `updatedAt` is not a valid ISO 8601 datetime
- **Missing fields**: Required frontmatter fields are missing

Fix the errors in your MDX files and rebuild.

### TypeScript Errors

If you see type errors:

```bash
# Delete cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Dev Server Won't Start

Ensure you're using Node.js 18+:

```bash
node --version  # Should be v18 or higher
```

## Contributing

### Content Guidelines

1. **Canon Status**: Use `status: canon` only for officially approved lore
2. **Tags**: Keep tags lowercase and hyphenated (e.g., `tech-savvy`, `neon-district`)
3. **Related Links**: Always verify related slugs exist before adding them
4. **Dates**: Use ISO format with timezone (`2026-02-13T12:00:00Z`)

### Code Guidelines

1. Follow existing TypeScript patterns
2. Use the design system components
3. Run `npm run lint` before committing
4. Ensure `npm run build` succeeds

## License

[Add your license here]

## Credits

Built with Next.js, Tailwind CSS, and TypeScript. Inspired by Riot Games' Universe hub.
