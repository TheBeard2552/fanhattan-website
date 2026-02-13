import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LoreSection from '@/components/lore/LoreSection';
import Card from '@/components/Card';
import TagBadge from '@/components/lore/TagBadge';
import { getLoreByTypeAndSlug, getRelatedLore, getAllLore } from '@/lib/loreHub/queries';
import { LoreType } from '@/lib/loreHub/types';
import { getCollectibleBySlug } from '../../../../data/collectibles';

interface PageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allLore = getAllLore();
  return allLore.map((entry) => ({
    type: entry.type,
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, slug } = await params;
  const entry = getLoreByTypeAndSlug(type as LoreType, slug);

  if (!entry) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${entry.name} - Fanhattan Lore`,
    description: entry.summary,
  };
}

const typeLabels: Record<string, string> = {
  characters: 'Character',
  districts: 'District',
  artifacts: 'Artifact',
  chapters: 'Chapter',
};

const typeEmojis: Record<string, string> = {
  characters: '👤',
  districts: '🏙️',
  artifacts: '💎',
  chapters: '📖',
};

export default async function LoreDetailPage({ params }: PageProps) {
  const { type, slug } = await params;
  const entry = getLoreByTypeAndSlug(type as LoreType, slug);

  if (!entry) {
    notFound();
  }

  const relatedLore = getRelatedLore(entry.relatedLore);
  const relatedCollectibles = entry.relatedCollectibles
    .map((collectibleSlug) => getCollectibleBySlug(collectibleSlug))
    .filter((c) => c !== undefined);

  return (
    <>
      {/* Hero Section */}
      <LoreSection className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href={`/lore/${type}`} className="text-platform hover:underline font-display uppercase tracking-wide text-sm">
              ← Back to {typeLabels[type] || type}s
            </Link>
          </div>
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-platform/20 to-platform/5 rounded-lg flex items-center justify-center border-2 border-platform/20">
                <span className="text-9xl">{typeEmojis[entry.type] || '📄'}</span>
              </div>
              
              {/* Details */}
              <div className="flex flex-col justify-center">
                <div className="text-xs text-platform font-display uppercase tracking-wide mb-2">
                  {typeLabels[entry.type] || entry.type}
                </div>
                <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6">
                  {entry.name}
                </h1>
                {entry.district && (
                  <div className="mb-4">
                    <TagBadge>{entry.district}</TagBadge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LoreSection>

      {/* Summary Section */}
      <LoreSection>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-4">
            Summary
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {entry.summary}
          </p>
        </div>
      </LoreSection>

      {/* Main Body (Placeholder) */}
      <LoreSection className="bg-muted/30">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-6">
            Full Story
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground/70 leading-relaxed mb-4">
              The full lore entry for <strong>{entry.name}</strong> is being documented by the Archive District.
              This page will be updated as more information becomes available.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              In the meantime, explore the related lore and collectibles below to learn more about
              the world of Fanhattan.
            </p>
          </div>
        </div>
      </LoreSection>

      {/* Related Lore Section */}
      {relatedLore.length > 0 && (
        <LoreSection>
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-2xl font-display uppercase tracking-wide mb-2">
                Related Lore
              </h2>
              <div className="h-1 w-20 bg-platform"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedLore.map((relatedEntry) => (
                <Card 
                  key={relatedEntry.id}
                  href={`/lore/${relatedEntry.type}/${relatedEntry.slug}`}
                  className="group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-platform font-display uppercase tracking-wide mb-1">
                          {typeLabels[relatedEntry.type] || relatedEntry.type}
                        </p>
                        <h3 className="text-lg font-display uppercase tracking-wide group-hover:text-platform transition-colors">
                          {relatedEntry.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {relatedEntry.summary}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </LoreSection>
      )}

      {/* Related Collectibles Section */}
      {relatedCollectibles.length > 0 && (
        <LoreSection className="bg-muted/30">
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-2xl font-display uppercase tracking-wide mb-2">
                Related Collectibles
              </h2>
              <div className="h-1 w-20 bg-platform"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCollectibles.map((collectible) => (
                <Card 
                  key={collectible.id}
                  href={`/collection/${collectible.slug}`}
                  className="group"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <span className="text-5xl">🎴</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-display uppercase tracking-wide group-hover:text-platform transition-colors">
                      {collectible.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Season {collectible.season}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </LoreSection>
      )}
    </>
  );
}
