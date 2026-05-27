
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryGrid = () => {
  const categories = [
    {
      title: 'LAUNCH YOUR WEBSITE',
      image: 'https://images.unsplash.com/photo-1647279271777-959fe19eae14',
      link: '/web-applications',
      // Desktop: 3 cols total. Item 1 takes 1 col.
      gridClass: 'md:col-span-1 lg:col-span-2 aspect-square md:aspect-auto md:h-[400px] lg:h-[500px]',
      alt: 'Luxury web application interface displayed on a screen'
    },
    {
      title: 'BOOKS',
      image: '/books-cover.jpg',
      link: '/ebooks-courses',
      gridClass: 'md:col-span-1 lg:col-span-2 aspect-square md:aspect-auto md:h-[400px] lg:h-[500px]',
      alt: 'Books by Julia Rensé'
    },
    {
      title: 'JEWELRY',
      image: 'https://images.unsplash.com/photo-1639575082080-bf84aff31250',
      link: '/jewelry',
      // On mobile/tablet, it might take full width to balance the row if needed, but we keep it modular.
      gridClass: 'md:col-span-2 lg:col-span-2 aspect-square md:aspect-[2/1] lg:aspect-auto lg:h-[500px]',
      alt: 'Exquisite handcrafted jewelry'
    },
    {
      title: 'BLOG',
      image: '/about-julia.png',
      link: '/blog',
      gridClass: 'md:col-span-1 lg:col-span-3 aspect-square md:aspect-auto md:h-[400px] lg:h-[450px]',
      alt: 'Portrait of Julia Rensé'
    },
    {
      title: 'CONTACT',
      image: 'https://images.unsplash.com/photo-1627513182299-4bc6693d2cae',
      link: '/contact',
      gridClass: 'md:col-span-1 lg:col-span-3 aspect-square md:aspect-auto md:h-[400px] lg:h-[450px]',
      alt: 'Elegant contact and inquiry setup'
    }
  ];

  return (
    <section id="category-collections" className="py-24 px-4 sm:px-6 lg:px-12 bg-[hsl(var(--background))]">
      <div className="max-w-[1600px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[hsl(var(--luxury-black))] tracking-wide mb-4 text-balance">
            Discover the Collections
          </h2>
          <div className="w-16 h-px bg-[hsl(var(--luxury-gold))] mx-auto"></div>
        </motion.div>

        {/* 
          Grid Layout:
          Mobile: 1 column
          Tablet (md): 2 columns
          Desktop (lg): 6 columns total to allow flexible bento layouts 
          (first row 2+2+2, second row 3+3) 
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`w-full ${category.gridClass}`}
            >
              <Link to={category.link} className="category-card w-full h-full">
                <img 
                  src={category.image} 
                  alt={category.alt}
                  className="category-card-img"
                  loading={index > 1 ? "lazy" : "eager"}
                />
                <div className="category-card-overlay">
                  <h3 className="category-card-title text-2xl md:text-3xl lg:text-4xl">
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

export default CategoryGrid;
