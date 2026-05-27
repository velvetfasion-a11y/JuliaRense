import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_CATEGORIES = [
  {
    title: 'LAUNCH YOUR WEBSITE',
    link: '/web-applications',
    images: [
      'https://images.unsplash.com/photo-1647279271777-959fe19eae14?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    ],
    alt: 'Luxury web design and digital presence',
  },
  {
    title: 'BOOKS',
    link: '/ebooks-courses',
    images: ['/books-cover.jpg'],
    alt: 'Books by Julia Rensé',
  },
  {
    title: 'JEWELRY',
    link: '/jewelry',
    images: [
      'https://images.unsplash.com/photo-1639575082080-bf84aff31250?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617038220309-036cb8962e3f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200',
    ],
    alt: 'Handcrafted jewelry',
  },
];

const ROTATE_MS = 4400;

const CategoryPanel = ({ category, imageIndex }) => (
  <Link
    to={category.link}
    className="group relative block w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-0 overflow-hidden bg-[hsl(var(--luxury-taupe))]"
  >
    <AnimatePresence mode="wait">
      <motion.img
        key={`${category.link}-${imageIndex}`}
        src={category.images[imageIndex]}
        alt={category.alt}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500" />
    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
      <h2 className="text-white font-serif text-xl sm:text-2xl md:text-2xl lg:text-3xl tracking-[0.2em] text-center leading-snug drop-shadow-lg group-hover:text-[hsl(var(--luxury-gold))] transition-colors duration-500">
        {category.title}
      </h2>
    </div>
  </Link>
);

const CategoryHeroGrid = () => {
  const [imageIndices, setImageIndices] = useState(() =>
    HERO_CATEGORIES.map(() => 0)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndices((prev) =>
        prev.map((index, i) => (index + 1) % HERO_CATEGORIES[i].images.length)
      );
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Featured categories"
      className="w-full pt-16 md:pt-0 bg-[hsl(var(--background))]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 w-full min-h-[calc(100vh-4rem)] md:min-h-[600px] md:max-h-[85vh]">
        {HERO_CATEGORIES.map((category, index) => (
          <CategoryPanel
            key={category.link}
            category={category}
            imageIndex={imageIndices[index]}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryHeroGrid;
