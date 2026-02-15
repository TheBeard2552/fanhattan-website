import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getBeliefBySlug,
  getStoriesByBelief,
  getDistrictsByBelief,
  getCharactersByBeliefDirect,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import { Markdown } from '@/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('beliefs');
}

export default async function BeliefPage({ params }: PageProps) {
  const { slug } = await params;
  const belief = getBeliefBySlug(slug);

  if (!belief) {
    notFound();
  }

  const stories = getStoriesByBelief(slug);
  const districts = getDistrictsByBelief(slug);
  const characters = getCharactersByBeliefDirect(slug);
  
  const { frontmatter, content } = belief;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">{frontmatter.name}</h1>
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {frontmatter.description}
        </p>
      </div>
      
      {/* Main Content */}
      {content && (
        <section className="mb-12 prose dark:prose-invert max-w-none">
          <Markdown content={content} />
        </section>
      )}
      
      {/* Districts */}
      {districts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Districts Connected to This Belief</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {districts.map(district => (
              <Link
                key={district.frontmatter.slug}
                href={`/district/${district.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{district.frontmatter.name}</h3>
                  <CanonTierBadge tier={district.frontmatter.canonTier} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Characters */}
      {characters.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Characters Who Hold This Belief</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map(character => (
              <Link
                key={character.frontmatter.slug}
                href={`/character/${character.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{character.frontmatter.name}</h3>
                  <CanonTierBadge tier={character.frontmatter.canonTier} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {character.frontmatter.role}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Stories */}
      {stories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Stories Exploring This Belief</h2>
          <div className="space-y-4">
            {stories.map(story => (
              <Link
                key={story.frontmatter.slug}
                href={`/story/${story.frontmatter.slug}`}
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{story.frontmatter.title}</h3>
                  <CanonTierBadge tier={story.frontmatter.canonTier} />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {story.frontmatter.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
