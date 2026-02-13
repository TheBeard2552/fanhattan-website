'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { Product } from '../../../data/products';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isDisabled = product.status === 'sold-out';

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
        isDisabled
          ? 'bg-muted text-muted-foreground cursor-not-allowed'
          : added
          ? 'bg-green-600 text-white'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      } ${className}`}
    >
      {isDisabled ? 'Sold Out' : added ? 'Added! ✓' : product.status === 'preorder' ? 'Pre-Order' : 'Add to Cart'}
    </button>
  );
}
