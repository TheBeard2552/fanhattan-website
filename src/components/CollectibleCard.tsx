import { ReactNode } from 'react';
import Link from 'next/link';
import { Collectible } from '@/../../data/collectibles';
import RarityBadge from './collection/RarityBadge';
import ModeTag from './collection/ModeTag';

// Legacy props (for homepage)
interface LegacyProps {
  title: string;
  description: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
  placeholder?: ReactNode;
  collectible?: never;
}

// Archive props (for collection pages)
interface ArchiveProps {
  collectible: Collectible;
  title?: never;
  description?: never;
  rarity?: never;
  placeholder?: never;
}

type CollectibleCardProps = LegacyProps | ArchiveProps;

export default function CollectibleCard(props: CollectibleCardProps) {
  // Legacy mode
  if ('title' in props) {
    const { title, description, rarity = 'common', placeholder } = props;
    
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
  
  // Archive mode
  const { collectible } = props;
  
  // Build border class without template literals for Tailwind
  let borderClass = 'border-2 ';
  if (collectible.rarity === 'mythical') {
    borderClass += 'border-transparent bg-gradient-to-br from-rarity-epic via-rarity-mythical to-rarity-epic bg-clip-padding';
  } else if (collectible.rarity === 'legendary') {
    borderClass += 'border-rarity-legendary';
  } else if (collectible.rarity === 'epic') {
    borderClass += 'border-rarity-epic';
  } else if (collectible.rarity === 'rare') {
    borderClass += 'border-rarity-rare';
  } else {
    borderClass += 'border-rarity-common';
  }
  
  const isMythical = collectible.rarity === 'mythical';
  
  return (
    <Link 
      href={`/collection/${collectible.slug}`}
      className={`
        block bg-card ${borderClass}
        rounded-lg overflow-hidden
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl
        group
      `}
    >
      {/* Image placeholder with rarity-influenced background */}
      <div className={`
        aspect-square 
        flex items-center justify-center
        relative
        ${isMythical 
          ? 'bg-gradient-to-br from-rarity-epic/20 via-rarity-mythical/20 to-rarity-epic/20' 
          : 'bg-muted'
        }
      `}>
        <span className="text-6xl">🎴</span>
        
        {/* Mode tag - positioned as accent stripe */}
        <div className="absolute top-2 left-2">
          <ModeTag mode={collectible.mode} />
        </div>
        
        {/* Limited badge */}
        {collectible.isLimited && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 text-xs font-display uppercase tracking-wide bg-sand text-background rounded">
              Limited
            </span>
          </div>
        )}
      </div>
      
      {/* Card content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-display uppercase tracking-wide group-hover:text-platform transition-colors">
            {collectible.name}
          </h3>
          <RarityBadge rarity={collectible.rarity} />
        </div>
        
        {/* Season badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Season {collectible.season}
          </span>
          {collectible.district && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {collectible.district}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
