import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Official Fanhattan Shop — Bagged Up',
  description: 'Explore official vinyl, apparel, and limited drops from the world of Fanhattan.',
};

export default function ShopPage() {
  return (
    <Section className="pt-32 pb-32 min-h-[60vh]" container={false}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-wide">
            Shop Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-display uppercase tracking-wider">
            Official vinyl, apparel, and limited drops are on the way.
          </p>
          <p className="text-lg text-muted-foreground/80">
            Earn it. Own it. Display it.
          </p>
          <div className="pt-4">
            <Button variant="secondary" href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
