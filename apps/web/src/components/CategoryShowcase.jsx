
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryShowcase = () => {
  const categories = [
    {
      title: 'LAUNCH YOUR WEBSITE',
      image: 'https://images.unsplash.com/photo-1580137009935-79e9440005f2',
      link: '/web-applications',
      className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]'
    },
    {
      title: 'BOOKS',
      image: '/books-cover.jpg',
      link: '/ebooks-courses',
      className: 'md:col-span-1 md:row-span-1 h-[300px]'
    },
    {
      title: 'JEWELRY',
      image: 'https://images.unsplash.com/photo-1617213226302-99a82b62626f',
      link: '/jewelry',
      className: 'md:col-span-1 md:row-span-1 h-[300px]'
    },
    {
      title: 'BLOG',
      image: '/about-julia.png',
      link: '/blog',
      className: 'md:col-span-1 md:row-span-1 h-[300px]'
    },
    {
      title: 'CONTACT',
      image: 'https://images.unsplash.com/photo-1642764733197-b560fca58f41',
      link: '/contact',
      className: 'md:col-span-1 md:row-span-1 h-[300px]'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-[hsl(var(--luxury-taupe))] ${category.className}`}
            >
              <Link to={category.link} className="block w-full h-full">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className="text-white font-serif text-2xl md:text-3xl tracking-widest text-center drop-shadow-md opacity-90 group-hover:opacity-100 group-hover:text-[hsl(var(--luxury-gold))] transition-all duration-500">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
