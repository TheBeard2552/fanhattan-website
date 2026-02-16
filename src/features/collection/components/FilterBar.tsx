'use client';

import { CollectibleMode, CollectibleType, CollectibleRarity } from '@/features/collection/data/collectibles';

interface FilterBarProps {
  mode: CollectibleMode | 'all';
  type: CollectibleType | 'all';
  rarity: CollectibleRarity | 'all';
  onModeChange: (mode: CollectibleMode | 'all') => void;
  onTypeChange: (type: CollectibleType | 'all') => void;
  onRarityChange: (rarity: CollectibleRarity | 'all') => void;
}

export default function FilterBar({
  mode,
  type,
  rarity,
  onModeChange,
  onTypeChange,
  onRarityChange,
}: FilterBarProps) {
  const modeOptions: Array<{ value: CollectibleMode | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'billy', label: "Billy's Big Streak" },
    { value: 'super', label: 'Super Streak' },
  ];
  
  const typeOptions: Array<{ value: CollectibleType | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'bag', label: 'Bags' },
    { value: 'skin', label: 'Skins' },
    { value: 'artifact', label: 'Artifacts' },
    { value: 'districtEdition', label: 'District Editions' },
  ];
  
  const rarityOptions: Array<{ value: CollectibleRarity | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'common', label: 'Common' },
    { value: 'rare', label: 'Rare' },
    { value: 'epic', label: 'Epic' },
    { value: 'legendary', label: 'Legendary' },
    { value: 'mythical', label: 'Mythical' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Mode Filter */}
      <div>
        <h3 className="text-sm font-display uppercase tracking-wide text-muted-foreground mb-3">
          Mode
        </h3>
        <div className="flex flex-wrap gap-2">
          {modeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onModeChange(option.value)}
              className={`
                px-4 py-2
                text-sm font-display uppercase tracking-wide
                rounded-lg
                border-2
                transition-all duration-200
                ${
                  mode === option.value
                    ? 'bg-platform text-white border-platform shadow-lg shadow-platform/30'
                    : 'bg-card text-foreground border-border hover:border-platform/50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-display uppercase tracking-wide text-muted-foreground mb-3">
          Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTypeChange(option.value)}
              className={`
                px-4 py-2
                text-sm font-display uppercase tracking-wide
                rounded-lg
                border-2
                transition-all duration-200
                ${
                  type === option.value
                    ? 'bg-platform text-white border-platform shadow-lg shadow-platform/30'
                    : 'bg-card text-foreground border-border hover:border-platform/50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Rarity Filter */}
      <div>
        <h3 className="text-sm font-display uppercase tracking-wide text-muted-foreground mb-3">
          Rarity
        </h3>
        <div className="flex flex-wrap gap-2">
          {rarityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onRarityChange(option.value)}
              className={`
                px-4 py-2
                text-sm font-display uppercase tracking-wide
                rounded-lg
                border-2
                transition-all duration-200
                ${
                  rarity === option.value
                    ? 'bg-platform text-white border-platform shadow-lg shadow-platform/30'
                    : 'bg-card text-foreground border-border hover:border-platform/50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
