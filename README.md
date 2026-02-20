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

## Character Audiobook

Each character page includes an optional audio player powered by [Coqui TTS](https://github.com/coqui-ai/TTS). Audio files are pre-generated as static assets and served directly from `public/audio/characters/`.

### How it works

1. A TypeScript script (`scripts/build-character-narration.ts`) reads the markdown files in `content/characters/` and writes clean, narration-ready `.txt` files to `.generated/narration/characters/`.
2. A Python script (`scripts/tts/synthesize_character_audio.py`) feeds those `.txt` files into Coqui TTS and writes one `.wav` per character to `public/audio/characters/`.
3. The `CharacterAudioPlayer` component on each character page probes for the `.wav` and renders a play/pause bar only if it exists.

### Generating audio

**One-time Python environment setup:**

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements-tts.txt
```

**Generate/refresh all character audio (incremental):**

```bash
source .venv/bin/activate
npm run tts:generate
```

This only re-synthesizes characters whose `.txt` narration has changed since the last run.

**Force regenerate everything:**

```bash
npm run tts:generate:force
```

**Run steps separately:**

```bash
# Step 1: rebuild narration text only
npm run tts:build-narration

# Step 2: synthesize audio only (uses existing narration text)
npm run tts:synthesize
```

### Adding a new character

1. Add the markdown file to `content/characters/<slug>.md` as normal.
2. Run `npm run tts:generate` (with the venv active) to generate the new audio file.
3. Commit `public/audio/characters/<slug>.wav` alongside the markdown file.

### Changing the narrator voice

Edit the `--model` default or pass it explicitly:

```bash
python scripts/tts/synthesize_character_audio.py --model tts_models/en/ljspeech/tacotron2-DDC_ph
```

**Good single-speaker English models:**

| Model | Notes |
|-------|-------|
| `tts_models/en/ljspeech/vits` | Default — fast, natural, audiobook-quality |
| `tts_models/en/ljspeech/tacotron2-DDC_ph` | Slightly more deliberate pace |
| `tts_models/en/vctk/vits` | Multi-speaker; add `--speaker p270` |

List all available models:

```bash
python -c "from TTS.api import TTS; TTS().list_models()"
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration (for email capture)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Getting your Supabase credentials:**
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL (SUPABASE_URL)
4. Copy your service_role key (SUPABASE_SERVICE_ROLE_KEY) - **Never expose this to the client**

**Database Setup:**
Run the SQL in `supabase-setup.sql` in your Supabase SQL Editor to create the `email_signups` table.

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

## Lore Content System (Sanity CMS)

Lore content is now managed through **Sanity CMS** for a writer-friendly interface.

### Content Management
- **Studio URL**: `/studio` (invite-only access)
- **Content Types**: Characters, Districts, Artifacts, Chapters
- **Workflow**: Draft → Review → Publish
- **Auto-Revalidation**: Published content appears within 60 seconds

### For Writers
- Create and edit drafts in the Sanity Studio
- Rich text editor for long-form lore
- Tag system for organization
- Link related lore entries
- No code/markdown required

### For Publishers
- Review drafts and publish when ready
- Only administrators can publish
- Content automatically syncs to the site

### Setup Instructions
See `SANITY_SETUP.md` for detailed setup instructions including:
- Creating a Sanity project
- Inviting writers
- Configuring webhooks
- Publishing workflow

### Legacy Content
- Old MDX files in `/content` are preserved but not actively used
- Old TS data files in `/data/lore*.ts` are deprecated
- Validation scripts in `src/lib/lore/*` are replaced by Sanity schemas

## Deployment

### Vercel

1. Connect your GitHub repo to Vercel
2. Vercel auto-detects Next.js settings
3. Deploy

Build command: `npm run build` (includes validation)

## Email Capture System

The homepage includes a working email signup form that stores emails in Supabase.

### Features
- Server-side email validation and storage
- Anti-spam protection (honeypot + rate limiting)
- Duplicate prevention (unique email constraint)
- Real-time UI feedback (loading/success/error states)
- GDPR-friendly consent tracking

### Architecture
1. User submits email via `EmailForm` component
2. Form posts to `/api/subscribe` API route
3. Server validates input and checks for spam
4. Email is upserted into Supabase `email_signups` table
5. Success/error message displayed to user

### Database Schema
See `supabase-setup.sql` for the complete schema. Key fields:
- `email` (unique, lowercased)
- `created_at` (timestamp)
- `source` (e.g., "homepage")
- `consent` (boolean, default true)

### Migrating to Mailchimp Later

When you're ready to start email campaigns, you have two options:

**Option 1: CSV Export/Import**
1. Export emails from Supabase: `SELECT email, created_at FROM email_signups ORDER BY created_at`
2. Download as CSV
3. Import into Mailchimp Audience via their dashboard

**Option 2: Programmatic Sync**
Create a one-time sync script that:
1. Reads all emails from Supabase
2. Calls Mailchimp's "Add or update list member" API for each email
3. Optionally adds a `mailchimp_synced_at` timestamp to track synced records

After migration, you can either:
- Keep both systems (Supabase as source of truth)
- Switch the API route to write directly to Mailchimp
- Archive the Supabase table

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
