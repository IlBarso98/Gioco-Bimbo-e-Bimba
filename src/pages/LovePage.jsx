import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import PageIntro from '../components/PageIntro';
import PhotoSlideshow from '../components/PhotoSlideshow';
import { photos } from '../data/photos';
import { siteContent } from '../data/siteContent';
import { resolveAssetPath } from '../utils/assets';

function LovePage() {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioNotice, setAudioNotice] = useState('');

  const startExperience = async () => {
    setHasStarted(true);

    if (!audioRef.current) {
      return;
    }

    try {
      await audioRef.current.play();
      setAudioNotice('');
    } catch (error) {
      setAudioNotice('L\'audio non e partito subito, ma puoi riprovare dal browser senza perdere lo slideshow.');
    }
  };

  return (
    <section className="page-layout">
      <PageIntro
        eyebrow="Ti amo"
        title="Una piccola stanza piena di noi"
        text="Foto, una canzone e una quantita infinita di bei ricordi"
      />

      <audio
        ref={audioRef}
        preload="metadata"
        src={resolveAssetPath(siteContent.loveAudioSrc)}
        onError={() => setAudioNotice('Audio non trovato: controlla il file dentro public/assets/audio/.')}
      />

      {!hasStarted ? (
        <motion.section
          className="soft-card love-intro"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button type="button" className="soft-button soft-button-primary" onClick={startExperience}>
            Premi qui, amore
          </button>
        </motion.section>
      ) : (
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <PhotoSlideshow slides={photos} />
          {audioNotice ? <p className="audio-notice">{audioNotice}</p> : null}
        </motion.div>
      )}
    </section>
  );
}

export default LovePage;
