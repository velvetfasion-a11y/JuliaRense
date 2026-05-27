
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { ShoppingCart, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import products from '@/data/products';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedVariant(foundProduct.variants[0]);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast.success(`${quantity} x ${product.title} added to cart`);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, [product, selectedVariant, quantity, addToCart]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + amount;
      if (newQuantity < 1) return 1;
      return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  }, [product?.images?.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);
    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return null;
  }

  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.price_formatted;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;

  const currentImage = product.images[currentImageIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <>
      <Helmet>
        <title>{`${product.title} - Julia Rensé`}</title>
        <meta name="description" content={product.subtitle || product.title} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
        <div className="grid md:grid-cols-2 gap-12 bg-card border border-border p-8 rounded-2xl shadow-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="relative overflow-hidden rounded-xl shadow-lg h-96 md:h-[500px] bg-muted">
              <img
                src={currentImage?.url || placeholderImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {product.ribbon_text && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  {product.ribbon_text}
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-border hover:bg-border/60'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {hasMultipleImages && (
              <div className="hidden md:flex gap-2 mt-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-border hover:border-border/60'
                    }`}
                  >
                    <img
                      src={image.url || placeholderImage}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
            <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold text-card-foreground mb-2" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
              {product.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">{product.subtitle}</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">{price}</span>
              {selectedVariant?.sale_price_in_cents && (
                <span className="text-2xl text-muted-foreground line-through">{originalPrice}</span>
              )}
            </div>

            <div className="prose prose-sm text-card-foreground mb-6 max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />

            {product.additional_info?.length > 0 && (
              <div className="mb-6 space-y-4">
                {product.additional_info
                  .sort((a, b) => a.order - b.order)
                  .map((info) => (
                    <div key={info.id} className="border-l-2 border-primary/50 pl-4">
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">{info.title}</h3>
                      <div className="prose prose-sm text-muted-foreground max-w-none" dangerouslySetInnerHTML={{ __html: info.description }} />
                    </div>
                  ))}
              </div>
            )}

            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-card-foreground mb-2">Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                      onClick={() => handleVariantSelect(variant)}
                      className={`transition-all duration-200 ${
                        selectedVariant?.id === variant.id
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'border-border text-card-foreground hover:bg-accent'
                      }`}
                    >
                      {variant.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="rounded-md h-8 w-8 text-card-foreground hover:bg-accent">
                  <Minus size={16} />
                </Button>
                <span className="w-10 text-center text-card-foreground font-bold">{quantity}</span>
                <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="rounded-md h-8 w-8 text-card-foreground hover:bg-accent">
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-auto">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
                disabled={!canAddToCart || !product.purchasable}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>

              {isStockManaged && canAddToCart && product.purchasable && (
                <p className="text-sm text-green-600 mt-3 flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> {availableStock} in stock
                </p>
              )}

              {isStockManaged && !canAddToCart && product.purchasable && (
                <p className="text-sm text-amber-600 mt-3 flex items-center justify-center gap-2">
                  <XCircle size={16} /> Not enough stock. Only {availableStock} left.
                </p>
              )}

              {!product.purchasable && (
                <p className="text-sm text-destructive mt-3 flex items-center justify-center gap-2">
                  <XCircle size={16} /> Currently unavailable
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
              Related products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group">
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium text-primary mb-1 tracking-wide uppercase">
                        {relatedProduct.category}
                      </p>
                      <h3 className="text-base font-semibold text-card-foreground mb-2 line-clamp-1">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {relatedProduct.sale_price_formatted || relatedProduct.price_formatted}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-xs font-medium text-card-foreground">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ProductDetailPage;
