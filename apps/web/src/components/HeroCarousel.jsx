import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDE_INTERVAL_MS = 7770;

const categorySlides = [
  {
    id: 'web',
    title: 'LAUNCH YOUR WEBSITE',
    image: 'https://images.unsplash.com/photo-1647279271777-959fe19eae14',
    link: '/web-applications',
    alt: 'Luxury web application interface displayed on a screen',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (categorySlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categorySlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const slide = categorySlides[currentSlide];

  return (
    <section
      className="relative w-full h-[70vh] min-h-[420px] max-h-[720px] md:h-[600px] overflow-hidden bg-[hsl(var(--background))]"
      aria-label="Category highlights"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Category title — lower third, well above Go Here */}
      <div className="absolute left-0 right-0 bottom-[38%] md:bottom-[36%] z-10 flex justify-center pointer-events-none px-4">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="category-card-title text-2xl md:text-3xl lg:text-4xl text-balance max-w-xl drop-shadow-md text-center"
          >
            {slide.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Go Here — near bottom */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-20 md:pb-24 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${slide.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={slide.link}
                className="inline-block px-10 py-4 bg-[hsl(var(--luxury-black))] text-white text-sm md:text-base font-medium tracking-widest uppercase hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-all duration-300"
              >
                Go Here
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {categorySlides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {categorySlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-white w-8 h-2'
                  : 'bg-white/50 w-2 h-2 hover:bg-white/70'
              }`}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
