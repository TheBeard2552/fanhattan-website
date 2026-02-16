import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCanonBySlug, getStaticSlugs, getRelatedEntries, getCharactersByDistrict, getSection } from '@/lib/content';
import CanonLayout from '@/features/lore/components/CanonLayout';
import CanonTierBadge from '@/features/lore/components/CanonTierBadge';
import Markdown from '@/shared/components/Markdown';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getStaticSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCanonBySlug(slug);

  if (!entry) {
    return { title: 'Not Found' };
  }

  return {
    title: `${entry.frontmatter.title} — Fanhattan Canon`,
    description: entry.frontmatter.coreBelief,
  };
}

export default async function CanonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCanonBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { frontmatter, sections } = entry;
  const relatedEntries = getRelatedEntries(entry);

  // Type-specific rendering
  if (frontmatter.type === 'district') {
    const districtCharacters = getCharactersByDistrict(slug);
    
    return (
      <CanonLayout>
        {/* Hero with full-width image */}
        <section className="relative h-[60vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0e0e0e]" />
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
          <div className="relative container mx-auto px-4 pb-12 z-10">
            <CanonTierBadge tier={frontmatter.canonTier} />
            <h1 className="font-display text-6xl md:text-7xl uppercase tracking-tight mt-4 text-white">
              {frontmatter.title}
            </h1>
          </div>
        </section>

        {/* Core Belief */}
        <section className="bg-platform/10 border-y-2 border-platform/30">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-sm uppercase tracking-widest text-platform mb-4">
                Core Belief
              </h2>
              <p className="text-3xl md:text-4xl font-light leading-relaxed text-white">
                {frontmatter.coreBelief}
              </p>
            </div>
          </div>
        </section>

        {/* District Sections */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-16">
            {['Core Belief', 'How Power Is Earned', 'What They Control', 'What They Fear', 'Visual Identity', 'Rival Districts', 'Unspoken Truth'].map((sectionName) => {
              const content = getSection(entry, sectionName);
              if (!content || sectionName === 'Core Belief') return null;
              
              return (
                <div key={sectionName}>
                  <h2 className="font-display text-3xl uppercase tracking-wide mb-6 text-white border-b-2 border-platform/30 pb-3">
                    {sectionName}
                  </h2>
                  <Markdown content={content} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Characters */}
        {districtCharacters.length > 0 && (
          <section className="bg-white/5 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl uppercase tracking-wide mb-8 text-white">
                  Notable Residents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {districtCharacters.map((character) => (
                    <Link
                      key={character.frontmatter.slug}
                      href={`/lore/${character.frontmatter.slug}`}
                      className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-6 hover:border-platform/50 transition-all"
                    >
                      <h3 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                        {character.frontmatter.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Canon */}
        {relatedEntries.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl uppercase tracking-wide mb-8 text-white">
                Related Canon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedEntries.map((related) => (
                  <Link
                    key={related.frontmatter.slug}
                    href={`/lore/${related.frontmatter.slug}`}
                    className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-6 hover:border-platform/50 transition-all"
                  >
                    <div className="text-xs text-platform uppercase tracking-wide mb-2">
                      {related.frontmatter.type}
                    </div>
                    <h3 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                      {related.frontmatter.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </CanonLayout>
    );
  }

  if (frontmatter.type === 'character') {
    const districtEntry = frontmatter.district ? getCanonBySlug(frontmatter.district) : null;
    
    return (
      <CanonLayout>
        {/* Hero */}
        <section className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-5xl mx-auto">
            <Link href="/lore/characters" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-8 inline-block">
              ← Back to Characters
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Portrait */}
              <div className="md:col-span-2">
                <div className="aspect-[3/4] relative bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-lg overflow-hidden">
                  <Image
                    src={frontmatter.coverImage}
                    alt={frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Info */}
              <div className="md:col-span-3 flex flex-col justify-center">
                {districtEntry && (
                  <Link
                    href={`/lore/${districtEntry.frontmatter.slug}`}
                    className="inline-flex items-center text-platform hover:underline font-display uppercase tracking-wide text-sm mb-4"
                  >
                    {districtEntry.frontmatter.title}
                  </Link>
                )}
                <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-6 text-white">
                  {frontmatter.title}
                </h1>
                <CanonTierBadge tier={frontmatter.canonTier} />
              </div>
            </div>
          </div>
        </section>

        {/* Character Sections */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-16">
            {['What They Want', 'What Stands In Their Way', 'Reputation (Street Truth)', 'Private Truth'].map((sectionName) => {
              const content = getSection(entry, sectionName);
              if (!content) return null;
              
              return (
                <div key={sectionName}>
                  <h2 className="font-display text-3xl uppercase tracking-wide mb-6 text-white border-b-2 border-platform/30 pb-3">
                    {sectionName}
                  </h2>
                  <Markdown content={content} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Canon */}
        {relatedEntries.length > 0 && (
          <section className="bg-white/5 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl uppercase tracking-wide mb-8 text-white">
                  Related Canon
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedEntries.map((related) => (
                    <Link
                      key={related.frontmatter.slug}
                      href={`/lore/${related.frontmatter.slug}`}
                      className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-6 hover:border-platform/50 transition-all"
                    >
                      <div className="text-xs text-platform uppercase tracking-wide mb-2">
                        {related.frontmatter.type}
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                        {related.frontmatter.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </CanonLayout>
    );
  }

  // Generic template for other types (system, world, event, myth)
  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-8 inline-block">
            ← Back to Canon
          </Link>
          
          <div className="mb-8">
            <div className="text-xs text-platform uppercase tracking-widest mb-2">
              {frontmatter.type}
            </div>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-6 text-white">
              {frontmatter.title}
            </h1>
            <CanonTierBadge tier={frontmatter.canonTier} />
          </div>

          <div className="bg-platform/10 border-l-4 border-platform p-8 mb-12">
            <p className="text-2xl font-light leading-relaxed text-white italic">
              {frontmatter.coreBelief}
            </p>
          </div>

          <Markdown content={entry.content} />

          {relatedEntries.length > 0 && (
            <div className="mt-20 pt-12 border-t-2 border-white/10">
              <h2 className="font-display text-3xl uppercase tracking-wide mb-8 text-white">
                Related Canon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedEntries.map((related) => (
                  <Link
                    key={related.frontmatter.slug}
                    href={`/lore/${related.frontmatter.slug}`}
                    className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-6 hover:border-platform/50 transition-all"
                  >
                    <div className="text-xs text-platform uppercase tracking-wide mb-2">
                      {related.frontmatter.type}
                    </div>
                    <h3 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                      {related.frontmatter.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
