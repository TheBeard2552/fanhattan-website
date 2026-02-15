import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllDistricts,
  getAllCharacters,
  getAllStories,
  getAllArtifacts,
} from '@/lib/lore/resolvers';
import CanonLayout from '@/components/CanonLayout';

export const metadata: Metadata = {
  title: 'The Canon of Fanhattan — Bagged Up',
  description: 'Explore the districts, characters, stories, and artifacts that shape the world of Fanhattan.',
};

export default function LoreHubPage() {
  // New lore engine content
  const districts = getAllDistricts();
  const characters = getAllCharacters();
  const stories = getAllStories();
  const artifacts = getAllArtifacts();

  // Featured story: most recent by date, or first available
  const featuredStory = [...stories].sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return dateB - dateA;
  })[0];

  // Count by type
  const counts = {
    districts: districts.length,
    characters: characters.length,
    stories: stories.length,
    artifacts: artifacts.length,
  };

  // 4 core categories
  const categories = [
    { type: 'districts', title: 'Districts', description: 'The territories of power', emoji: '🏙️' },
    { type: 'characters', title: 'Characters', description: 'Those who shape the city', emoji: '👤' },
    { type: 'stories', title: 'Stories', description: 'Standalone tales and episodic sagas', emoji: '📜' },
    { type: 'artifacts', title: 'Artifacts', description: 'Beliefs, factions, systems, and relics', emoji: '🏺' },
  ];

  // Curated "Start Here" entries (Survival Over Glory is a belief -> /belief/slug)
  const startHereLinks = [
    { slug: 'stadium-south', label: 'Stadium South', type: 'district' },
    { slug: 'shep', label: 'Shep', type: 'character' },
    { slug: 'survival-over-glory', label: 'Survival Over Glory', type: 'belief' },
    ...(featuredStory ? [{ slug: featuredStory.frontmatter.slug, label: featuredStory.frontmatter.title, type: 'story' }] : []),
  ];

  return (
    <CanonLayout>
      {/* Hero */}
      <section className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl uppercase tracking-tight mb-6 text-white">
            The Canon
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-8">
            Belief collides with reality.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Explore the interconnected world of Fanhattan through its districts, characters, stories, and artifacts. Each element is part of a living narrative engine.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.type}
                href={`/lore/${category.type}`}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="font-display text-2xl uppercase tracking-wide mb-2 text-white group-hover:text-platform transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">{category.description}</p>
                <div className="text-sm text-platform font-display uppercase tracking-wide">
                  {counts[category.type as keyof typeof counts]} {counts[category.type as keyof typeof counts] === 1 ? 'entry' : 'entries'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-sm uppercase tracking-widest text-platform mb-4">
              Featured Story
            </h2>
            <Link
              href={`/story/${featuredStory.frontmatter.slug}`}
              className="group block bg-gradient-to-br from-platform/10 to-platform/5 border-2 border-platform/30 rounded-lg p-8 hover:border-platform/60 transition-all duration-300"
            >
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide mb-3 text-white group-hover:text-platform transition-colors">
                {featuredStory.frontmatter.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                {featuredStory.frontmatter.summary}
              </p>
              <span className="text-platform font-display uppercase tracking-wide text-sm group-hover:underline">
                Read the full story →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Start Here */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-sm uppercase tracking-widest text-gray-500 mb-4">
            Start Here
          </h2>
          <div className="flex flex-wrap gap-3">
            {startHereLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/${link.type}/${link.slug}`}
                className="group px-6 py-3 bg-white/5 border-2 border-white/10 rounded-lg hover:border-platform/50 transition-all"
              >
                <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  {link.type}
                </span>
                <span className="text-white font-display uppercase tracking-wide text-sm group-hover:text-platform transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CanonLayout>
  );
}
