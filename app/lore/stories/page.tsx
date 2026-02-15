import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStories } from '@/lib/lore/resolvers';
import CanonLayout from '@/components/CanonLayout';
import { CanonTierBadge } from '@/components/CanonTierBadge';

export const metadata: Metadata = {
  title: 'Stories — Fanhattan Canon',
  description: 'Narrative events that tie the world of Fanhattan together.',
};

export default function StoriesPage() {
  const stories = getAllStories().sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link
              href="/lore"
              className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block"
            >
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Stories
            </h1>
            <p className="text-xl text-gray-400">
              Narrative events that tie the world of Fanhattan together.
            </p>
          </div>

          <div className="space-y-6">
            {stories.map((story) => (
              <Link
                key={story.frontmatter.slug}
                href={`/story/${story.frontmatter.slug}`}
                className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors mb-2">
                      {story.frontmatter.title}
                    </h2>
                    <CanonTierBadge tier={story.frontmatter.canonTier} />
                  </div>
                  {story.frontmatter.date && (
                    <span className="text-sm text-gray-500">
                      {new Date(story.frontmatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <p className="text-gray-400">{story.frontmatter.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CanonLayout>
  );
}
