import { useEffect, useState } from 'react';
import { ANNIVERSARY_DATE, formatElapsedSentence, getElapsedParts } from '../utils/dateTime';

function ElapsedTimeClock() {
  const [parts, setParts] = useState(() => getElapsedParts(ANNIVERSARY_DATE));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setParts(getElapsedParts(ANNIVERSARY_DATE));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const segments = [
    { label: 'anni', value: parts.years },
    { label: 'mesi', value: parts.months },
    { label: 'giorni', value: parts.days },
    { label: 'ore', value: parts.hours },
    { label: 'minuti', value: parts.minutes },
    { label: 'secondi', value: parts.seconds },
  ];

  return (
    <section className="clock-card" aria-labelledby="clock-title">
      <div className="badge">Dal 19 aprile 2016 a oggi</div>
      <h2 id="clock-title">Il tempo trascorso insieme</h2>
      <div className="counter-grid" aria-label={formatElapsedSentence(parts)}>
        {segments.map((segment) => (
          <article key={segment.label} className="counter-segment">
            <strong>{segment.value}</strong>
            <span>{segment.label}</span>
          </article>
        ))}
      </div>
      <p className="clock-sentence">{formatElapsedSentence(parts)}</p>
    </section>
  );
}

export default ElapsedTimeClock;

