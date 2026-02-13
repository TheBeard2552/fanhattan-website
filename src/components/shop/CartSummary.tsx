'use client';

import { useCart } from './CartProvider';

export default function CartSummary() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex gap-4 p-4 border border-border rounded-lg">
          <div className="w-20 h-20 bg-muted rounded flex items-center justify-center">
            🛍️
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="px-2 py-1 border border-border rounded hover:bg-muted"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="px-2 py-1 border border-border rounded hover:bg-muted"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="ml-auto text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
      
      <div className="border-t border-border pt-4">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
          Proceed to Checkout
        </button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Checkout functionality coming in Phase 1
        </p>
      </div>
    </div>
  );
}
