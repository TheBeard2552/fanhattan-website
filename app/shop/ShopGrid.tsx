'use client';

import { useState, useMemo } from 'react';
import { Product, ProductType, DropType } from '../../data/products';
import FilterBar from '@/components/shop/FilterBar';
import ShopProductCard from '@/components/shop/ShopProductCard';

interface ShopGridProps {
  products: Product[];
}

export default function ShopGrid({ products }: ShopGridProps) {
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [selectedDropType, setSelectedDropType] = useState<DropType | 'all'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const typeMatch = selectedType === 'all' || product.type === selectedType;
      const dropTypeMatch = selectedDropType === 'all' || product.dropType === selectedDropType;
      return typeMatch && dropTypeMatch;
    });
  }, [products, selectedType, selectedDropType]);

  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <FilterBar
        selectedType={selectedType}
        selectedDropType={selectedDropType}
        onTypeChange={setSelectedType}
        onDropTypeChange={setSelectedDropType}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-xl text-muted-foreground font-display uppercase tracking-wider">
            No products found
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
