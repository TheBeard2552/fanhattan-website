import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { products } from '../../data/products';

export const metadata: Metadata = {
  title: 'Shop - Fanhattan Merchandise',
  description: 'Official Fanhattan merchandise including apparel, collectibles, and art prints.',
};

export default function ShopPage() {
  return (
    <>
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Shop
          </h1>
          <p className="text-xl text-muted-foreground">
            Official Fanhattan merchandise and collectibles
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} href={`/shop/${product.id}`} className="group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                <span className="text-6xl">🛍️</span>
                {product.status !== 'available' && (
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'preorder' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {product.status === 'preorder' ? 'Pre-order' : 'Sold Out'}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold font-display mb-4">
            Coming in Phase 1
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;re working on integrating with Shopify or Stripe for secure payments and order management. 
            In the meantime, enjoy browsing our product catalog!
          </p>
        </div>
      </Section>
    </>
  );
}
