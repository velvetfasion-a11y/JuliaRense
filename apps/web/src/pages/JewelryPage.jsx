
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart.jsx';

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

const SEK = { code: 'SEK', symbol: 'kr', template: '$1 kr' };

function buildJewelryProduct({ id, title, priceKr, image, description }) {
  const priceInCents = priceKr * 100;
  return {
    id,
    title,
    description,
    image,
    variants: [
      {
        id: `jewelry-variant-${id}`,
        title: 'Default',
        price_in_cents: priceInCents,
        priceInCents: priceInCents,
        sale_price_in_cents: null,
        manage_inventory: false,
        inventory_quantity: 99,
        currency_info: SEK,
        image_url: image,
      },
    ],
  };
}

const products = [
  {
    id: 'heal-necklace',
    name: 'Your Mind',
    price: '599kr',
    priceKr: 599,
    description:
      'A delicate paperclip chain with a gold heart pendant engraved with HEAL. Wear it as a daily reminder of your strength.',
    image: '/Untitled.jpg',
  },
  {
    id: 'heal-bracelet',
    name: 'Your Craft',
    price: '399kr',
    priceKr: 399,
    description:
      'A twisted gold cuff with a heart centrepiece engraved with HEAL. Bold, minimal, and made to last.',
    image: '/IMG_5842.JPG',
  },
  {
    id: 'heal-ring',
    name: 'Your Heart',
    price: '299kr',
    priceKr: 299,
    description:
      'A solid gold signet ring with a heart face engraved with HEAL. Timeless and effortlessly worn every day.',
    image: '/IMG_6005.PNG',
  },
];

const HEAL_SET = buildJewelryProduct({
  id: 'heal-collection-set',
  title: 'The Heal Collection',
  priceKr: 1020,
  image: '/jewelry/hero.jpg',
  description: 'Necklace, bracelet and ring — worn together, a quiet declaration of healing.',
});

function ProductCard({ product, index }) {
  const [ref, visible] = useReveal();
  const { addToCart } = useCart();
  const isEven = index % 2 === 0;

  const handleAddToCart = async () => {
    const cartProduct = buildJewelryProduct({
      id: product.id,
      title: product.name,
      priceKr: product.priceKr,
      image: product.image,
      description: product.description,
    });

    try {
      await addToCart(
        cartProduct,
        cartProduct.variants[0],
        1,
        cartProduct.variants[0].inventory_quantity
      );
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error(error.message || 'Could not add to cart');
    }
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-4 border-b border-[#d6cdb8]/45 py-5 transition-all duration-1000 ease-out md:flex-row md:items-center md:gap-6 md:py-6 ${
        isEven ? '' : 'md:flex-row-reverse'
      } ${visible ? 'translate-x-0 opacity-100' : `opacity-0 ${isEven ? '-translate-x-12' : 'translate-x-12'}`}`}
    >
      <div className="relative aspect-square w-full max-w-[min(100%,200px)] shrink-0 overflow-hidden md:max-w-[220px]">
        <img
          src={`${product.image}?v=3`}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-full md:flex-1">
        <p className="mb-1 font-serif text-[9px] uppercase tracking-[0.22em] text-[#c9a84c]">
          New Collection
        </p>
        <h2 className="jewelry-product-title mb-2 text-[clamp(1.5rem,3.2vw,2rem)] text-[#1a1a18]">
          {product.name}
        </h2>
        <p className="mb-2 max-w-[340px] font-serif text-xs leading-snug text-[#6b6357]">
          {product.description}
        </p>
        <p className="mb-2 font-serif text-base text-[#1a1a18]">{product.price}</p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="cursor-pointer border-none bg-[#1a1a18] px-6 py-2 font-serif text-[9px] uppercase tracking-[0.22em] text-[#faf8f3] transition-colors duration-300 hover:bg-[#c9a84c]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

const JewelryPage = () => {
  const [setRef, setVisible] = useReveal(0.1);
  const productsRef = useRef(null);
  const { addToCart } = useCart();

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBuySet = async () => {
    try {
      await addToCart(
        HEAL_SET,
        HEAL_SET.variants[0],
        1,
        HEAL_SET.variants[0].inventory_quantity
      );
      toast.success('The Heal Collection added to cart');
    } catch (error) {
      toast.error(error.message || 'Could not add to cart');
    }
  };

  return (
    <>
      <Helmet>
        <title>JEWELRY - Heal Collection | Julia Rensé</title>
        <meta
          name="description"
          content="Handcrafted HEAL jewelry — necklace, bracelet, and ring. Gold pieces engraved with a daily reminder of strength."
        />
      </Helmet>

      <div className="min-h-screen bg-[#faf8f3] font-serif text-[#1a1a18]">
        {/* Hero */}
        <div className="relative h-[100vh] w-full overflow-hidden">
          <img
            src="/jewelry/hero.jpg"
            alt="Heal Collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] uppercase tracking-[0.25em] text-[#faf8f3]/80"
            aria-hidden
          >
            New Collection
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
            <button
              type="button"
              onClick={scrollToProducts}
              className="cursor-pointer border border-[#faf8f3] bg-transparent px-[52px] py-4 font-serif text-xs uppercase tracking-[0.25em] text-[#faf8f3] transition-colors duration-300 hover:bg-[#faf8f3] hover:text-[#1a1a18]"
            >
              Heal
            </button>
          </div>
        </div>

        {/* Products */}
        <div
          id="jewelry-products"
          ref={productsRef}
          className="mx-auto max-w-[800px] scroll-mt-4 px-5 md:px-8"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Full set */}
        <div
          ref={setRef}
          className={`px-5 py-10 text-center transition-all duration-1000 ease-out md:px-8 md:py-12 ${
            setVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#c9a84c]">
            Complete the set
          </p>
          <h2 className="mb-4 font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-normal text-[#1a1a18]">
            The Heal Collection
          </h2>
          <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#6b6357]">
            Necklace, bracelet and ring — worn together, a quiet declaration of healing.
          </p>
          <p className="mb-8 text-[26px] text-[#1a1a18]">1020kr</p>
          <button
            type="button"
            onClick={handleBuySet}
            className="cursor-pointer border-none bg-[#1a1a18] px-14 py-[18px] font-serif text-[11px] uppercase tracking-[0.22em] text-[#faf8f3] transition-colors duration-300 hover:bg-[#c9a84c]"
          >
            Buy the set
          </button>
          <p className="mt-12 text-lg tracking-[0.3em] text-[#c9a84c]">· · ·</p>
        </div>
      </div>
    </>
  );
};

export default JewelryPage;
