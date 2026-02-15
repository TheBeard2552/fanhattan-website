import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getStoryBySlug,
  getDistrictBySlug,
  getCharacterBySlug,
  getArtifactBySlug,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import { Markdown } from '@/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('stories');
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  
  if (!story) {
    notFound();
  }
  
  const { frontmatter, content } = story;
  
  // Resolve all relationships
  const districts = frontmatter.districts.map((s: string) => getDistrictBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x);
  const characters = frontmatter.characters.map((s: string) => getCharacterBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x);
  const artifacts = frontmatter.artifacts.map((s: string) => getArtifactBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x);
  const beliefs = artifacts.filter((a) => a.frontmatter.artifactType === 'belief');
  const conflicts = artifacts.filter((a) => a.frontmatter.artifactType === 'conflict');
  const threads = artifacts.filter((a) => a.frontmatter.artifactType === 'thread');
  const factions = artifacts.filter((a) => a.frontmatter.artifactType === 'faction');
  const systems = artifacts.filter((a) => a.frontmatter.artifactType === 'system');
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">{frontmatter.title}</h1>
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {frontmatter.summary}
        </p>
      </div>
      
      {/* Main Content */}
      {content && (
        <section className="mb-12 prose dark:prose-invert max-w-none">
          <Markdown content={content} />
        </section>
      )}
      
      {/* Relationships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Districts */}
        {districts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Districts</h2>
            <div className="space-y-2">
              {districts.map(district => district && (
                <Link
                  key={district.frontmatter.slug}
                  href={`/district/${district.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{district.frontmatter.name}</span>
                    <CanonTierBadge tier={district.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Characters */}
        {characters.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Characters</h2>
            <div className="space-y-2">
              {characters.map(character => character && (
                <Link
                  key={character.frontmatter.slug}
                  href={`/character/${character.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{character.frontmatter.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {character.frontmatter.role}
                      </div>
                    </div>
                    <CanonTierBadge tier={character.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Beliefs */}
        {beliefs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Beliefs</h2>
            <div className="space-y-2">
              {beliefs.map(belief => belief && (
                <Link
                  key={belief.frontmatter.slug}
                  href={`/belief/${belief.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{belief.frontmatter.name}</span>
                    <CanonTierBadge tier={belief.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Conflicts */}
        {conflicts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Conflicts</h2>
            <div className="space-y-2">
              {conflicts.map(conflict => conflict && (
                <Link
                  key={conflict.frontmatter.slug}
                  href={`/conflict/${conflict.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{conflict.frontmatter.name}</span>
                    <CanonTierBadge tier={conflict.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Threads */}
        {threads.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Threads</h2>
            <div className="space-y-2">
              {threads.map(thread => thread && (
                <Link
                  key={thread.frontmatter.slug}
                  href={`/thread/${thread.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-green-500 dark:hover:border-green-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{thread.frontmatter.name}</span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${
                        thread.frontmatter.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        thread.frontmatter.status === 'dormant' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {thread.frontmatter.status}
                      </span>
                    </div>
                    <CanonTierBadge tier={thread.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Factions */}
        {factions.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Factions</h2>
            <div className="space-y-2">
              {factions.map(faction => faction && (
                <Link
                  key={faction.frontmatter.slug}
                  href={`/faction/${faction.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{faction.frontmatter.name}</span>
                    <CanonTierBadge tier={faction.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Systems */}
        {systems.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Systems</h2>
            <div className="space-y-2">
              {systems.map(system => system && (
                <Link
                  key={system.frontmatter.slug}
                  href={`/system/${system.frontmatter.slug}`}
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{system.frontmatter.name}</span>
                    <CanonTierBadge tier={system.frontmatter.canonTier} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
