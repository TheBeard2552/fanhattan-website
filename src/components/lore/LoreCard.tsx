import Link from 'next/link';
import { LoreEntry } from '@/lib/loreHub/types';
import TagBadge from './TagBadge';

interface LoreCardProps {
  entry: LoreEntry;
}

const typeEmojis: Record<string, string> = {
  characters: '👤',
  districts: '🏙️',
  artifacts: '💎',
  chapters: '📖',
};

export default function LoreCard({ entry }: LoreCardProps) {
  return (
    <Link
      href={`/lore/${entry.type}/${entry.slug}`}
      className="block bg-card border-2 border-border rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-platform/50 group"
    >
      <div className="aspect-video bg-gradient-to-br from-platform/10 to-platform/5 flex items-center justify-center">
        <span className="text-6xl">{typeEmojis[entry.type] || '📄'}</span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-xl font-display uppercase tracking-wide group-hover:text-platform transition-colors">
            {entry.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {entry.summary}
        </p>
        {entry.district && (
          <TagBadge>{entry.district}</TagBadge>
        )}
      </div>
    </Link>
  );
}
