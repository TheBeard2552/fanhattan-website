import Link from 'next/link';
import { Product } from '../../../data/products';
import DropBadge from './DropBadge';
import SoldOutOverlay from './SoldOutOverlay';
import RarityBadge from '../collection/RarityBadge';

interface ShopProductCardProps {
  product: Product;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  return (
    <Link 
      href={`/shop/${product.slug}`}
      className="group block"
    >
      <div className="bg-card border-2 border-border rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-platform/50 relative">
        {product.isSoldOut && <SoldOutOverlay />}
        
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-muted to-card flex items-center justify-center relative p-8">
          <div className="text-8xl opacity-50">
            {product.type === 'vinyl' && '🎵'}
            {product.type === 'apparel' && '👕'}
            {product.type === 'digital' && '💎'}
            {product.type === 'accessory' && '📌'}
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            {product.dropType !== 'standard' && (
              <DropBadge dropType={product.dropType} mode={product.mode} />
            )}
            {product.type === 'digital' && product.rarity && (
              <RarityBadge rarity={product.rarity} />
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-lg uppercase tracking-wide group-hover:text-platform transition-colors leading-tight">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="text-2xl font-display text-platform">
              ${product.price.toFixed(2)}
            </p>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
