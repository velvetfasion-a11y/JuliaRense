
import React, { useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Menu } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import CartButton from '@/components/CartButton.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from '@/pages/HomePage.jsx';
import WebApplicationsPage from '@/pages/WebApplicationsPage.jsx';
import EbooksCoursesPage from '@/pages/EbooksCoursesPage.jsx';
import JewelryPage from '@/pages/JewelryPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import ShoppingCartPage from '@/pages/ShoppingCartPage.jsx';
import { CartProvider } from '@/hooks/useCart.jsx';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <CartButton />
        <div className="flex min-h-screen bg-[hsl(var(--background))]">
          
          {/* Mobile Header (Only visible on small screens) */}
          <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[hsl(var(--luxury-cream))] border-b border-[hsl(var(--border))] z-30 flex items-center justify-center px-14">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute left-4 p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-[hsl(var(--luxury-black))]" />
            </button>
            <h1 className="text-xl font-serif font-bold text-[hsl(var(--luxury-black))] tracking-widest">
              JULIA RENSÉ
            </h1>
          </div>

          {/* Persistent Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen w-full md:w-[calc(100%-20rem)] lg:w-[calc(100%-24rem)] pt-16 md:pt-0">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/web-applications" element={<WebApplicationsPage />} />
                <Route path="/ebooks-courses" element={<EbooksCoursesPage />} />
                <Route path="/jewelry" element={<JewelryPage />} />
                <Route path="/blog" element={<AboutPage />} />
                <Route path="/about" element={<Navigate to="/blog" replace />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<ShoppingCartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
