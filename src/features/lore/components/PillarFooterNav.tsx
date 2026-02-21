import Link from 'next/link';

const PILLARS = [
  { label: 'People', href: '/lore/characters' },
  { label: 'Stories', href: '/lore/stories' },
  { label: 'Artifacts', href: '/lore/artifacts' },
];

export default function PillarFooterNav() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-8">
          Explore by Pillar
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {PILLARS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-10 py-3 rounded-full border-2 border-white/15 bg-white/5 font-display text-sm uppercase tracking-widest text-gray-300 hover:border-platform/60 hover:text-platform hover:bg-platform/5 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
