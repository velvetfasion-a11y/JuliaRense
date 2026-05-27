
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { formatCurrency } from '@/api/EcommerceApi';

const CartContext = createContext();

const CART_STORAGE_KEY = 'e-commerce-cart';

const DEFAULT_CURRENCY = { code: 'USD', symbol: '$' };

const isValidCartItem = (item) => {
  if (!item?.product?.title || item?.variant?.id == null) return false;
  const price = item.variant.price_in_cents ?? item.variant.priceInCents;
  return price != null && !Number.isNaN(Number(price));
};

const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) return [];
  return items.filter(isValidCartItem).map((item) => {
    const priceInCents = item.variant.price_in_cents ?? item.variant.priceInCents ?? 0;
    return {
      ...item,
      quantity: Math.max(1, Number(item.quantity) || 1),
      product: {
        ...item.product,
        title: item.product.title,
        image: item.product.image || item.variant.image_url || item.product.images?.[0] || '',
      },
      variant: {
        ...item.variant,
        price_in_cents: priceInCents,
        currency_info: item.variant.currency_info || DEFAULT_CURRENCY,
      },
    };
  });
};

export const formatCartPrice = (priceInCents, currencyInfo = DEFAULT_CURRENCY) =>
  formatCurrency(priceInCents ?? 0, currencyInfo || DEFAULT_CURRENCY);

export const useCart = () => {
  const context = useContext(CartContext);
  // Provide a safe fallback object to prevent destructuring errors if called outside of CartProvider
  if (!context) {
    console.warn("useCart was called outside of CartProvider. Returning fallback state.");
    return {
      cart: [],
      cartItems: [],
      addToCart: async () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getCartTotal: () => '$0.00'
    };
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? sanitizeCartItems(JSON.parse(storedCart)) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCartItems((prev) => {
      const cleaned = sanitizeCartItems(prev);
      return cleaned.length === prev.length ? prev : cleaned;
    });
  }, []);

  const addToCart = useCallback((product, variant, quantity, availableQuantity) => {
    return new Promise((resolve, reject) => {
      if (variant.manage_inventory) {
        const existingItem = cartItems.find(item => item.variant.id === variant.id);
        const currentCartQuantity = existingItem ? existingItem.quantity : 0;
        if ((currentCartQuantity + quantity) > availableQuantity) {
          const error = new Error(`Not enough stock for ${product.title} (${variant.title}). Only ${availableQuantity} left.`);
          reject(error);
          return;
        }
      }

      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.variant.id === variant.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.variant.id === variant.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        const entry = {
          product: { ...product, image: product.image || variant.image_url || '' },
          variant,
          quantity,
        };
        return sanitizeCartItems([...prevItems, entry]);
      });
      resolve();
    });
  }, [cartItems]);

  const removeFromCart = useCallback((variantId) => {
    setCartItems(prevItems => prevItems.filter(item => item.variant.id !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity < 1) {
        return prevItems.filter((item) => item.variant.id !== variantId);
      }
      return prevItems.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    const validItems = sanitizeCartItems(cartItems);
    if (validItems.length === 0) return formatCartPrice(0);

    const currency = validItems[0].variant.currency_info || DEFAULT_CURRENCY;
    const total = validItems.reduce((sum, item) => {
      const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
      return sum + price * item.quantity;
    }, 0);

    return formatCartPrice(total, currency);
  }, [cartItems]);

  const value = useMemo(() => ({
    cart: cartItems,      // Exposed as 'cart' for your specific usage
    cartItems: cartItems, // Exposed as 'cartItems' for backwards compatibility with default ecommerce components
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
