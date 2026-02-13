import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import MDXContent from '@/components/MDXContent';
import { getLore, getRelatedLore, getAllLore } from '@/lib/lore/queries';
import { LoreType } from '@/lib/lore/types';

interface PageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allLore = getAllLore();
  return allLore.map((entry) => ({
    type: entry.frontmatter.type,
    slug: entry.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, slug } = await params;
  const entry = getLore(type as LoreType, slug);

  if (!entry) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${entry.frontmatter.title} - Fanhattan Lore`,
    description: entry.frontmatter.summary,
  };
}

export default async function LoreDetailPage({ params }: PageProps) {
  const { type, slug } = await params;
  const entry = getLore(type as LoreType, slug);

  if (!entry) {
    notFound();
  }

  const related = getRelatedLore(entry.frontmatter.related);
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href={`/lore/${type}`} className="text-primary hover:underline">
              ← Back to {typeLabel}
            </Link>
          </div>
          <div className="max-w-4xl">
            <div className="flex items-start gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold font-display">
                {entry.frontmatter.title}
              </h1>
              <span className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                entry.frontmatter.status === 'canon' ? 'bg-primary/20 text-primary' :
                entry.frontmatter.status === 'apocrypha' ? 'bg-muted text-muted-foreground' :
                'bg-secondary text-secondary-foreground'
              }`}>
                {entry.frontmatter.status}
              </span>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              {entry.frontmatter.summary}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {entry.frontmatter.tags.map((tag) => (
                <Link 
                  key={tag}
                  href={`/lore/${type}?tag=${tag}`}
                  className="text-sm px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(entry.frontmatter.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl">
          <MDXContent source={entry.content} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-muted/30">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold font-display mb-6">Related Lore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((relatedEntry) => (
                <Card 
                  key={relatedEntry.frontmatter.slug}
                  href={`/lore/${relatedEntry.frontmatter.type}/${relatedEntry.frontmatter.slug}`}
                  className="group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {relatedEntry.frontmatter.type}
                        </p>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {relatedEntry.frontmatter.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {relatedEntry.frontmatter.summary}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
