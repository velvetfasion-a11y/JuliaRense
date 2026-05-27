
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import products from '@/data/products';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast.success(`${product.title} added to cart`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
          <div className="relative overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.ribbon_text && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {product.ribbon_text}
              </div>
            )}
            <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
              {hasSale && (
                <span className="bg-card/90 text-muted-foreground text-xs font-medium px-2 py-1 rounded line-through">
                  {originalPrice}
                </span>
              )}
              <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                {displayPrice}
              </span>
            </div>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <p className="text-xs font-medium text-primary mb-2 tracking-wide uppercase">
              {product.category}
            </p>
            <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {product.subtitle}
            </p>
            <div className="flex items-center gap-1 mb-4">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-card-foreground">
                {product.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.review_count})
              </span>
            </div>
            <div className="mt-auto">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 active:scale-[0.98]"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = ({ selectedCategory = 'All', searchQuery = '' }) => {
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory ||
        (selectedCategory === 'Books' &&
          (product.category === 'E-books' || product.category === 'Courses'));
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground mb-4">No products found</p>
        <p className="text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;
