import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCharacters } from '@/lib/lore/resolvers';
import CanonLayout from '@/components/CanonLayout';
import { CanonTierBadge } from '@/components/CanonTierBadge';

export const metadata: Metadata = {
  title: 'Characters — Fanhattan Canon',
  description: 'Those who shape the city.',
};

export default function CharactersPage() {
  const characters = getAllCharacters();
  
  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Characters
            </h1>
            <p className="text-xl text-gray-400">Those who shape the city.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <Link
                key={character.frontmatter.slug}
                href={`/character/${character.frontmatter.slug}`}
                className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-6 hover:border-platform/50 transition-all duration-300"
              >
                <h2 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-3">
                  {character.frontmatter.name}
                </h2>
                {character.frontmatter.role && (
                  <div className="text-sm text-gray-400 mb-2">
                    {character.frontmatter.role}
                  </div>
                )}
                {character.frontmatter.district && (
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                    {character.frontmatter.district}
                  </div>
                )}
                <CanonTierBadge tier={character.frontmatter.canonTier} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CanonLayout>
  );
}
