import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import AddToCartButton from '@/components/shop/AddToCartButton';
import DropBadge from '@/components/shop/DropBadge';
import RarityBadge from '@/components/collection/RarityBadge';
import { products, getProductBySlug } from '../../../data/products';
import { getLoreBySlug } from '@/lib/lore/queries';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} — Official Fanhattan Shop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Resolve related lore entries
  const relatedLoreEntries = product.relatedLore
    .map((loreSlug) => getLoreBySlug(loreSlug))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  // Resolve related collectible if exists
  const relatedCollectible = product.relatedCollectible 
    ? getProductBySlug(product.relatedCollectible)
    : null;

  return (
    <>
      {/* Back Navigation */}
      <Section className="pt-32 pb-0" container={false}>
        <div className="container mx-auto px-4">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-platform hover:text-platform/80 transition-colors font-display uppercase tracking-wider text-sm"
          >
            ← Back to Shop
          </Link>
        </div>
      </Section>

      {/* Product Hero */}
      <Section className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-muted to-card rounded-2xl flex items-center justify-center p-16 border-2 border-border sticky top-8">
              <div className="text-[12rem] opacity-60">
                {product.type === 'vinyl' && '🎵'}
                {product.type === 'apparel' && '👕'}
                {product.type === 'digital' && '💎'}
                {product.type === 'accessory' && '📌'}
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-8">
            {/* Category & Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                {product.type}
              </span>
              {product.dropType !== 'standard' && (
                <DropBadge dropType={product.dropType} mode={product.mode} />
              )}
              {product.type === 'digital' && product.rarity && (
                <RarityBadge rarity={product.rarity} />
              )}
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-display text-platform">
                  ${product.price.toFixed(2)}
                </p>
                {product.isSoldOut && (
                  <span className="text-sm uppercase tracking-wider text-muted-foreground font-display">
                    Sold Out
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            <div>
              <AddToCartButton product={product} className="w-full md:w-auto min-w-[280px]" />
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-8 space-y-4">
              <h3 className="font-display uppercase tracking-wider text-sm text-muted-foreground">
                Product Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-start">
                  <dt className="text-muted-foreground w-32 font-display uppercase tracking-wider text-xs">Type:</dt>
                  <dd className="capitalize">{product.type}</dd>
                </div>
                <div className="flex items-start">
                  <dt className="text-muted-foreground w-32 font-display uppercase tracking-wider text-xs">Drop:</dt>
                  <dd className="capitalize">{product.dropType}</dd>
                </div>
                {product.mode && (
                  <div className="flex items-start">
                    <dt className="text-muted-foreground w-32 font-display uppercase tracking-wider text-xs">Mode:</dt>
                    <dd className="capitalize">{product.mode}</dd>
                  </div>
                )}
                {product.rarity && (
                  <div className="flex items-start">
                    <dt className="text-muted-foreground w-32 font-display uppercase tracking-wider text-xs">Rarity:</dt>
                    <dd className="capitalize">{product.rarity}</dd>
                  </div>
                )}
                <div className="flex items-start">
                  <dt className="text-muted-foreground w-32 font-display uppercase tracking-wider text-xs">SKU:</dt>
                  <dd className="font-mono text-xs">{product.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Content */}
      {(relatedLoreEntries.length > 0 || relatedCollectible) && (
        <Section className="bg-muted/30">
          <div className="max-w-4xl space-y-12">
            {/* Related Lore */}
            {relatedLoreEntries.length > 0 && (
              <div>
                <h2 className="text-2xl font-display uppercase tracking-wider mb-6">
                  Related Lore
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedLoreEntries.map((loreEntry) => (
                    <Link
                      key={loreEntry.frontmatter.slug}
                      href={`/lore/${loreEntry.frontmatter.type}/${loreEntry.frontmatter.slug}`}
                      className="group block p-6 bg-card border-2 border-border rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-platform/50"
                    >
                      <div className="mb-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {loreEntry.frontmatter.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-display uppercase tracking-wide mb-2 group-hover:text-platform transition-colors">
                        {loreEntry.frontmatter.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {loreEntry.frontmatter.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Collectible */}
            {relatedCollectible && (
              <div>
                <h2 className="text-2xl font-display uppercase tracking-wider mb-6">
                  Related Collectible
                </h2>
                <Link
                  href={`/shop/${relatedCollectible.slug}`}
                  className="group block p-6 bg-card border-2 border-border rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-platform/50"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-muted to-card rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-4xl opacity-60">
                        {relatedCollectible.type === 'vinyl' && '🎵'}
                        {relatedCollectible.type === 'apparel' && '👕'}
                        {relatedCollectible.type === 'digital' && '💎'}
                        {relatedCollectible.type === 'accessory' && '📌'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display uppercase tracking-wide mb-1 group-hover:text-platform transition-colors">
                        {relatedCollectible.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {relatedCollectible.description}
                      </p>
                      <p className="text-xl font-display text-platform">
                        ${relatedCollectible.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
