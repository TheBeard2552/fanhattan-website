import Link from 'next/link';

interface CategoryCardProps {
  type: string;
  title: string;
  description: string;
  count: number;
  emoji: string;
}

export default function CategoryCard({ type, title, description, count, emoji }: CategoryCardProps) {
  return (
    <Link
      href={`/lore/${type}`}
      className="block bg-card border-2 border-border rounded-lg p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-platform/50 group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-5xl">{emoji}</span>
        <span className="text-sm text-muted-foreground font-display uppercase tracking-wide">
          {count} {count === 1 ? 'Entry' : 'Entries'}
        </span>
      </div>
      <h3 className="text-2xl font-display uppercase tracking-wide mb-3 group-hover:text-platform transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
