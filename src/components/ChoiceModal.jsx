import { AnimatePresence, motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

function ChoiceModal({
  isOpen,
  title,
  text,
  choices,
  selectedChoiceId,
  onClose,
  onChoose,
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.section
            className="modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="wheel-modal-title"
          >
            <button type="button" className="modal-close" onClick={onClose} aria-label="Chiudi">
              ×
            </button>
            <p className="eyebrow">Hai vinto!</p>
            <h3 id="wheel-modal-title">{title}</h3>
            <p>{text}</p>

            <div className="choice-grid">
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className={`choice-card ${
                    selectedChoiceId === choice.id ? 'choice-card-selected' : ''
                  }`}
                  onClick={() => onChoose(choice)}
                >
                  <ImageWithFallback
                    src={choice.image}
                    alt={choice.alt}
                    aspectRatio="4 / 3"
                    className="choice-image"
                    imageClassName="choice-image"
                    label={choice.name}
                  />
                  <span className="choice-name">{choice.name}</span>
                  <span className="choice-description">{choice.description}</span>
                </button>
              ))}
            </div>

            {selectedChoiceId ? (
              <div className="choice-confirmation">
                Perfetto, allora si va qui. Decisione ufficialissima.
              </div>
            ) : null}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ChoiceModal;

