
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--luxury-cream))] border-t border-[hsl(var(--border))] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-serif font-bold text-[hsl(var(--luxury-black))] tracking-widest mb-2">
            JULIA RENSÉ
          </h2>
          <p className="text-sm text-[hsl(var(--luxury-taupe))]">
            © {new Date().getFullYear()} Julia Rensé. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-widest uppercase text-[hsl(var(--luxury-black))]">
          <Link to="/terms" className="hover:text-[hsl(var(--luxury-gold))] transition-colors duration-300">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-[hsl(var(--luxury-gold))] transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-[hsl(var(--luxury-gold))] transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
