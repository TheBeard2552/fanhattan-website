import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllDistricts,
  getAllCharacters,
  getAllSystems,
  getAllStories,
} from '@/lib/lore/resolvers';
import { getAllCanon } from '@/lib/content';
import CanonLayout from '@/components/CanonLayout';

export const metadata: Metadata = {
  title: 'The Canon of Fanhattan — Bagged Up',
  description: 'Explore the districts, characters, and systems that shape the world of Fanhattan.',
};

export default function LoreHubPage() {
  // New lore engine content
  const districts = getAllDistricts();
  const characters = getAllCharacters();
  const systems = getAllSystems();
  const stories = getAllStories();

  // Old system content (world, events, myths)
  const allCanon = getAllCanon();

  // Featured story: most recent by date, or first available
  const featuredStory = [...stories].sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return dateB - dateA;
  })[0];

  // Count by type
  const counts = {
    world: allCanon.filter((e) => e.frontmatter.type === 'world').length,
    districts: districts.length,
    characters: characters.length,
    stories: stories.length,
    systems: systems.length,
    events: allCanon.filter((e) => e.frontmatter.type === 'event').length,
    myths: allCanon.filter((e) => e.frontmatter.type === 'myth').length,
  };

  // Order: World (foundation) → Districts → Characters → Stories → Systems → Events → Myths
  const categories = [
    { type: 'world', title: 'World', description: 'The foundation of Fanhattan', emoji: '🌍' },
    { type: 'districts', title: 'Districts', description: 'The territories of power', emoji: '🏙️' },
    { type: 'characters', title: 'Characters', description: 'Those who shape the city', emoji: '👤' },
    { type: 'stories', title: 'Stories', description: 'Narrative events that tie everything together', emoji: '📜' },
    { type: 'systems', title: 'Systems', description: 'The rules that govern reality', emoji: '⚙️' },
    { type: 'events', title: 'Events', description: 'Moments that changed everything', emoji: '⚡' },
    { type: 'myths', title: 'Myths', description: 'Stories that became legend', emoji: '📖' },
  ];

  return (
    <CanonLayout>
      {/* Hero */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl uppercase tracking-tight mb-6 text-white">
            The Canon
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Belief collides with reality.
          </p>
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

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.type}
                href={`/lore/${category.type}`}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="font-display text-2xl uppercase tracking-wide mb-2 text-white group-hover:text-platform transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-4">{category.description}</p>
                <div className="text-sm text-platform font-display uppercase tracking-wide">
                  {counts[category.type as keyof typeof counts]} {counts[category.type as keyof typeof counts] === 1 ? 'entry' : 'entries'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CanonLayout>
  );
}
