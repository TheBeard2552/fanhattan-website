import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllDistricts } from '@/lib/lore/resolvers';
import CanonLayout from '@/components/CanonLayout';
import { CanonTierBadge } from '@/components/CanonTierBadge';

export const metadata: Metadata = {
  title: 'Districts — Fanhattan Canon',
  description: 'The territories of power in Fanhattan.',
};

export default function DistrictsPage() {
  const districts = getAllDistricts();
  
  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Districts
            </h1>
            <p className="text-xl text-gray-400">The territories of power in Fanhattan.</p>
          </div>
          
          <div className="space-y-6">
            {districts.map((district) => (
              <Link
                key={district.frontmatter.slug}
                href={`/district/${district.frontmatter.slug}`}
                className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-2">
                      {district.frontmatter.name}
                    </h2>
                    <CanonTierBadge tier={district.frontmatter.canonTier} />
                  </div>
                </div>
                {district.frontmatter.description && (
                  <p className="text-gray-400 mb-3">
                    {district.frontmatter.description}
                  </p>
                )}
                <p className="text-lg text-gray-300 italic">
                  &ldquo;{district.frontmatter.coreBelief}&rdquo;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CanonLayout>
  );
}
