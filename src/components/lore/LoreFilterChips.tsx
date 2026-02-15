'use client';

interface LoreFilterChip {
  id: string;
  label: string;
  count?: number;
}

interface LoreFilterChipsProps {
  filters: LoreFilterChip[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

export default function LoreFilterChips({ 
  filters, 
  activeFilter, 
  onFilterChange,
  className = '' 
}: LoreFilterChipsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            px-4 py-2 rounded-full font-display text-xs uppercase tracking-wide transition-all
            ${activeFilter === filter.id
              ? 'bg-platform text-black border-2 border-platform'
              : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-platform/50 hover:text-white'
            }
          `}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className={`ml-2 ${activeFilter === filter.id ? 'text-black/70' : 'text-gray-500'}`}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
