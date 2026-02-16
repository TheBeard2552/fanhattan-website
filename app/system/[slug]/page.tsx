import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getSystemBySlug,
  getStoriesBySystem,
  getArtifactTypeStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/features/lore/components/CanonTierBadge';
import { Markdown } from '@/shared/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArtifactTypeStaticPaths('system');
}

export default async function SystemPage({ params }: PageProps) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);

  if (!system) {
    notFound();
  }

  const stories = getStoriesBySystem(slug);
  
  const { frontmatter, content } = system;
  
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
      
      {/* Stories */}
      {stories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Stories Featuring This System</h2>
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
