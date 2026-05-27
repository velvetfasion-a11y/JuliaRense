
import React from 'react';
import { Menu, Mail, Phone } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Header = ({ onMenuClick, onCartClick }) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ letterSpacing: '-0.02em' }}>
              Julia Rensé
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:hello@juliarense.com"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[hsl(var(--luxury-gold))] transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>hello@juliarense.com</span>
            </a>
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[hsl(var(--luxury-gold))] transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </a>
          </div>

          <div className="flex items-center">
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Open shopping cart"
            >
              <img 
                src="https://horizons-cdn.hostinger.com/30535602-7259-4932-8210-5111d46c087c/8b5148fc74bc14d04813c1be50d29b23.png" 
                alt="Shopping Bag" 
                className="w-6 h-6 object-contain"
              />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--luxury-gold))] text-[10px] font-bold text-black">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
