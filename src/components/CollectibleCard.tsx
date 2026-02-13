import { ReactNode } from 'react';

interface CollectibleCardProps {
  title: string;
  description: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
  placeholder?: ReactNode;
}

export default function CollectibleCard({ 
  title, 
  description, 
  rarity = 'common',
  placeholder 
}: CollectibleCardProps) {
  const rarityColors = {
    common: 'border-rarity-common',
    rare: 'border-rarity-rare',
    epic: 'border-rarity-epic',
    legendary: 'border-rarity-legendary',
    mythical: 'border-rarity-mythical',
  };
  
  const rarityTextColors = {
    common: 'text-rarity-common',
    rare: 'text-rarity-rare',
    epic: 'text-rarity-epic',
    legendary: 'text-rarity-legendary',
    mythical: 'text-rarity-mythical',
  };
  
  return (
    <div 
      className={`
        bg-card border-2 ${rarityColors[rarity]}
        rounded-lg overflow-hidden
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl
        group
      `}
    >
      <div className="aspect-square bg-muted flex items-center justify-center">
        {placeholder || <span className="text-6xl">🎴</span>}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-display uppercase tracking-wide">
            {title}
          </h3>
          <span className={`text-xs font-display uppercase ${rarityTextColors[rarity]}`}>
            {rarity}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
