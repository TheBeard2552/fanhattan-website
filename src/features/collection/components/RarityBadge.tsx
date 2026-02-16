import { CollectibleRarity } from '@/features/collection/data/collectibles';

interface RarityBadgeProps {
  rarity: CollectibleRarity;
  className?: string;
}

export default function RarityBadge({ rarity, className = '' }: RarityBadgeProps) {
  const rarityStyles = {
    common: 'text-rarity-common bg-rarity-common/10 border-rarity-common/20',
    rare: 'text-rarity-rare bg-rarity-rare/10 border-rarity-rare/20',
    epic: 'text-rarity-epic bg-rarity-epic/10 border-rarity-epic/20',
    legendary: 'text-rarity-legendary bg-rarity-legendary/10 border-rarity-legendary/20',
    mythical: 'text-rarity-mythical bg-gradient-to-r from-rarity-epic/20 to-rarity-mythical/20 border-rarity-mythical/30',
  };
  
  return (
    <span 
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        text-xs font-display uppercase tracking-wide
        rounded-full
        border
        ${rarityStyles[rarity]}
        ${className}
      `}
    >
      {rarity}
    </span>
  );
}
