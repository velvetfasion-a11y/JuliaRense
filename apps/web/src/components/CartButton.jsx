import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart.jsx';
import CartBagIcon from '@/components/CartBagIcon.jsx';

const CartButton = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      to="/cart"
      className="fixed top-4 right-5 md:top-6 md:right-10 z-50 flex items-center justify-center p-3 text-[hsl(var(--luxury-black))] hover:opacity-70 transition-opacity duration-200 overflow-visible"
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
    >
      <div className="relative overflow-visible">
        <CartBagIcon className="h-9 w-9 md:h-10 md:w-10 shrink-0" />
        {itemCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--luxury-gold))] text-[10px] font-bold text-[hsl(var(--luxury-black))]">
            {itemCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartButton;
