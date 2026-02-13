import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';
import ShopGrid from './ShopGrid';
import { products, getFeaturedLimitedDrop } from '../../data/products';
import DropBadge from '@/components/shop/DropBadge';

export const metadata: Metadata = {
  title: 'Official Fanhattan Shop — Bagged Up',
  description: 'Explore official vinyl, apparel, and limited drops from the world of Fanhattan.',
};

export default function ShopPage() {
  const featuredDrop = getFeaturedLimitedDrop();

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-wide">
              Official Fanhattan Drops
            </h1>
            <p className="text-xl md:text-2xl text-sand font-display uppercase tracking-wider">
              Earn it. Own it. Display it.
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Limited Drop */}
      {featuredDrop && (
        <Section className="pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card via-card to-muted border-2 border-platform/30 rounded-2xl overflow-hidden shadow-2xl shadow-platform/20 transition-all duration-300 hover:shadow-platform/30 hover:-translate-y-1">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Visual */}
                <div className="aspect-square md:aspect-auto bg-gradient-to-br from-platform/20 to-platform/5 flex items-center justify-center p-16 relative">
                  <div className="text-9xl opacity-60">
                    {featuredDrop.type === 'vinyl' && '🎵'}
                    {featuredDrop.type === 'apparel' && '👕'}
                    {featuredDrop.type === 'digital' && '💎'}
                    {featuredDrop.type === 'accessory' && '📌'}
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <DropBadge dropType={featuredDrop.dropType} mode={featuredDrop.mode} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <div>
                    <span className="text-sm font-display uppercase tracking-widest text-platform mb-2 block">
                      Limited Release
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display uppercase tracking-wide mb-4">
                      {featuredDrop.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredDrop.description}
                    </p>
                  </div>

                  {/* Countdown Placeholder */}
                  <div className="inline-flex items-center gap-4 text-center">
                    <div className="flex-1">
                      <div className="text-3xl font-display text-platform">48</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Hours</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-display text-platform">12</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Minutes</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-display text-platform">34</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Seconds</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-display text-platform">
                      ${featuredDrop.price.toFixed(2)}
                    </span>
                    <Button href={`/shop/${featuredDrop.slug}`} variant="primary">
                      View Drop
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Filter Bar + Product Grid (Client Component) */}
      <Section className="pt-8">
        <div className="max-w-7xl mx-auto">
          <ShopGrid products={products} />
        </div>
      </Section>
    </>
  );
}
