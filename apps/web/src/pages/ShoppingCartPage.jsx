
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useCart, formatCartPrice } from '@/hooks/useCart.jsx';

const ShoppingCartPage = () => {
  const { cartItems = [], removeFromCart, updateQuantity, getCartTotal } = useCart();

  const validItems = (cartItems || []).filter(
    (item) => item?.product && item?.variant?.id != null
  );

  const handleCheckout = () => {
    if (validItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('Checkout coming soon. Your cart has been saved.');
  };

  if (validItems.length === 0) {
    return (
      <div className="cart-page-wrapper min-h-[70vh] flex flex-col items-center justify-center text-center pt-28 md:pt-16">
        <Helmet>
          <title>{'Shopping Cart | Julia Rensé'}</title>
        </Helmet>
        <div className="flex flex-col items-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-[hsl(var(--luxury-beige))] flex items-center justify-center mb-8">
            <ShoppingBag className="w-10 h-10 text-[hsl(var(--luxury-taupe))]" strokeWidth={1.5} />
          </div>
          <h1 className="cart-page-title mb-4">Your Cart is Empty</h1>
          <p className="text-[hsl(var(--luxury-taupe))] mb-10 text-lg">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link to="/web-applications" className="btn-luxury">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper pt-28 md:pt-16 min-h-[70vh]">
      <Helmet>
        <title>{`Shopping Cart (${validItems.length}) | Julia Rensé`}</title>
      </Helmet>

      <h1 className="cart-page-title">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[hsl(var(--luxury-black))] text-sm tracking-widest text-[hsl(var(--luxury-taupe))] uppercase">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <ul className="list-none p-0 m-0">
            {validItems.map((item) => {
              const currency = item.variant.currency_info || { code: 'USD', symbol: '$' };
              const unitPrice = item.variant.sale_price_in_cents ?? item.variant.price_in_cents ?? 0;
              const lineTotal = unitPrice * item.quantity;

              return (
                <li
                  key={String(item.variant.id)}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center py-8 border-b border-[hsl(var(--border))]"
                >
                  <div className="md:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="cart-item-image-wrapper">
                      <img
                        src={item.product.image || item.variant.image_url || ''}
                        alt={item.product.title}
                        className="cart-item-image"
                      />
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <h3 className="font-serif text-xl text-[hsl(var(--luxury-black))] mb-1">
                        {item.product.title}
                      </h3>
                      {item.variant.title && item.variant.title !== 'Default' && (
                        <p className="text-sm text-[hsl(var(--luxury-taupe))] mb-4">
                          {item.variant.title}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.variant.id)}
                        className="text-xs tracking-widest uppercase text-red-600 hover:text-[hsl(var(--luxury-black))] transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-center text-[hsl(var(--luxury-black))]">
                    <span className="md:hidden text-xs uppercase tracking-widest text-[hsl(var(--luxury-taupe))] block mb-1">
                      Price
                    </span>
                    {formatCartPrice(unitPrice, currency)}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-center gap-4">
                    <span className="md:hidden text-xs uppercase tracking-widest text-[hsl(var(--luxury-taupe))] block mb-2 w-full text-center">
                      Quantity
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                      className="cart-qty-btn"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-medium text-[hsl(var(--luxury-black))]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                      className="cart-qty-btn"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="md:col-span-2 text-lg font-serif font-medium text-[hsl(var(--luxury-black))] text-center md:text-right">
                    <span className="md:hidden text-xs uppercase tracking-widest text-[hsl(var(--luxury-taupe))] block mb-1">
                      Total
                    </span>
                    {formatCartPrice(lineTotal, currency)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="cart-summary-box lg:mt-0">
            <h2 className="font-serif text-2xl text-[hsl(var(--luxury-black))] mb-8 text-center border-b border-[hsl(var(--border))] pb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8 text-[hsl(var(--luxury-black))]">
              <div className="flex justify-between items-center text-lg">
                <span className="text-[hsl(var(--luxury-taupe))]">Subtotal</span>
                <span>{getCartTotal()}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-[hsl(var(--luxury-taupe))]">Shipping</span>
                <span className="text-sm italic">Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-[hsl(var(--luxury-taupe))]">Tax</span>
                <span className="text-sm italic">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[hsl(var(--luxury-black))] mb-10">
              <span className="font-serif text-xl tracking-wide uppercase text-[hsl(var(--luxury-black))]">
                Total
              </span>
              <span className="font-serif text-3xl font-medium text-[hsl(var(--luxury-black))]">
                {getCartTotal()}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <button type="button" onClick={handleCheckout} className="btn-luxury w-full text-sm">
                PROCEED TO CHECKOUT
              </button>
              <Link
                to="/web-applications"
                className="w-full py-4 text-center text-sm tracking-widest uppercase text-[hsl(var(--luxury-black))] hover:text-[hsl(var(--luxury-gold))] transition-colors border border-[hsl(var(--luxury-black))] hover:border-[hsl(var(--luxury-gold))]"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
