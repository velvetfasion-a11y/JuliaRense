
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { initializeCheckout } from '@/api/EcommerceApi';
import { toast } from 'sonner';
import SeamlessLoopVideo from '@/components/SeamlessLoopVideo.jsx';

const BOOK_COVER = '/how-to-heal-pain-book.jpg';

function BooksPhoneRevealSection({ ebookProduct, isProcessing, onDownload }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.4, once: true });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const phoneAnimate = isInView
    ? isDesktop
      ? {
          opacity: 1,
          top: ['45%', '45%', '0%'],
          y: ['-50%', '-50%', '0%'],
          left: ['50%', '50%', '-4%'],
          x: ['-50%', '-50%', '-6%'],
        }
      : { opacity: 1, y: 0 }
    : isDesktop
      ? { opacity: 0, top: '45%', y: '-50%', left: '50%', x: '-50%' }
      : { opacity: 0, y: 24 };

  const phoneTransition = isDesktop
    ? {
        opacity: { duration: 0.45 },
        left: { duration: 1.05, times: [0, 0.38, 1], ease: [0.16, 1, 0.3, 1], delay: 0.12 },
        x: { duration: 1.05, times: [0, 0.38, 1], ease: [0.16, 1, 0.3, 1], delay: 0.12 },
        top: { duration: 1.05, times: [0, 0.38, 1], ease: [0.16, 1, 0.3, 1], delay: 0.12 },
        y: { duration: 1.05, times: [0, 0.38, 1], ease: [0.16, 1, 0.3, 1], delay: 0.12 },
      }
    : { duration: 0.65, ease: [0.16, 1, 0.3, 1] };

  const ctaAnimate = isInView
    ? isDesktop
      ? { opacity: 1, x: 0, top: '52%', y: '-50%', left: '56%' }
      : { opacity: 1, y: 0 }
    : isDesktop
      ? { opacity: 0, x: 28, top: '52%', y: '-50%', left: '56%' }
      : { opacity: 0, y: 16 };

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[hsl(var(--background))] pt-4 pb-16 md:pt-5 md:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-0 flex-col items-center md:min-h-[380px] md:block lg:min-h-[420px]">
          <motion.div
            className="relative z-10 w-full max-w-[min(100%,22rem)] sm:max-w-md md:absolute md:max-w-lg lg:max-w-xl"
            initial={false}
            animate={phoneAnimate}
            transition={phoneTransition}
          >
            <img
              src="/books-phone-mockup.png"
              alt="How To Heal Pain book on iPhone"
              className="mx-auto block h-auto w-full bg-transparent md:mx-0"
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-6 text-center md:absolute md:mt-0"
            initial={false}
            animate={ctaAnimate}
            transition={{ delay: isInView ? 0.9 : 0, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--luxury-gold))]">
              Premium E-book
            </p>
            <button
              type="button"
              onClick={() => onDownload(ebookProduct)}
              disabled={isProcessing}
              className="books-ebook-download-btn"
              aria-label="Download Premium E-book"
            >
              {isProcessing ? 'PROCESSING…' : 'Download Now'}
            </button>
            <span className="books-hero-price books-hero-price--on-light">$29.99</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const EbooksCoursesPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const handleCheckout = async (product) => {
    try {
      setIsProcessing(true);
      const checkoutItem = {
        id: product.id,
        title: product.title,
        priceInCents: product.priceInCents,
        quantity: 1,
        image: product.image,
      };

      const checkoutUrl = await initializeCheckout([checkoutItem]);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error('Checkout service unavailable. Please try again later.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  const physicalBookProduct = {
    id: 'prod_digital_branding',
    title: 'How To Heal Pain',
    subtitle: 'PHYSICAL BOOK',
    price: '$49.99',
    priceInCents: 4999,
    image: BOOK_COVER,
  };

  const ebookProduct = {
    id: 'prod_web_design',
    title: 'How To Heal Pain',
    subtitle: 'PREMIUM E-BOOK',
    price: '$29.99',
    priceInCents: 2999,
    image: BOOK_COVER,
  };

  return (
    <>
      <Helmet>
        <title>Books | Julia Rensé</title>
        <meta name="description" content="How To Heal Pain — books and resources by Julia Rensé." />
      </Helmet>

      <div className="min-h-screen bg-[hsl(var(--background))]">
        {/* BOOKS title */}
        <div className="w-full">
          <section className="px-4 pb-3 pt-28 sm:px-6 md:pb-4 md:pt-32 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex w-full max-w-7xl justify-center text-center"
            >
              <h1 className="hero-title-huge text-balance text-[hsl(var(--foreground))]">BOOKS</h1>
            </motion.div>
          </section>
          <div className="hero-divider" />
        </div>

        {/* Hero: video left, tagline + Read right */}
        <section className="relative w-full overflow-hidden bg-[hsl(var(--luxury-black))]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-6 sm:px-6 sm:pt-8 md:pb-8 lg:px-10">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-10 lg:max-w-5xl lg:gap-12">
              {/* Video */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <div className="relative aspect-[3/4] w-[220px] overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.55)] sm:w-[260px] md:w-[300px] lg:w-[320px]">
                  <SeamlessLoopVideo
                    src="/books-heal-pain.mp4"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </motion.div>

              {/* Tagline + Read */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start text-left md:max-w-sm lg:max-w-md"
              >
                <h2
                  className="mb-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-white"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  How To Heal Pain
                </h2>
                <p className="books-hero-tagline mb-10 max-w-md text-[clamp(1.75rem,3.5vw,2.75rem)] text-white/95 md:max-w-lg">
                  Unlock the potential hidden in pain
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  <button
                    type="button"
                    onClick={() => handleCheckout(physicalBookProduct)}
                    disabled={isProcessing}
                    className="cursor-pointer border border-white bg-transparent px-12 py-4 font-serif text-xs uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-white hover:text-[hsl(var(--luxury-black))] disabled:opacity-60"
                  >
                    {isProcessing ? 'Processing…' : 'Get Book'}
                  </button>
                  <span className="books-hero-price">$49.99</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <BooksPhoneRevealSection
            ebookProduct={ebookProduct}
            isProcessing={isProcessing}
            onDownload={handleCheckout}
          />
      </div>
    </>
  );
};

export default EbooksCoursesPage;
