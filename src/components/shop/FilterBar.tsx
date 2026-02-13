'use client';

import { ProductType, DropType } from '../../../data/products';

interface FilterBarProps {
  selectedType: ProductType | 'all';
  selectedDropType: DropType | 'all';
  onTypeChange: (type: ProductType | 'all') => void;
  onDropTypeChange: (dropType: DropType | 'all') => void;
}

export default function FilterBar({
  selectedType,
  selectedDropType,
  onTypeChange,
  onDropTypeChange,
}: FilterBarProps) {
  const productTypes: Array<{ value: ProductType | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'vinyl', label: 'Vinyl' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'digital', label: 'Digital' },
    { value: 'accessory', label: 'Accessories' },
  ];

  const dropTypes: Array<{ value: DropType | 'all'; label: string }> = [
    { value: 'all', label: 'All Drops' },
    { value: 'limited', label: 'Limited' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'standard', label: 'Standard' },
  ];

  return (
    <div className="space-y-6">
      {/* Type Filter */}
      <div>
        <label className="block text-sm font-display uppercase tracking-wider text-muted-foreground mb-3">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={`
                px-5 py-2.5
                font-display uppercase tracking-wide text-sm
                rounded-full
                border-2
                transition-all duration-200
                ${
                  selectedType === type.value
                    ? 'bg-platform text-white border-platform shadow-lg shadow-platform/30'
                    : 'bg-card text-foreground border-border hover:border-platform/50'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drop Type Filter */}
      <div>
        <label className="block text-sm font-display uppercase tracking-wider text-muted-foreground mb-3">
          Drop Type
        </label>
        <div className="flex flex-wrap gap-2">
          {dropTypes.map((drop) => (
            <button
              key={drop.value}
              onClick={() => onDropTypeChange(drop.value)}
              className={`
                px-5 py-2.5
                font-display uppercase tracking-wide text-sm
                rounded-full
                border-2
                transition-all duration-200
                ${
                  selectedDropType === drop.value
                    ? 'bg-platform text-white border-platform shadow-lg shadow-platform/30'
                    : 'bg-card text-foreground border-border hover:border-platform/50'
                }
              `}
            >
              {drop.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
