import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function SpinWheel({ prizes, featuredPrizeId, onSpinEnd }) {
  const [rotation, setRotation] = useState(0);
  const [spinDuration, setSpinDuration] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const segmentAngle = 360 / prizes.length;
  const featuredIndex = prizes.findIndex((prize) => prize.id === featuredPrizeId);

  const background = useMemo(
    () =>
      `conic-gradient(${prizes
        .map((prize, index) => {
          const start = index * segmentAngle;
          const end = start + segmentAngle;
          return `${prize.color} ${start}deg ${end}deg`;
        })
        .join(', ')})`,
    [prizes, segmentAngle],
  );

  const spin = () => {
    if (isSpinning) {
      return;
    }

    const centerAngle = featuredIndex * segmentAngle + segmentAngle / 2;
    const normalizedRotation = rotation % 360;
    const settlingOffset = (360 - ((normalizedRotation + centerAngle) % 360)) % 360;
    const duration = 4300 + Math.floor(Math.random() * 1400);
    const fullTurns = 5 + Math.floor(Math.random() * 2);
    const finalRotation = rotation + fullTurns * 360 + settlingOffset;

    setSpinDuration(duration);
    setIsSpinning(true);
    setRotation(finalRotation);

    window.setTimeout(() => {
      setIsSpinning(false);
      onSpinEnd(prizes[featuredIndex]);
    }, duration + 60);
  };

  return (
    <div className="wheel-stage">
      <div className="wheel-pointer" aria-hidden="true" />
      <motion.div
        className="wheel-disc"
        style={{
          background,
          transform: `rotate(${rotation}deg)`,
          transitionDuration: `${spinDuration}ms`,
        }}
      >
        {prizes.map((prize, index) => {
          const angle = index * segmentAngle + segmentAngle / 2;
          const radians = ((angle - 90) * Math.PI) / 180;
          const left = 50 + Math.cos(radians) * 34;
          const top = 50 + Math.sin(radians) * 34;

          return (
            <span
              key={prize.id}
              className="wheel-label"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {prize.label}
            </span>
          );
        })}
        <div className="wheel-center">♥</div>
      </motion.div>

      <button
        type="button"
        className="soft-button soft-button-primary wheel-button"
        onClick={spin}
        disabled={isSpinning}
      >
        {isSpinning ? 'Sta girando...' : 'Gira la ruota'}
      </button>
    </div>
  );
}

export default SpinWheel;

