'use client';

interface LoreSortOption {
  id: string;
  label: string;
}

interface LoreSortMenuProps {
  options: LoreSortOption[];
  activeSort: string;
  onSortChange: (sortId: string) => void;
  className?: string;
}

export default function LoreSortMenu({ 
  options, 
  activeSort, 
  onSortChange,
  className = '' 
}: LoreSortMenuProps) {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-xs font-display uppercase tracking-wide text-gray-500 mb-2">
        Sort By
      </label>
      <select
        value={activeSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full px-4 py-2 bg-white/5 border-2 border-white/10 rounded-lg text-white focus:outline-none focus:border-platform/50 transition-colors font-display uppercase tracking-wide text-sm appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-[#0e0e0e]">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-[38px] pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
