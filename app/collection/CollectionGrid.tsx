'use client';

import { useState, useMemo } from 'react';
import { Collectible, CollectibleMode, CollectibleType, CollectibleRarity } from '../../data/collectibles';
import CollectibleCard from '@/components/CollectibleCard';
import FilterBar from '@/components/collection/FilterBar';

interface CollectionGridProps {
  collectibles: Collectible[];
}

export default function CollectionGrid({ collectibles }: CollectionGridProps) {
  const [mode, setMode] = useState<CollectibleMode | 'all'>('all');
  const [type, setType] = useState<CollectibleType | 'all'>('all');
  const [rarity, setRarity] = useState<CollectibleRarity | 'all'>('all');
  
  // Filter and sort collectibles
  const filteredCollectibles = useMemo(() => {
    let filtered = collectibles;
    
    // Apply mode filter
    if (mode !== 'all') {
      filtered = filtered.filter((c) => c.mode === mode);
    }
    
    // Apply type filter
    if (type !== 'all') {
      filtered = filtered.filter((c) => c.type === type);
    }
    
    // Apply rarity filter
    if (rarity !== 'all') {
      filtered = filtered.filter((c) => c.rarity === rarity);
    }
    
    // Sort by season (desc), then rarity weight (desc)
    const rarityWeight = {
      mythical: 5,
      legendary: 4,
      epic: 3,
      rare: 2,
      common: 1,
    };
    
    return filtered.sort((a, b) => {
      // Season desc
      if (a.season !== b.season) {
        return b.season - a.season;
      }
      // Rarity desc
      return rarityWeight[b.rarity] - rarityWeight[a.rarity];
    });
  }, [collectibles, mode, type, rarity]);
  
  return (
    <div className="space-y-12">
      {/* Filter Controls */}
      <FilterBar
        mode={mode}
        type={type}
        rarity={rarity}
        onModeChange={setMode}
        onTypeChange={setType}
        onRarityChange={setRarity}
      />
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCollectibles.length} {filteredCollectibles.length === 1 ? 'collectible' : 'collectibles'}
      </div>
      
      {/* Grid */}
      {filteredCollectibles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCollectibles.map((collectible) => (
            <CollectibleCard key={collectible.id} collectible={collectible} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No collectibles match your filters.
          </p>
          <button
            onClick={() => {
              setMode('all');
              setType('all');
              setRarity('all');
            }}
            className="text-platform hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
