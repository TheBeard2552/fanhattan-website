# Bagged Up - A Collectible Universe

A Next.js-powered platform for Bagged Up featuring a collectible-first universe, game modes, lore hub, and merchandise shop.

## Brand System

### Core Identity

Bagged Up is built on a **collectible-first** platform with a muted, energetic brand that scales across multiple game modes, a lore universe, and physical/digital drops.

**Platform Colors:**
- **Asphalt** (`#0E0F11`) - Background
- **Stadium Teal** (`#1F6F78`) - Primary platform accent
- **Paper Sand** (`#E5D3B3`) - Secondary neutral accent
- **Text Primary** (`#F4F4F4`) - Main text
- **Text Muted** (`#6B7280`) - Secondary text

**Critical Rule:** Heat orange is **NOT** a global brand color. It appears only within Billy's Big Streak mode.

### Mode Color System (Isolated)

Mode colors are **isolated** to prevent leakage into global components.

**Billy's Big Streak:**
- Heat Orange: `#FF5A1F`
- Glow: `#FF7A3F`
- Usage: Only within `ModeCard` component when `mode="billy"`

**Super Streak:**
- Electric Blue: `#00D9FF`
- Glow: `#33E4FF`
- Usage: Only within `ModeCard` component when `mode="super"`

**Implementation:**
- Mode colors live under `colors.mode.*` in Tailwind config
- Only `ModeCard.tsx` may reference these colors
- Global components (Nav, Button, Card, Section) must never use `mode.*` tokens

### Rarity System

Collectibles use a scalable rarity system:

| Rarity | Color | Hex |
|--------|-------|-----|
| Common | Gray | `#9CA3AF` |
| Rare | Blue | `#3B82F6` |
| Epic | Purple | `#8B5CF6` |
| Legendary | Gold | `#F59E0B` |
| Mythical | Pink/Holo | `#EC4899` |

**Usage:**
- `CollectibleCard` borders and badges
- Shop product frames
- UI rarity indicators
- Digital card treatments

### Typography System

**Headline Font:** Lilita One (Google Font)
- All H1, H2, H3
- Navigation links
- Buttons
- Uppercase + tracking-wide

**Body Font:** Inter (Google Font)
- Paragraphs
- Forms
- Metadata
- Weights: 400, 500, 600

**Implementation:**
- Fonts loaded via `next/font/google` in `app/layout.tsx`
- CSS variables: `--font-display`, `--font-sans`
- Tailwind: `font-display`, `font-sans`

### Design Rules

**Headlines:**
- Uppercase
- `tracking-wide`
- Large scale (H1: `text-5xl+`, H2: `text-3xl-4xl`)
- Generous spacing

**Buttons:**
- `font-display uppercase tracking-wide`
- Tactile: shadow + hover lift + active press
- Variants: primary (teal), secondary (sand), ghost

**Cards:**
- Border + shadow for tactile feel
- `hover:-translate-y-0.5` lift effect
- Collectible cards use rarity border colors

## Project Structure

```
├── app/
│   ├── layout.tsx           # Font setup (Lilita One + Inter)
│   ├── globals.css          # Design tokens
│   ├── page.tsx             # Homepage
│   ├── play/                # Play/download page
│   ├── lore/                # Lore hub
│   └── shop/                # Shop pages
├── src/components/
│   ├── Button.tsx           # Primary button component
│   ├── CollectibleCard.tsx  # Collectible display card
│   ├── ModeCard.tsx         # Game mode card (only component using mode.* colors)
│   ├── Nav.tsx              # Global navigation
│   ├── Card.tsx             # Generic card component
│   ├── Section.tsx          # Page section wrapper
│   └── Footer.tsx           # Global footer
├── content/                  # MDX lore content
├── data/
│   └── products.ts          # Shop product data
└── tailwind.config.ts       # Design tokens config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Scripts

- `npm run dev` - Start dev server with content validation
- `npm run build` - Production build with validation
- `npm start` - Start production server
- `npm run validate` - Validate lore content only

## Design System Extension

### Adding a New Mode

1. Add mode colors to `app/globals.css`:
```css
--mode-newmode-primary: #HEX;
--mode-newmode-glow: #HEX;
```

2. Add to `tailwind.config.ts`:
```typescript
mode: {
  newmode: {
    primary: 'var(--mode-newmode-primary)',
    glow: 'var(--mode-newmode-glow)',
  },
}
```

3. Update `ModeCard.tsx` to accept new mode:
```typescript
mode: 'billy' | 'super' | 'newmode'
```

### Adding a New Rarity

1. Add rarity color to `app/globals.css`:
```css
--rarity-special: #HEX;
```

2. Add to `tailwind.config.ts`:
```typescript
rarity: {
  special: 'var(--rarity-special)',
}
```

3. Update `CollectibleCard.tsx` to accept new rarity.

### Creating New Components

**Rules:**
- Use `font-display` for headlines/buttons
- Use `font-sans` for body text
- Never use `mode.*` colors outside `ModeCard`
- Use platform colors (teal/sand) for global UI
- Apply tactile effects: shadows + hover lift

**Example:**
```tsx
<button className="
  font-display uppercase tracking-wide
  bg-platform text-white
  px-8 py-3 rounded-lg
  shadow-lg hover:-translate-y-0.5
  transition-all
">
  Action
</button>
```

## Lore Content System

Lore entries are MDX files in `/content` with strict validation.

**Required frontmatter:**
- `title`, `slug`, `type`, `summary`, `tags[]`, `related[]`, `updatedAt`, `status`

**Validation:**
- Runs on dev start (warn mode)
- Runs on build (error mode - fails if invalid)
- `npm run validate` - manual check

See original README sections for detailed lore documentation.

## Deployment

### Vercel

1. Connect your GitHub repo to Vercel
2. Vercel auto-detects Next.js settings
3. Deploy

Build command: `npm run build` (includes validation)

## Phase 1 Roadmap

### Payment Integration
- Headless Shopify or Stripe + Supabase
- Order management
- Digital collectible delivery

### Enhanced Features
- Authentication (NextAuth.js)
- User profiles + collection showcase
- Streak tracking + leaderboards
- Seasonal drops + limited editions

### Lore Expansion
- Interactive district map
- Timeline view
- Character relationships graph

## License

[Add your license here]

## Credits

Built with Next.js, Tailwind CSS, TypeScript, and Google Fonts (Lilita One + Inter).
