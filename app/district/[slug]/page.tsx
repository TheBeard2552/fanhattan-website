import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getDistrictBySlug,
  getCharactersByDistrict,
  getStoriesByDistrict,
  getItemsByDistrict,
  getAllDistricts,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/features/lore/components/CanonTierBadge';
import { Markdown } from '@/shared/components/MarkdownRenderer';
import CanonLayout from '@/features/lore/components/CanonLayout';
import CharacterPortraitCard from '@/features/lore/components/CharacterPortraitCard';
import StoryCard from '@/features/lore/components/StoryCard';
import ArtifactCard from '@/features/lore/components/ArtifactCard';
import DistrictPrivateTruth from '@/features/lore/components/DistrictPrivateTruth';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('districts');
}

// ─── Section label component ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="font-display text-xs uppercase tracking-[0.2em] text-gray-500">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

// ─── Power structure card ──────────────────────────────────────────────────────
function PowerCard({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl bg-card border border-white/10 p-5 transition-all duration-200 hover:border-white/20"
      style={{ borderLeftColor: `${accent}40`, borderLeftWidth: '3px' }}
    >
      <p
        className="font-display text-xs uppercase tracking-[0.15em] mb-2"
        style={{ color: `${accent}cc` }}
      >
        {label}
      </p>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DistrictPage({ params }: PageProps) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  const [characters, stories, artifacts, allDistricts] = await Promise.all([
    Promise.resolve(getCharactersByDistrict(slug)),
    Promise.resolve(getStoriesByDistrict(slug)),
    Promise.resolve(getItemsByDistrict(slug)),
    Promise.resolve(getAllDistricts()),
  ]);

  const { frontmatter, content } = district;
  const accent = frontmatter.accentColor || '#1F6F78';

  // Previous / Next district navigation
  const currentIndex = allDistricts.findIndex((d) => d.frontmatter.slug === slug);
  const prevDistrict = currentIndex > 0 ? allDistricts[currentIndex - 1] : null;
  const nextDistrict =
    currentIndex < allDistricts.length - 1 ? allDistricts[currentIndex + 1] : null;

  // Tagline: prefer explicit field, fall back to description
  const tagline = frontmatter.tagline || frontmatter.description;

  // Power structure entries
  const powerEntries = frontmatter.powerStructure
    ? (
        [
          { key: 'political', label: 'Political' },
          { key: 'criminal',  label: 'Criminal'  },
          { key: 'cultural',  label: 'Cultural'  },
          { key: 'hidden',    label: 'Hidden'    },
        ] as const
      ).filter(({ key }) => !!frontmatter.powerStructure?.[key])
    : [];

  return (
    <CanonLayout>
      {/* ── 1. HERO PANEL ────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '420px' }}>
        {/* Background: cover image or gradient */}
        {frontmatter.coverImage ? (
          <>
            <img
              src={frontmatter.coverImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/60 to-black/30" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${accent}30 0%, #0e0e0e 50%, ${accent}10 100%)`,
            }}
          />
        )}

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col justify-end" style={{ minHeight: '420px' }}>
          {/* Badges */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full border-2 font-display text-xs uppercase tracking-wider bg-black/40 backdrop-blur-sm"
              style={{ borderColor: `${accent}60`, color: accent }}
            >
              District
            </span>
            <CanonTierBadge tier={frontmatter.canonTier} />
          </div>

          {/* District name */}
          <h1
            className="font-display text-6xl md:text-7xl uppercase tracking-wide text-white mb-3 leading-none"
            style={{ textShadow: `0 0 60px ${accent}50` }}
          >
            {frontmatter.name}
          </h1>

          {/* Tagline */}
          {tagline && (
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              {tagline}
            </p>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">

        {/* ── 2. DISTRICT OVERVIEW ─────────────────────────────────────────── */}
        {content && (
          <section className="py-16">
            <SectionLabel>District</SectionLabel>
            <div className="rounded-xl bg-card border border-white/10 p-8">
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-p:text-gray-300 prose-p:leading-relaxed">
                <Markdown content={content} />
              </div>
            </div>
          </section>
        )}

        {/* ── 3. THE PULSE ─────────────────────────────────────────────────── */}
        {frontmatter.pulse && (
          <section className="pb-16">
            <SectionLabel>The Pulse</SectionLabel>
            <div
              className="relative rounded-xl overflow-hidden bg-muted/50 border border-white/10 p-8"
              style={{ borderLeft: `4px solid ${accent}` }}
            >
              {/* Subtle texture shift */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, ${accent} 0px, transparent 1px, transparent 12px)`,
                }}
              />
              <p className="relative z-10 text-base text-gray-200 italic leading-loose max-w-3xl">
                &ldquo;{frontmatter.pulse}&rdquo;
              </p>
            </div>
          </section>
        )}

        {/* ── 4. PRIVATE TRUTH ─────────────────────────────────────────────── */}
        {frontmatter.privateTruth && (
          <section className="pb-16">
            <SectionLabel>Archive</SectionLabel>
            <DistrictPrivateTruth
              content={frontmatter.privateTruth}
              accentColor={accent}
            />
          </section>
        )}

        {/* ── 5. PEOPLE ────────────────────────────────────────────────────── */}
        {characters.length > 0 && (
          <section className="pb-20">
            <SectionLabel>People</SectionLabel>
            <div className="mb-6">
              <h2 className="font-display text-3xl uppercase tracking-wide text-white">
                People of the District
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Those who shape the district. Those shaped by it.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.map((character) => (
                <CharacterPortraitCard
                  key={character.frontmatter.slug}
                  character={character}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 6. STORIES ───────────────────────────────────────────────────── */}
        {stories.length > 0 && (
          <section className="pb-20">
            <SectionLabel>Stories</SectionLabel>
            <div className="mb-6">
              <h2 className="font-display text-3xl uppercase tracking-wide text-white">
                Stories
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                The episodes that define this ground.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {stories.map((story) => (
                <StoryCard
                  key={story.frontmatter.slug}
                  story={story}
                  accentColor={accent}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 7. ARTIFACTS ─────────────────────────────────────────────────── */}
        {artifacts.length > 0 && (
          <section className="pb-20">
            <SectionLabel>Artifacts</SectionLabel>
            <div className="mb-6">
              <h2 className="font-display text-3xl uppercase tracking-wide text-white">
                Artifacts
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Rare objects that anchor the myth. Each one matters.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {artifacts.map((artifact) => (
                <ArtifactCard
                  key={artifact.frontmatter.slug}
                  artifact={artifact}
                  accentColor={accent}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 8. POWER STRUCTURE (optional) ────────────────────────────────── */}
        {powerEntries.length > 0 && (
          <section className="pb-20">
            <SectionLabel>Power Structure</SectionLabel>
            <div className="mb-6">
              <h2 className="font-display text-3xl uppercase tracking-wide text-white">
                Power Structure
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {powerEntries.map(({ key, label }) => (
                <PowerCard
                  key={key}
                  label={label}
                  text={frontmatter.powerStructure![key]!}
                  accent={accent}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 9. PREV / NEXT FOOTER ────────────────────────────────────────── */}
        <div className="border-t border-white/5 py-12">
          <div className="flex items-center justify-between gap-4">
            {prevDistrict ? (
              <Link
                href={`/district/${prevDistrict.frontmatter.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-card px-6 py-4 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5 flex-1 max-w-xs"
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                    Previous
                  </p>
                  <p className="font-display text-sm uppercase tracking-wide text-white truncate group-hover:text-platform transition-colors">
                    {prevDistrict.frontmatter.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1 max-w-xs" />
            )}

            <Link
              href="/lore"
              className="font-display text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-gray-400 transition-colors"
            >
              All Districts
            </Link>

            {nextDistrict ? (
              <Link
                href={`/district/${nextDistrict.frontmatter.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-white/10 bg-card px-6 py-4 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5 flex-1 max-w-xs text-right"
              >
                <div className="min-w-0">
                  <p className="font-display text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                    Next
                  </p>
                  <p className="font-display text-sm uppercase tracking-wide text-white truncate group-hover:text-platform transition-colors">
                    {nextDistrict.frontmatter.name}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="flex-1 max-w-xs" />
            )}
          </div>
        </div>
      </div>
    </CanonLayout>
  );
}
