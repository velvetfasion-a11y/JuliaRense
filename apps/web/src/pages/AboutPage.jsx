
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Add another object to this array for a new full-text block (Next will appear). */
/** Set `image` on each entry to a path in /public (e.g. "/blog/belief-1.jpg"). */
const beliefTextBoxes = [
  {
    id: 'belief-1',
    title: 'The human mind is a force of pure creation',
    image: null,
    body: `It does not simply think—it transforms. With focused will and unyielding belief, it turns obstacles into gateways, pain into power, and ordinary days into legacies.
Yet the greatest power of all is love.
Not soft or sentimental, but fierce and alive—the invisible current that moves mountains, heals what is broken, and binds us in unbreakable strength. Love is the quiet fire that makes the mind invincible.
This is what I believe, and this is what I live.`,
  },
];

const AboutPage = () => {
  const [activeTextBox, setActiveTextBox] = useState(0);
  const hasMultipleBoxes = beliefTextBoxes.length > 1;
  const currentBox = beliefTextBoxes[activeTextBox];

  const goToNext = () => {
    setActiveTextBox((prev) => (prev + 1) % beliefTextBoxes.length);
  };

  const goToPrev = () => {
    setActiveTextBox((prev) => (prev - 1 + beliefTextBoxes.length) % beliefTextBoxes.length);
  };
  return (
    <>
      <Helmet>
        <title>Blog | Julia Rensé</title>
        <meta name="description" content="Thoughts and writing from Julia Rensé." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-black px-4 pb-10 pt-20 text-white sm:px-6 md:pb-12 md:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="sr-only">Blog</h1>
              <img
                src="/blog-title.png"
                alt="The Blog — Julia Rensé"
                className="blog-hero-title mx-auto h-[clamp(2.25rem,6vw,3.75rem)] w-auto"
              />
            </motion.div>
          </div>
        </section>

        <div className="blog-weekly-band">
          <p className="blog-weekly-label">– Weekly –</p>
        </div>

        {/* Blog post */}
        <section className="bg-[hsl(var(--background))] pb-0 pt-0">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBox.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.35 }}
                    className="blog-post-card"
                  >
                    <div className="blog-post-body">
                      <div className="blog-post-image-slot">
                        {currentBox.image ? (
                          <img
                            src={currentBox.image}
                            alt={currentBox.title || 'Blog post'}
                          />
                        ) : (
                          <div className="blog-post-image-placeholder" aria-hidden />
                        )}
                      </div>

                      {currentBox.title && (
                        <header className="blog-post-header">
                          <h3 className="blog-post-title">{currentBox.title}</h3>
                        </header>
                      )}
                      <div className="blog-post-text whitespace-pre-line">
                        {currentBox.body ?? currentBox.content}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="blog-collectives-band">
                  <div className="blog-collectives-cta">
                    <span className="blog-collectives-arrow" aria-hidden>
                      →
                    </span>
                    <span className="blog-collectives-label">collectives</span>
                  </div>
                </div>

                {hasMultipleBoxes && (
                  <div className="flex items-center justify-between mt-6 gap-4">
                    <button
                      type="button"
                      onClick={goToPrev}
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[hsl(var(--luxury-black))] text-[hsl(var(--luxury-black))] text-sm tracking-widest uppercase hover:bg-[hsl(var(--luxury-black))] hover:text-white transition-colors"
                      aria-label="Previous text"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <span className="text-sm text-[hsl(var(--luxury-taupe))] tracking-widest">
                      {activeTextBox + 1} / {beliefTextBoxes.length}
                    </span>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[hsl(var(--luxury-black))] text-white text-sm tracking-widest uppercase hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors"
                      aria-label="Next text"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
