import Link from 'next/link';
import { LoreEntry } from '@/lib/loreHub/types';

interface TimelineItemProps {
  entry: LoreEntry;
}

const typeLabels: Record<string, string> = {
  characters: 'Character',
  districts: 'District',
  artifacts: 'Artifact',
  chapters: 'Chapter',
};

export default function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <Link
      href={`/lore/${entry.type}/${entry.slug}`}
      className="block border-l-4 border-platform/30 pl-6 py-4 hover:border-platform transition-colors group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-platform font-display uppercase tracking-wide">
          {typeLabels[entry.type] || entry.type}
        </span>
        {entry.district && (
          <>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{entry.district}</span>
          </>
        )}
      </div>
      <h4 className="text-lg font-display uppercase tracking-wide mb-2 group-hover:text-platform transition-colors">
        {entry.name}
      </h4>
      <p className="text-sm text-muted-foreground">
        {entry.summary}
      </p>
    </Link>
  );
}
