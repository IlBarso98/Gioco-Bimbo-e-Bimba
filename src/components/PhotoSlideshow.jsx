import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ImageWithFallback from './ImageWithFallback';

const autoPlayDelay = 4200;

function PhotoSlideshow({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasSlides = slides.length > 0;
  const currentSlide = hasSlides ? slides[currentIndex] : null;
  const nextIndex = useMemo(
    () => (hasSlides ? (currentIndex + 1) % slides.length : 0),
    [currentIndex, hasSlides, slides.length],
  );

  useEffect(() => {
    if (!hasSlides || isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % slides.length);
    }, autoPlayDelay);

    return () => window.clearInterval(timer);
  }, [hasSlides, isPaused, slides.length]);

  if (!hasSlides) {
    return (
      <section className="soft-card slideshow-empty">
        <h3>Le foto arriveranno presto qui</h3>
        <p>
          Aggiungi i tuoi file in <code>public/assets/photos/</code> e aggiorna
          <code> src/data/photos.js</code>.
        </p>
      </section>
    );
  }

  return (
    <section className="slideshow-shell">
      <AnimatePresence mode="wait">
        <motion.figure
          key={currentSlide.id}
          className="slideshow-frame"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <ImageWithFallback
            src={currentSlide.src}
            alt={currentSlide.alt}
            aspectRatio="16 / 10"
            className="slideshow-media"
            imageClassName="slideshow-media"
            label="Foto in arrivo"
          />
          <figcaption>
            {currentSlide.caption ? <p>{currentSlide.caption}</p> : null}
            <span>
              {currentIndex + 1} / {slides.length}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="slideshow-controls">
        <button
          type="button"
          className="soft-button"
          onClick={() =>
            setCurrentIndex((previousIndex) =>
              previousIndex === 0 ? slides.length - 1 : previousIndex - 1,
            )
          }
        >
          Indietro
        </button>
        <button
          type="button"
          className="soft-button soft-button-primary"
          onClick={() => setIsPaused((currentValue) => !currentValue)}
        >
          {isPaused ? 'Play' : 'Pausa'}
        </button>
        <button
          type="button"
          className="soft-button"
          onClick={() => setCurrentIndex(nextIndex)}
        >
          Avanti
        </button>
      </div>

      <div className="slide-progress" aria-label="Avanzamento slideshow">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`slide-dot ${index === currentIndex ? 'slide-dot-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Vai alla foto ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default PhotoSlideshow;
