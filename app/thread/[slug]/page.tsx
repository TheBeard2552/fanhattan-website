import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getThreadBySlug,
  getStoriesByThread,
  getArtifactTypeStaticPaths,
} from '@/lib/lore/resolvers';
import { CanonTierBadge } from '@/components/CanonTierBadge';
import { Markdown } from '@/components/MarkdownRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArtifactTypeStaticPaths('thread');
}

export default async function ThreadPage({ params }: PageProps) {
  const { slug } = await params;
  const thread = getThreadBySlug(slug);

  if (!thread) {
    notFound();
  }

  const stories = getStoriesByThread(slug);
  
  const { frontmatter, content } = thread;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">{frontmatter.name}</h1>
          <span className={`text-sm px-3 py-1 rounded-full ${
            frontmatter.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            frontmatter.status === 'dormant' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
          }`}>
            {frontmatter.status}
          </span>
          <CanonTierBadge tier={frontmatter.canonTier} />
        </div>
        
        {frontmatter.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {frontmatter.description}
          </p>
        )}
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
          <h2 className="text-2xl font-bold mb-4">Stories in This Thread</h2>
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
