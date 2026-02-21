import {
  getAllDistricts,
  getCharactersByDistrict,
  getStoriesByDistrict,
  getItemsByDistrict,
} from '@/lib/lore/resolvers';
import DistrictsLandingClient from '@/features/lore/components/DistrictsLandingClient';
import type { DistrictViewModel } from '@/features/lore/components/DistrictsLandingClient';
import type { DistrictEntry } from '@/lib/lore/types';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Infer lore-based filter flags from district text fields without touching content. */
function inferFlags(d: DistrictEntry): DistrictViewModel['inferredFlags'] {
  const combined = [
    d.frontmatter.powerStructure?.political,
    d.frontmatter.powerStructure?.criminal,
    d.frontmatter.powerStructure?.cultural,
    d.frontmatter.powerStructure?.hidden,
    d.frontmatter.pulse,
    d.frontmatter.privateTruth,
    d.frontmatter.coreBelief,
    d.frontmatter.description,
    d.frontmatter.tagline,
    d.content,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return {
    highSyndicateInfluence: combined.includes('syndicate'),
    highResistanceActivity: combined.includes('resistance'),
    anomalous: /anomal/.test(combined),
  };
}

/** Build a short teaser: tagline → pulse → description → first ~240 chars of content. */
function extractTeaser(d: DistrictEntry): string {
  if (d.frontmatter.tagline) return d.frontmatter.tagline;
  if (d.frontmatter.pulse) return d.frontmatter.pulse;
  if (d.frontmatter.description) return d.frontmatter.description;

  // Strip common markdown and collapse whitespace
  const stripped = d.content
    .replace(/^#+\s+.+$/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();

  return stripped.length > 240 ? `${stripped.slice(0, 240)}…` : stripped;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DistrictsPage() {
  const districts = getAllDistricts();

  const viewModels: DistrictViewModel[] = districts.map((d) => {
    const slug = d.frontmatter.slug;
    const people = getCharactersByDistrict(slug).slice(0, 3);
    const stories = getStoriesByDistrict(slug).slice(0, 2);
    const artifacts = getItemsByDistrict(slug).slice(0, 2);

    return {
      slug,
      name: d.frontmatter.name,
      tagline: d.frontmatter.tagline ?? null,
      coreBelief: d.frontmatter.coreBelief,
      description: d.frontmatter.description ?? null,
      accentColor: d.frontmatter.accentColor ?? '#1F6F78',
      canonTier: d.frontmatter.canonTier,
      illustrationSrc: (() => {
        const src = d.frontmatter.thumbnail ?? d.frontmatter.coverImage ?? null;
        // Treat the legacy generic placeholder as "no image" so the card uses its own landscape placeholder.
        return src === '/images/placeholder.svg' ? null : src;
      })(),
      teaser: extractTeaser(d),
      peoplePreview: people.map((c) => ({
        slug: c.frontmatter.slug,
        name: c.frontmatter.name,
        role: c.frontmatter.role,
      })),
      storiesPreview: stories.map((s) => ({
        slug: s.frontmatter.slug,
        title: s.frontmatter.title,
      })),
      artifactsPreview: artifacts.map((a) => ({
        slug: a.frontmatter.slug,
        name: a.frontmatter.name,
      })),
      inferredFlags: inferFlags(d),
    };
  });

  return <DistrictsLandingClient districts={viewModels} />;
}
