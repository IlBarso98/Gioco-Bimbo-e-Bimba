import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PlaceholderMedia from "../components/PlaceholderMedia";
import SectionTitle from "../components/SectionTitle";
import { siteContent } from "../data/siteContent";
import { wheelPrizes, winningPlaces, winningPrizeId } from "../data/wheelPrizes";

const SEGMENT_ANGLE = 360 / wheelPrizes.length;
const WINNER_INDEX = wheelPrizes.findIndex((prize) => prize.id === winningPrizeId);
const WHEEL_GRADIENT = buildWheelGradient();

function buildWheelGradient() {
  return `conic-gradient(${wheelPrizes
    .map((prize, index) => {
      const start = index * SEGMENT_ANGLE;
      const end = start + SEGMENT_ANGLE;
      return `${prize.color} ${start}deg ${end}deg`;
    })
    .join(", ")})`;
}

function WheelPage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasRevealedPrize, setHasRevealedPrize] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const timeoutRef = useRef(null);
  const scrollTopRef = useRef(0);
  const bodyStyleRef = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const { body, documentElement } = document;

    scrollTopRef.current = window.scrollY;
    bodyStyleRef.current = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollTopRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      const previousStyles = bodyStyleRef.current;

      body.style.position = previousStyles?.position ?? "";
      body.style.top = previousStyles?.top ?? "";
      body.style.left = previousStyles?.left ?? "";
      body.style.right = previousStyles?.right ?? "";
      body.style.width = previousStyles?.width ?? "";
      body.style.overflow = previousStyles?.overflow ?? "";
      documentElement.style.overflow = previousStyles?.htmlOverflow ?? "";
      window.scrollTo(0, scrollTopRef.current);
    };
  }, [isModalOpen]);

  const spinWheel = () => {
    if (isSpinning) {
      return;
    }

    const winnerCenterAngle = WINNER_INDEX * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const currentNormalized = ((rotation % 360) + 360) % 360;
    const safeNudge = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.34);
    const desiredNormalized = (360 - winnerCenterAngle + safeNudge + 360) % 360;
    const deltaNormalized = (desiredNormalized - currentNormalized + 360) % 360;
    const fullTurns = 6 + Math.floor(Math.random() * 2);
    const nextRotation = rotation + fullTurns * 360 + deltaNormalized;

    window.clearTimeout(timeoutRef.current);
    setSelectedPlaceId(null);
    setIsModalOpen(false);
    setHasRevealedPrize(false);
    setIsSpinning(true);
    setRotation(nextRotation);

    timeoutRef.current = window.setTimeout(() => {
      setIsSpinning(false);
      setHasRevealedPrize(true);
      setIsModalOpen(true);
    }, 5200);
  };

  const selectedPlace = winningPlaces.find((place) => place.id === selectedPlaceId);

  return (
    <div className="page-section">
      <section className="section-block wheel-layout">
        <div className="glass-card wheel-copy">
          <SectionTitle eyebrow="La ruota" intro={siteContent.wheelIntro} title={siteContent.wheelTitle} />
          <div className="button-row">
            <button className="action-button" disabled={isSpinning} onClick={spinWheel} type="button">
              {isSpinning ? "La ruota gira..." : "Premi per girare"}
            </button>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="wheel-shell glass-card"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.5 }}
        >
          <div className="wheel-pointer" aria-hidden="true" />
          <div className="wheel-shadow" aria-hidden="true" />
          <div
            className="wheel-face"
            style={{
              background: WHEEL_GRADIENT,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 5.2s cubic-bezier(0.17, 0.84, 0.32, 1)"
                : "none"
            }}
          >
            {wheelPrizes.map((prize, index) => {
              const angle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
              const isWinner = prize.id === winningPrizeId;
              const label = hasRevealedPrize && isWinner ? prize.label : "?";

              return (
                <div
                  className={`wheel-label ${label === "?" ? "is-mystery" : "is-revealed"}`}
                  key={prize.id}
                  style={{
                    transform: `rotate(${angle}deg) translateY(-8.8rem) rotate(-${angle}deg)`
                  }}
                >
                  <span>{label}</span>
                </div>
              );
            })}
            <div className="wheel-center">Go</div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="modal-overlay"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="modal-card"
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
            >
              <p className="eyebrow">Hai vinto!</p>
              <h2>{siteContent.wheelWinnerText}</h2>
              <p>Scegli il posto e rendi ufficialissima la decisione.</p>

              <div className="choice-grid">
                {winningPlaces.map((place) => (
                  <button
                    className={`choice-card ${selectedPlaceId === place.id ? "is-selected" : ""}`}
                    key={place.id}
                    onClick={() => setSelectedPlaceId(place.id)}
                    type="button"
                  >
                    <PlaceholderMedia
                      alt={`Anteprima di ${place.title}`}
                      aspectRatio="16 / 10"
                      className="choice-image"
                      label="Aggiungi qui la foto del posto"
                      src={place.image}
                    />
                    <span className="choice-title">{place.title}</span>
                    <span className="choice-text">{place.description}</span>
                  </button>
                ))}
              </div>

              {selectedPlace ? (
                <div className="selected-choice-banner">{siteContent.wheelChoiceMessage}</div>
              ) : null}

              <div className="button-row">
                <button className="secondary-button" onClick={() => setIsModalOpen(false)} type="button">
                  Chiudi
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default WheelPage;
