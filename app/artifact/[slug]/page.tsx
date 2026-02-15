import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  getArtifactBySlug,
  getStoriesByArtifact,
  getDistrictsByArtifact,
  getCharactersByArtifactWithStories,
  getStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import { Markdown } from '@/components/MarkdownRenderer';

const ARTIFACT_TYPE_ROUTES: Record<string, string> = {
  belief: '/belief',
  conflict: '/conflict',
  faction: '/faction',
  system: '/system',
  thread: '/thread',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticPaths('artifacts');
}

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;
  const artifact = getArtifactBySlug(slug);

  if (!artifact) {
    notFound();
  }

  const { frontmatter, content } = artifact;
  const typeRoute = ARTIFACT_TYPE_ROUTES[frontmatter.artifactType];

  // Redirect to type-specific route when one exists (belief, conflict, faction, system, thread)
  if (typeRoute) {
    redirect(`${typeRoute}/${slug}`);
  }

  // Generic view for location, item, and other types without dedicated routes
  const stories = getStoriesByArtifact(slug);
  const districts = getDistrictsByArtifact(slug);
  const characters = getCharactersByArtifactWithStories(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/lore/artifacts" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
          ← Back to Artifacts
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">{frontmatter.name}</h1>
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {frontmatter.artifactType}
          </span>
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {frontmatter.description}
        </p>
        {frontmatter.status && (
          <span className={`inline-flex mt-4 px-3 py-1 text-xs rounded-full uppercase tracking-wide ${
            frontmatter.status === 'active' ? 'bg-green-500/20 text-green-400' :
            frontmatter.status === 'dormant' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {frontmatter.status}
          </span>
        )}
      </div>

      {content && (
        <section className="mb-12 prose dark:prose-invert max-w-none">
          <Markdown content={content} />
        </section>
      )}

      {districts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Connected Districts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {districts.map((district) => (
              <Link
                key={district.frontmatter.slug}
                href={`/district/${district.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold">{district.frontmatter.name}</h3>
                <CanonTierBadge tier={district.frontmatter.canonTier} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {characters.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Related Characters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((character) => (
              <Link
                key={character.frontmatter.slug}
                href={`/character/${character.frontmatter.slug}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold">{character.frontmatter.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{character.frontmatter.role}</p>
                <CanonTierBadge tier={character.frontmatter.canonTier} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Related Stories</h2>
          <div className="space-y-4">
            {stories.map((story) => (
              <Link
                key={story.frontmatter.slug}
                href={`/story/${story.frontmatter.slug}`}
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h3 className="text-xl font-semibold">{story.frontmatter.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{story.frontmatter.summary}</p>
                <CanonTierBadge tier={story.frontmatter.canonTier} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
