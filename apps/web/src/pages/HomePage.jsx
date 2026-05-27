
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroCarousel from '@/components/HeroCarousel.jsx';
import CategoryGrid from '@/components/CategoryGrid.jsx';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Julia Rensé - Luxury Digital Experiences & Jewelry</title>
        <meta name="description" content="Discover custom web applications, books, and handcrafted luxury jewelry by Julia Rensé." />
      </Helmet>

      <div className="w-full flex flex-col min-h-screen bg-[hsl(var(--background))]">
        <HeroCarousel />
        
        {/* The Category Grid serves as the main focal point below the hero */}
        <CategoryGrid />
      </div>
    </>
  );
};

export default HomePage;
