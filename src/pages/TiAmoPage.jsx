import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PlaceholderMedia from "../components/PlaceholderMedia";
import SectionTitle from "../components/SectionTitle";
import { slideshowPhotos } from "../data/photos";
import { siteContent } from "../data/siteContent";

const SLIDE_DURATION = 4600;

function TiAmoPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [audioMissing, setAudioMissing] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!hasStarted || !isPlaying) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setCurrentSlide((index) => (index + 1) % slideshowPhotos.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timerId);
  }, [hasStarted, isPlaying]);

  const attemptAudioPlayback = async () => {
    const audio = audioRef.current;

    if (!audio || audioMissing) {
      return;
    }

    try {
      await audio.play();
      setAudioBlocked(false);
    } catch (error) {
      setAudioBlocked(true);
    }
  };

  const handleStart = async () => {
    setHasStarted(true);
    setIsPlaying(true);
    await attemptAudioPlayback();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goPrevious = () => {
    setCurrentSlide((index) => (index - 1 + slideshowPhotos.length) % slideshowPhotos.length);
  };

  const goNext = () => {
    setCurrentSlide((index) => (index + 1) % slideshowPhotos.length);
  };

  const togglePlayback = async () => {
    const nextValue = !isPlaying;
    setIsPlaying(nextValue);

    if (!audioRef.current || audioMissing) {
      return;
    }

    if (nextValue) {
      await attemptAudioPlayback();
      return;
    }

    audioRef.current.pause();
  };

  const activePhoto = slideshowPhotos[currentSlide];

  return (
    <div className="page-section">
      <section className="section-block love-layout">
        <div className="love-copy glass-card">
          <SectionTitle eyebrow="Ti amo" intro={siteContent.loveIntro} title={siteContent.loveTitle} />
          {!hasStarted ? (
            <div className="button-row">
              <button className="action-button" onClick={handleStart} type="button">
                {siteContent.loveButtonLabel}
              </button>
            </div>
          ) : (
            <div className="status-stack">
              <span className="status-note">
                {audioMissing
                  ? "Aggiungi public/assets/audio/ti-amo.mp3 per la colonna sonora."
                  : audioBlocked
                    ? "L'audio aspetta un altro click per partire."
                    : "Slideshow avviato. Musica pronta quando disponibile."}
              </span>
              {audioBlocked && !audioMissing ? (
                <button className="secondary-button" onClick={attemptAudioPlayback} type="button">
                  Avvia audio
                </button>
              ) : null}
            </div>
          )}
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="glass-card slideshow-shell"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.5 }}
        >
          <div className="slideshow-stage">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="slideshow-photo"
                exit={{ opacity: 0, scale: 0.96, rotate: -1.5 }}
                initial={{ opacity: 0, scale: 1.02, rotate: 1.5 }}
                key={activePhoto.id}
                transition={{ duration: 0.45 }}
              >
                <figure className="slideshow-polaroid">
                  <PlaceholderMedia
                    alt={activePhoto.alt}
                    aspectRatio="4 / 5"
                    className="slideshow-image"
                    label="Aggiungi qui una foto per lo slideshow"
                    src={activePhoto.src}
                  />
                  <figcaption>{activePhoto.caption}</figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="slideshow-controls">
            <button className="secondary-button" onClick={goPrevious} type="button">
              Indietro
            </button>
            <button className="action-button" onClick={togglePlayback} type="button">
              {isPlaying ? "Pausa" : "Play"}
            </button>
            <button className="secondary-button" onClick={goNext} type="button">
              Avanti
            </button>
          </div>

          <div className="progress-line" aria-hidden="true">
            <span
              style={{
                width: `${((currentSlide + 1) / slideshowPhotos.length) * 100}%`
              }}
            />
          </div>

          <div className="dot-group" aria-label="Selezione foto">
            {slideshowPhotos.map((photo, index) => (
              <button
                aria-label={`Vai alla foto ${index + 1}`}
                className={`dot ${index === currentSlide ? "is-active" : ""}`}
                key={photo.id}
                onClick={() => goToSlide(index)}
                type="button"
              />
            ))}
          </div>
        </motion.div>

        <audio
          loop
          onCanPlay={() => setAudioMissing(false)}
          onError={() => setAudioMissing(true)}
          preload="none"
          ref={audioRef}
          src={hasStarted ? siteContent.loveAudioSrc : undefined}
        />
      </section>
    </div>
  );
}

export default TiAmoPage;
