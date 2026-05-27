
import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    toast.success('Proceeding to checkout');
    clearCart();
    setIsCartOpen(false);
  }, [cartItems, clearCart, setIsCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cart-modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="cart-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Cart
              </h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-muted-foreground h-full min-h-[300px] flex flex-col items-center justify-center">
                  <ShoppingCartIcon size={48} className="mb-4 opacity-20" />
                  <p className="mb-6 text-lg">Your cart is empty</p>
                  <Button asChild variant="outline" onClick={() => setIsCartOpen(false)} className="border-border text-foreground hover:bg-accent">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                cartItems.map(item => {
                  const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
                  const lineTotal = (price * item.quantity / 100).toFixed(2);
                  
                  return (
                    <div key={item.variant.id} className="cart-item-card">
                      <img src={item.product.image} alt={item.product.title} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-grow flex flex-col justify-between h-full py-1">
                        <div>
                          <h3 className="font-semibold text-foreground line-clamp-1 text-lg">{item.product.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-md bg-background">
                            <Button
                              onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))}
                              size="sm"
                              variant="ghost"
                              className="px-2 text-foreground hover:bg-accent h-8 w-8 rounded-none rounded-l-md"
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="px-3 text-sm font-medium text-foreground min-w-[2.5rem] text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                              size="sm"
                              variant="ghost"
                              className="px-2 text-foreground hover:bg-accent h-8 w-8 rounded-none rounded-r-md"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                          <Button
                            onClick={() => removeFromCart(item.variant.id)}
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 text-xs h-8 px-2"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full py-1 min-w-[80px]">
                        <p className="text-sm text-muted-foreground">
                          {item.variant.sale_price_formatted || item.variant.price_formatted} each
                        </p>
                        <p className="text-base font-bold text-foreground mt-auto">
                          ${lineTotal}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-card/50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="text-lg font-medium text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">{getCartTotal()}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-6 text-base transition-all duration-200"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base transition-all duration-200 active:scale-[0.98]"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
