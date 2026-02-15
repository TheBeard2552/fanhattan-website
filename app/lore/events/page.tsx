import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonByCanonType } from '@/lib/content';
import CanonLayout from '@/components/CanonLayout';
import CanonTierBadge from '@/components/CanonTierBadge';

export const metadata: Metadata = {
  title: 'Events — Fanhattan Canon',
  description: 'Moments that changed everything.',
};

export default function EventsPage() {
  const events = getCanonByCanonType('event');
  
  return (
    <CanonLayout>
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/lore" className="text-platform hover:underline font-display uppercase tracking-wide text-sm mb-6 inline-block">
              ← Back to Canon
            </Link>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4 text-white">
              Events
            </h1>
            <p className="text-xl text-gray-400">Moments that changed everything.</p>
          </div>
          
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => (
                <Link
                  key={event.frontmatter.slug}
                  href={`/lore/${event.frontmatter.slug}`}
                  className="group block bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-lg p-8 hover:border-platform/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-display text-3xl uppercase tracking-wide text-white group-hover:text-platform transition-colors">
                      {event.frontmatter.title}
                    </h2>
                    <CanonTierBadge tier={event.frontmatter.canonTier} />
                  </div>
                  <p className="text-lg text-gray-300 italic">
                    &ldquo;{event.frontmatter.coreBelief}&rdquo;
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No events have been canonized yet.</p>
            </div>
          )}
        </div>
      </section>
    </CanonLayout>
  );
}
