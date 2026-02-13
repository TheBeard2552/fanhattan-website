import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { getLoreByType } from '@/lib/lore/queries';

export const metadata: Metadata = {
  title: 'Lore - Fanhattan Universe',
  description: 'Explore the deep lore of Fanhattan: characters, districts, and mysterious artifacts that shape this cyberpunk world.',
};

export default function LorePage() {
  const characters = getLoreByType('characters');
  const districts = getLoreByType('districts');
  const artifacts = getLoreByType('artifacts');

  return (
    <>
      <Section className="pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background" container={false}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              The Lore of Fanhattan
            </h1>
            <p className="text-xl text-muted-foreground">
              Dive deep into the stories, places, and artifacts that make up the rich universe of Fanhattan.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold font-display">Characters</h2>
            <Link href="/lore/characters" className="text-primary hover:underline font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.slice(0, 3).map((entry) => (
              <Card key={entry.frontmatter.slug} href={`/lore/characters/${entry.frontmatter.slug}`} className="group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {entry.frontmatter.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {entry.frontmatter.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold font-display">Districts</h2>
            <Link href="/lore/districts" className="text-primary hover:underline font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.slice(0, 3).map((entry) => (
              <Card key={entry.frontmatter.slug} href={`/lore/districts/${entry.frontmatter.slug}`} className="group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl">🏙️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {entry.frontmatter.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {entry.frontmatter.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold font-display">Artifacts</h2>
            <Link href="/lore/artifacts" className="text-primary hover:underline font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artifacts.slice(0, 3).map((entry) => (
              <Card key={entry.frontmatter.slug} href={`/lore/artifacts/${entry.frontmatter.slug}`} className="group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl">💎</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {entry.frontmatter.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {entry.frontmatter.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
