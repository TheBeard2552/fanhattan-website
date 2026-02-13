import type { Metadata } from 'next';
import Section from '@/components/Section';
import { collectibles } from '../../data/collectibles';
import CollectionGrid from './CollectionGrid';

export const metadata: Metadata = {
  title: 'The Fanhattan Archive — Bagged Up',
  description: 'Explore every collectible unlocked across Billy\'s Big Streak, Super Streak, and seasonal drops.',
};

export default function CollectionPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide mb-4">
              The Fanhattan Archive
            </h1>
            <p className="text-xl text-muted-foreground">
              Every unlock tells a story.
            </p>
          </div>
        </div>
      </Section>
      
      {/* Collection Grid with Filters */}
      <Section>
        <CollectionGrid collectibles={collectibles} />
      </Section>
    </>
  );
}
