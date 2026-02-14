import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LoreHero from '@/components/lore/LoreHero';
import LoreSection from '@/components/lore/LoreSection';
import LoreCard from '@/components/lore/LoreCard';
import { getLoreByType, getDistrictOptions } from '@/lib/sanity/queries';
import { LoreType } from '@/lib/sanity/types';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{
    district?: string;
  }>;
}

const typeConfig: Record<LoreType, { title: string; description: string }> = {
  characters: {
    title: 'CHARACTERS OF FANHATTAN',
    description: 'The people who shape the city.',
  },
  districts: {
    title: 'DISTRICTS OF FANHATTAN',
    description: 'The diverse neighborhoods that make up Fanhattan.',
  },
  artifacts: {
    title: 'ARTIFACTS OF FANHATTAN',
    description: 'Legendary items that shape the fate of Fanhattan.',
  },
  chapters: {
    title: 'CHAPTERS OF FANHATTAN',
    description: 'Key moments in the history of the city.',
  },
};

const validTypes: LoreType[] = ['characters', 'districts', 'artifacts', 'chapters'];

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  
  if (!validTypes.includes(type as LoreType)) {
    return { title: 'Not Found' };
  }
  
  const config = typeConfig[type as LoreType];
  
  return {
    title: `${config.title.replace('OF FANHATTAN', '')} - Fanhattan Lore`,
    description: config.description,
  };
}

export default async function LoreTypePage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const { district } = await searchParams;
  
  if (!validTypes.includes(type as LoreType)) {
    notFound();
  }
  
  const loreType = type as LoreType;
  const config = typeConfig[loreType];
  
  let entries = await getLoreByType(loreType);
  
  if (district) {
    entries = entries.filter((entry) => entry.district === district);
  }
  
  const districtOptions = await getDistrictOptions();
  
  return (
    <>
      {/* Hero Section */}
      <LoreHero
        headline={config.title}
        subtext={config.description}
      />

      {/* Filter Bar */}
      {districtOptions.length > 0 && loreType !== 'districts' && (
        <LoreSection className="py-8">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground font-display uppercase tracking-wide">
              Filter by District:
            </span>
            <a
              href={`/lore/${type}`}
              className={`px-3 py-1 text-sm rounded-full transition-colors font-display uppercase tracking-wide ${
                !district
                  ? 'bg-platform text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </a>
            {districtOptions.map((dist) => (
              <a
                key={dist}
                href={`/lore/${type}?district=${dist}`}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  district === dist
                    ? 'bg-platform text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {dist}
              </a>
            ))}
          </div>
        </LoreSection>
      )}

      {/* Grid */}
      <LoreSection className={districtOptions.length > 0 && loreType !== 'districts' ? 'pt-0' : ''}>
        {entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <LoreCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No entries found{district ? ` in ${district}` : ''}.
            </p>
          </div>
        )}
      </LoreSection>
    </>
  );
}
