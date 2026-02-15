import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonByCanonType } from '@/lib/content';
import CanonLayout from '@/components/CanonLayout';
import CanonTierBadge from '@/components/CanonTierBadge';

export const metadata: Metadata = {
  title: 'Myths — Fanhattan Canon',
  description: 'Stories that became legend.',
};

export default function MythsPage() {
  const myths = getCanonByCanonType('myth');
  
  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Myths
            </h1>
            <p className="text-xl text-gray-400">Stories that became legend.</p>
          </div>
          
          {myths.length > 0 ? (
            <div className="space-y-6">
              {myths.map((myth) => (
                <Link
                  key={myth.frontmatter.slug}
                  href={`/lore/${myth.frontmatter.slug}`}
                  className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                      {myth.frontmatter.title}
                    </h2>
                    <CanonTierBadge tier={myth.frontmatter.canonTier} />
                  </div>
                  <p className="text-lg text-gray-300 italic">
                    &ldquo;{myth.frontmatter.coreBelief}&rdquo;
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No myths have been canonized yet.</p>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
