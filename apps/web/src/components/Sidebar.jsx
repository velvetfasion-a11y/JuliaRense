
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Twitter, MessageCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [email, setEmail] = useState('');

  const navLinks = [
    { path: '/web-applications', label: 'LAUNCH YOUR WEBSITE' },
    { path: '/ebooks-courses', label: 'BOOKS' },
    { path: '/jewelry', label: 'JEWELRY' },
    { path: '/blog', label: 'BLOG' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thank you for subscribing to our newsletter.');
    setEmail('');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[hsl(var(--luxury-cream))] border-r border-[hsl(var(--border))]">
      {/* Logo Area */}
      <div className="p-8 md:p-12 flex justify-between items-center">
        <Link to="/" onClick={onClose} className="block">
          <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--luxury-black))] tracking-tight">
            JULIA RENSÉ
          </h1>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-[hsl(var(--luxury-black))]" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-8 md:px-12 flex-1 overflow-y-auto">
        <ul className="space-y-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={onClose}
                  className={`block font-serif text-lg tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-[hsl(var(--luxury-gold))]'
                      : 'text-[hsl(var(--luxury-black))] hover:text-[hsl(var(--luxury-gold))]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Subscription Section */}
        <div className="mt-16 mb-12">
          <p className="text-sm text-[hsl(var(--luxury-taupe))] mb-4 leading-relaxed">
            Subscribe for additional information about upcoming launches
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-transparent border-b border-[hsl(var(--luxury-taupe))] py-2 text-[hsl(var(--luxury-black))] placeholder:text-[hsl(var(--luxury-taupe))] focus:outline-none focus:border-[hsl(var(--luxury-gold))] transition-colors rounded-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[hsl(var(--luxury-black))] text-white text-sm tracking-widest uppercase hover:bg-[hsl(var(--luxury-gold))] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </nav>

      {/* Footer Area */}
      <div className="p-8 md:p-12 mt-auto">
        <div className="flex gap-6 mb-8">
          <a href="#" className="text-[hsl(var(--luxury-black))] hover:text-[hsl(var(--luxury-gold))] transition-colors" aria-label="Threads">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="#" className="text-[hsl(var(--luxury-black))] hover:text-[hsl(var(--luxury-gold))] transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-[hsl(var(--luxury-black))] hover:text-[hsl(var(--luxury-gold))] transition-colors" aria-label="X/Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-[hsl(var(--luxury-black))] hover:text-[hsl(var(--luxury-gold))] transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        
        <div className="flex flex-col space-y-2 text-xs text-[hsl(var(--luxury-taupe))] tracking-wider uppercase">
          <Link to="/terms" className="hover:text-[hsl(var(--luxury-gold))] transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-[hsl(var(--luxury-gold))] transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-[hsl(var(--luxury-gold))] transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky) */}
      <aside className="hidden md:block w-80 lg:w-96 h-screen sticky top-0 flex-shrink-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 h-full w-[85vw] max-w-sm bg-[hsl(var(--luxury-cream))] z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
