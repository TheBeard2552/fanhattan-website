import type { Metadata } from 'next';
import Link from 'next/link';
import LoreHero from '@/components/lore/LoreHero';
import LoreSection from '@/components/lore/LoreSection';
import CategoryCard from '@/components/lore/CategoryCard';
import TimelineItem from '@/components/lore/TimelineItem';
import LoreCard from '@/components/lore/LoreCard';
import { getFeaturedLore, getTimelineLore, getLoreTypeCounts } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'The Lore of Fanhattan — Bagged Up',
  description: 'Explore the districts, characters, artifacts, and stories that shape the world of Fanhattan.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function LorePage() {
  const featured = await getFeaturedLore();
  const timeline = await getTimelineLore(5);
  const counts = await getLoreTypeCounts();

  return (
    <>
      {/* Hero Section */}
      <LoreHero
        headline="THE WORLD OF FANHATTAN"
        subtext="Belief collides with reality."
      />

      {/* Featured Story */}
      {featured && (
        <LoreSection className="bg-muted/30">
          <div className="mb-6">
            <h2 className="text-3xl font-display uppercase tracking-wide mb-2">
              Featured Story
            </h2>
            <div className="h-1 w-20 bg-platform"></div>
          </div>
          <Link
            href={`/lore/${featured.type}/${featured.slug}`}
            className="block bg-card border-2 border-platform/50 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl group"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-square bg-gradient-to-br from-platform/20 to-platform/5 flex items-center justify-center">
                <span className="text-8xl">⭐</span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="text-xs text-platform font-display uppercase tracking-wide mb-2">
                  Featured {featured.type.slice(0, -1)}
                </div>
                <h3 className="text-3xl font-display uppercase tracking-wide mb-4 group-hover:text-platform transition-colors">
                  {featured.name}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {featured.summary}
                </p>
              </div>
            </div>
          </Link>
        </LoreSection>
      )}

      {/* Category Navigation */}
      <LoreSection>
        <div className="mb-8">
          <h2 className="text-3xl font-display uppercase tracking-wide mb-2">
            Explore the Lore
          </h2>
          <div className="h-1 w-20 bg-platform"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            type="characters"
            title="Characters"
            description="The people who shape the city."
            count={counts.characters}
            emoji="👤"
          />
          <CategoryCard
            type="districts"
            title="Districts"
            description="The neighborhoods of Fanhattan."
            count={counts.districts}
            emoji="🏙️"
          />
          <CategoryCard
            type="artifacts"
            title="Artifacts"
            description="Objects of power and mystery."
            count={counts.artifacts}
            emoji="💎"
          />
          <CategoryCard
            type="chapters"
            title="Chapters"
            description="Key moments in the city's history."
            count={counts.chapters}
            emoji="📖"
          />
        </div>
      </LoreSection>

      {/* Timeline Preview */}
      <LoreSection className="bg-muted/30">
        <div className="mb-8">
          <h2 className="text-3xl font-display uppercase tracking-wide mb-2">
            The City Remembers
          </h2>
          <div className="h-1 w-20 bg-platform"></div>
        </div>
        <div className="space-y-0">
          {timeline.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </div>
      </LoreSection>
    </>
  );
}
