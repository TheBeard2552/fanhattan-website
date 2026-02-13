'use client';

import { useState } from 'react';
import { Product } from '../../../data/products';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (product.isSoldOut) return;
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isDisabled = product.isSoldOut;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        px-8 py-4
        font-display uppercase tracking-wide text-sm
        rounded-lg
        transition-all duration-200
        ${
          isDisabled
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : added
            ? 'bg-platform border-2 border-platform text-white shadow-xl shadow-platform/40'
            : 'bg-platform text-white shadow-lg shadow-platform/30 hover:shadow-xl hover:shadow-platform/40 hover:-translate-y-0.5 active:translate-y-0'
        }
        ${className}
      `}
    >
      {isDisabled ? 'Sold Out' : added ? 'Added ✓' : 'Add to Cart'}
    </button>
  );
}
