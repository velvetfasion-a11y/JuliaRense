
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import WebsiteInquiryDialog from '@/components/WebsiteInquiryDialog.jsx';

const LaunchPageVideoHeader = ({ onLaunchNow }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleEnded = () => {
    videoRef.current?.pause();
    setVideoEnded(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="launch-video-frame relative mx-auto w-full aspect-[1168/784] max-h-[min(82vh,960px)] bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className={`block h-full w-full object-cover transition-opacity duration-700 ease-out ${
            videoEnded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden={videoEnded}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div
          className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 ease-out ${
            videoEnded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        <div
          className={`launch-video-end-overlay absolute inset-0 z-10 flex flex-col items-center justify-center text-center transition-opacity duration-700 ease-out ${
            videoEnded ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'
          }`}
        >
          <h1 className="launch-video-end-title text-white text-balance">
            LAUNCH YOUR WEBSITE
          </h1>
          <button
            type="button"
            onClick={onLaunchNow}
            disabled={!videoEnded}
            className="launch-video-end-cta rounded-full border-2 border-white bg-transparent font-medium text-white uppercase transition-all duration-300 hover:bg-white hover:text-black disabled:pointer-events-none"
          >
            LAUNCH NOW
          </button>
        </div>
      </div>
    </section>
  );
};

const productMockupImageClass =
  "h-auto w-full max-w-full object-contain";

const WebApplicationsPage = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const products = [
    {
      id: "prod_landing_page",
      title: "Landing Page",
      titleImage: "/title-landing-page.png",
      titleImageAlt: "Landing Page",
      titleImageClassName:
        "mb-6 h-auto w-full max-w-[min(100%,28rem)] max-h-[7.25rem] object-contain object-left",
      description: "A professional online presence from a one time payment with lifetime access to your website — Only a once a year payment of $49, for the domain! We are available around the clock. Click the link now to know more.",
      price: "5000kr",
      priceInCents: 500000,
      image: "/964_1x_shots_so.png",
      imageClassName: `${productMockupImageClass} object-center md:object-right`,
      align: "left"
    },
    {
      id: "prod_ecommerce",
      title: "Ecommerce Website",
      titleImage: "/title-ecommerce-websites.png",
      titleImageAlt: "Ecommerce Websites",
      description: "Launch your online store with our comprehensive Ecommerce Website solution. Features include product catalog management, secure payment processing, inventory tracking, customer accounts, and integrated analytics to grow your sales.",
      price: "8720kr",
      priceInCents: 872000,
      image: "/738_1x_shots_so.png",
      imageClassName: `${productMockupImageClass} object-center md:object-left`,
      align: "right"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Launch Your Website | Julia Rensé</title>
        <meta name="description" content="Professional web application and ecommerce website development solutions." />
      </Helmet>

      <div className="min-h-screen">
        <LaunchPageVideoHeader onLaunchNow={() => setInquiryOpen(true)} />

        {/* Products — cream page background below the black hero */}
        <div className="flex flex-col bg-[hsl(var(--background))] pb-24 text-[hsl(var(--foreground))]">
          {products.map((product) => (
            <section
              key={product.id}
              className="w-full overflow-visible py-12 md:py-16 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col items-center gap-3 md:gap-4 ${
                    product.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex w-full shrink-0 items-center justify-center overflow-visible bg-[hsl(var(--background))] md:w-[48%] ${
                      product.align === "left" ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    <img
                      src={`${product.image}?v=5`}
                      alt={product.title}
                      className={`${product.imageClassName} bg-transparent`}
                      style={{ background: "transparent" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Content Side */}
                  <div
                    className="relative z-10 w-full shrink-0 md:w-[52%] flex flex-col justify-center"
                  >
                    {product.titleImage ? (
                      <img
                        src={`${product.titleImage}?v=1`}
                        alt={product.titleImageAlt || product.title}
                        className={
                          product.titleImageClassName ??
                          "mb-6 h-auto w-full max-w-[min(100%,28rem)] object-contain object-left"
                        }
                        style={{ background: "transparent" }}
                      />
                    ) : (
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance leading-tight" style={{ letterSpacing: '-0.02em' }}>
                        {product.title}
                      </h2>
                    )}
                    
                    <p
                      className="text-lg text-black mb-12 leading-snug tracking-tight"
                      style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '-0.03em' }}
                    >
                      {product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto border-t border-[hsl(var(--border))] pt-8">
                      <div className="text-3xl font-serif font-bold text-[hsl(var(--luxury-gold))]">
                        {product.price}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setInquiryOpen(true)}
                        className="w-full sm:w-auto ml-auto inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest uppercase transition-all duration-300 bg-[hsl(var(--luxury-black))] text-white hover:bg-[hsl(var(--luxury-gold))] hover:text-black whitespace-nowrap"
                      >
                        Contact us
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          ))}
        </div>

      </div>

      <WebsiteInquiryDialog
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
      />
    </>
  );
};

export default WebApplicationsPage;
