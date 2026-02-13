import type { Metadata } from 'next';
import Section from '@/components/Section';
import Card from '@/components/Card';
import TagFilter from '@/components/TagFilter';
import { getLoreByType, getTagsForType, filterLoreByTag } from '@/lib/lore/queries';

export const metadata: Metadata = {
  title: 'Districts - Fanhattan Lore',
  description: 'Explore the diverse districts of Fanhattan, from neon-lit tech hubs to mysterious underground ruins.',
};

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function DistrictsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tag = params.tag;
  
  const allDistricts = getLoreByType('districts');
  const districts = tag ? filterLoreByTag(allDistricts, tag) : allDistricts;
  const tags = getTagsForType('districts');

  return (
    <>
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Districts
          </h1>
          <p className="text-xl text-muted-foreground">
            The diverse neighborhoods that make up Fanhattan
          </p>
        </div>
      </Section>

      <Section>
        <TagFilter tags={tags} currentTag={tag} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districts.map((entry) => (
            <Card key={entry.frontmatter.slug} href={`/lore/districts/${entry.frontmatter.slug}`} className="group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-6xl">🏙️</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {entry.frontmatter.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    entry.frontmatter.status === 'canon' ? 'bg-primary/20 text-primary' :
                    entry.frontmatter.status === 'apocrypha' ? 'bg-muted text-muted-foreground' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {entry.frontmatter.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {entry.frontmatter.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.frontmatter.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-muted rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {districts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No districts found with tag &quot;{tag}&quot;
          </div>
        )}
      </Section>
    </>
  );
}
