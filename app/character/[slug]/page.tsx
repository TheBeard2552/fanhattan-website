import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getCharacterBySlug,
  getDistrictBySlug,
  getStoriesByCharacter,
  getBeliefsByCharacter,
  getFactionsByCharacter,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import { Markdown } from '@/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('characters');
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  
  if (!character) {
    notFound();
  }
  
  const district = getDistrictBySlug(character.frontmatter.district);
  const stories = getStoriesByCharacter(slug);
  const beliefs = getBeliefsByCharacter(slug);
  const factions = getFactionsByCharacter(slug);
  
  const { frontmatter, content } = character;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">{frontmatter.name}</h1>
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        
        <div className="flex flex-wrap gap-4 text-lg">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Role:</span>{' '}
            <span className="font-semibold">{frontmatter.role}</span>
          </div>
          {district && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">District:</span>{' '}
              <Link
                href={`/district/${district.frontmatter.slug}`}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {district.frontmatter.name}
              </Link>
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
              Reputation
            </div>
            <div className="text-blue-800 dark:text-blue-300">
              {frontmatter.reputation}
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-1">
              Private Truth
            </div>
            <div className="text-purple-800 dark:text-purple-300">
              {frontmatter.privateTruth}
            </div>
          </div>
        </div>
      </div>
      
      {/* Beliefs */}
      {beliefs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Beliefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beliefs.map(belief => (
              <Link
                key={belief.frontmatter.slug}
                href={`/belief/${belief.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{belief.frontmatter.name}</h3>
                  <CanonTierBadge tier={belief.frontmatter.canonTier} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {belief.frontmatter.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Factions */}
      {factions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Factions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factions.map(faction => (
              <Link
                key={faction.frontmatter.slug}
                href={`/faction/${faction.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{faction.frontmatter.name}</h3>
                  <CanonTierBadge tier={faction.frontmatter.canonTier} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faction.frontmatter.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Main Content */}
      {content && (
        <section className="mb-12 prose dark:prose-invert max-w-none">
          <Markdown content={content} />
        </section>
      )}
      
      {/* Stories */}
      {stories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Appears In</h2>
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
