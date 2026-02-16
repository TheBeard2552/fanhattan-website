import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getDistrictBySlug,
  getCharactersByDistrict,
  getStoriesByDistrict,
  getBeliefsByDistrict,
  getConflictsByDistrict,
  getThreadsByDistrict,
  getRivalDistricts,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/features/lore/components/CanonTierBadge';
import { Markdown } from '@/shared/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('districts');
}

export default async function DistrictPage({ params }: PageProps) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);
  
  if (!district) {
    notFound();
  }
  
  const characters = getCharactersByDistrict(slug);
  const stories = getStoriesByDistrict(slug);
  const beliefs = getBeliefsByDistrict(slug);
  const conflicts = getConflictsByDistrict(slug);
  const threads = getThreadsByDistrict(slug);
  const rivals = getRivalDistricts(slug);
  
  const { frontmatter, content } = district;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">{frontmatter.name}</h1>
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        
        {frontmatter.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {frontmatter.description}
          </p>
        )}
        
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded">
          <div className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
            Core Belief
          </div>
          <div className="text-amber-800 dark:text-amber-300">
            {frontmatter.coreBelief}
          </div>
        </div>
      </div>
      
      {/* Rival Districts */}
      {rivals.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Rival Districts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rivals.map(rival => (
              <Link
                key={rival.frontmatter.slug}
                href={`/district/${rival.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{rival.frontmatter.name}</h3>
                  <CanonTierBadge tier={rival.frontmatter.canonTier} />
                </div>
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
      
      {/* Characters */}
      {characters.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Characters</h2>
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
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {character.frontmatter.reputation}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
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
      
      {/* Conflicts */}
      {conflicts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Conflicts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conflicts.map(conflict => (
              <Link
                key={conflict.frontmatter.slug}
                href={`/conflict/${conflict.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{conflict.frontmatter.name}</h3>
                  <CanonTierBadge tier={conflict.frontmatter.canonTier} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {conflict.frontmatter.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Threads */}
      {threads.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Active Threads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {threads.map(thread => (
              <Link
                key={thread.frontmatter.slug}
                href={`/thread/${thread.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{thread.frontmatter.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      thread.frontmatter.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      thread.frontmatter.status === 'dormant' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {thread.frontmatter.status}
                    </span>
                    <CanonTierBadge tier={thread.frontmatter.canonTier} />
                  </div>
                </div>
                {thread.frontmatter.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {thread.frontmatter.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Stories */}
      {stories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Stories</h2>
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
