import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import RarityBadge from '@/components/collection/RarityBadge';
import ModeTag from '@/components/collection/ModeTag';
import { getCollectibleBySlug, getAllCollectibleSlugs } from '../../../data/collectibles';
import { getLoreBySlug } from '@/lib/loreHub/queries';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllCollectibleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collectible = getCollectibleBySlug(slug);

  if (!collectible) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${collectible.name} - The Fanhattan Archive`,
    description: collectible.loreSummary,
  };
}

export default async function CollectibleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collectible = getCollectibleBySlug(slug);

  if (!collectible) {
    notFound();
  }

  // Resolve related lore entries
  const relatedLore = collectible.relatedLoreSlugs
    .map((loreSlug) => getLoreBySlug(loreSlug))
    .filter((entry) => entry !== null);

  const modeLabels = {
    billy: "Billy's Big Streak",
    super: 'Super Streak',
    neutral: 'Seasonal',
  };

  const typeLabels = {
    bag: 'Bag',
    skin: 'Skin',
    artifact: 'Artifact',
    districtEdition: 'District Edition',
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/collection" className="text-platform hover:underline">
              ← Back to Archive
            </Link>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className={`
                aspect-square 
                rounded-lg 
                border-4 
                flex items-center justify-center
                ${
                  collectible.rarity === 'mythical' 
                    ? 'border-transparent bg-gradient-to-br from-rarity-epic via-rarity-mythical to-rarity-epic' 
                    : collectible.rarity === 'legendary'
                    ? 'border-rarity-legendary bg-muted'
                    : collectible.rarity === 'epic'
                    ? 'border-rarity-epic bg-muted'
                    : collectible.rarity === 'rare'
                    ? 'border-rarity-rare bg-muted'
                    : 'border-rarity-common bg-muted'
                }
              `}>
                <span className="text-9xl">🎴</span>
              </div>
              
              {/* Details */}
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-4">
                  {collectible.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <RarityBadge rarity={collectible.rarity} />
                  <ModeTag mode={collectible.mode} />
                  {collectible.isLimited && (
                    <span className="px-3 py-1 text-xs font-display uppercase tracking-wide bg-sand text-background rounded-full">
                      Limited Edition
                    </span>
                  )}
                </div>
                
                <div className="space-y-3 text-foreground/80">
                  <div>
                    <span className="text-sm text-muted-foreground">Type:</span>{' '}
                    <span className="font-medium">{typeLabels[collectible.type]}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Mode:</span>{' '}
                    <span className="font-medium">{modeLabels[collectible.mode]}</span>
                  </div>
                  {collectible.district && (
                    <div>
                      <span className="text-sm text-muted-foreground">District:</span>{' '}
                      <span className="font-medium">{collectible.district}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground">Season:</span>{' '}
                    <span className="font-medium">Season {collectible.season}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Unlock Method Section */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-4">
            How to Unlock
          </h2>
          <p className="text-lg text-foreground/80">
            {collectible.unlockMethod}
          </p>
        </div>
      </Section>

      {/* Lore Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-4">
            Lore
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {collectible.loreSummary}
          </p>
        </div>
      </Section>

      {/* Related Lore Section */}
      {relatedLore.length > 0 && (
        <Section className="bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display uppercase tracking-wide mb-6">
              Related Lore
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedLore.map((entry) => (
                <Card 
                  key={entry.slug}
                  href={`/lore/${entry.type}/${entry.slug}`}
                  className="group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                          {entry.type}
                        </p>
                        <h3 className="text-lg font-semibold group-hover:text-platform transition-colors">
                          {entry.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {entry.summary}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}
      
      {/* Unresolved lore slugs (if any) */}
      {collectible.relatedLoreSlugs.length > relatedLore.length && (
        <Section>
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Additional related lore entries are being documented...
            </p>
          </div>
        </Section>
      )}
    </>
  );
}
