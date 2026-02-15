import Link from 'next/link';
import {
  getAllDistricts,
  getAllCharacters,
  getAllStories,
  getAllBeliefs,
  getAllConflicts,
  getAllThreads,
  getAllFactions,
  getAllSystems,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/components/CanonTierBadge';

export default function LoreIndexPage() {
  const districts = getAllDistricts();
  const characters = getAllCharacters();
  const stories = getAllStories();
  const beliefs = getAllBeliefs();
  const conflicts = getAllConflicts();
  const threads = getAllThreads();
  const factions = getAllFactions();
  const systems = getAllSystems();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-6xl font-bold mb-4">Fanhattan Lore</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A relational narrative engine where beliefs shape districts, characters drive stories, 
          and every connection is meaningful.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stories */}
        {stories.length > 0 && (
          <section className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">📖</span>
              Stories
            </h2>
            <div className="space-y-4">
              {stories.map(story => (
                <Link
                  key={story.frontmatter.slug}
                  href={`/story/${story.frontmatter.slug}`}
                  className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-semibold">{story.frontmatter.title}</h3>
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

        {/* Districts */}
        {districts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">🏛️</span>
              Districts
            </h2>
            <div className="space-y-3">
              {districts.map(district => (
                <Link
                  key={district.frontmatter.slug}
                  href={`/district/${district.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{district.frontmatter.name}</h3>
                    <CanonTierBadge tier={district.frontmatter.canonTier} />
                  </div>
                  {district.frontmatter.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {district.frontmatter.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Characters */}
        {characters.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">👤</span>
              Characters
            </h2>
            <div className="space-y-3">
              {characters.map(character => (
                <Link
                  key={character.frontmatter.slug}
                  href={`/character/${character.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{character.frontmatter.name}</h3>
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

        {/* Beliefs */}
        {beliefs.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">💭</span>
              Beliefs
            </h2>
            <div className="space-y-3">
              {beliefs.map(belief => (
                <Link
                  key={belief.frontmatter.slug}
                  href={`/belief/${belief.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{belief.frontmatter.name}</h3>
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
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">⚔️</span>
              Factions
            </h2>
            <div className="space-y-3">
              {factions.map(faction => (
                <Link
                  key={faction.frontmatter.slug}
                  href={`/faction/${faction.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{faction.frontmatter.name}</h3>
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

        {/* Conflicts */}
        {conflicts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">⚡</span>
              Conflicts
            </h2>
            <div className="space-y-3">
              {conflicts.map(conflict => (
                <Link
                  key={conflict.frontmatter.slug}
                  href={`/conflict/${conflict.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{conflict.frontmatter.name}</h3>
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
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">🧵</span>
              Threads
            </h2>
            <div className="space-y-3">
              {threads.map(thread => (
                <Link
                  key={thread.frontmatter.slug}
                  href={`/thread/${thread.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{thread.frontmatter.name}</h3>
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

        {/* Systems */}
        {systems.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">⚙️</span>
              Systems
            </h2>
            <div className="space-y-3">
              {systems.map(system => (
                <Link
                  key={system.frontmatter.slug}
                  href={`/system/${system.frontmatter.slug}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{system.frontmatter.name}</h3>
                    <CanonTierBadge tier={system.frontmatter.canonTier} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {system.frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
