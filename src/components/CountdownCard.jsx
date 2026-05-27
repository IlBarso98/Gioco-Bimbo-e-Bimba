import { useEffect, useState } from "react";
import { formatDuration, getRelationshipDuration } from "../utils/date";

const countdownLabels = [
  { key: "years", label: "anni" },
  { key: "months", label: "mesi" },
  { key: "days", label: "giorni" },
  { key: "hours", label: "ore" },
  { key: "minutes", label: "minuti" },
  { key: "seconds", label: "secondi" }
];

function CountdownCard({ label, startDate }) {
  const [duration, setDuration] = useState(() => getRelationshipDuration(startDate));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setDuration(getRelationshipDuration(startDate));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [startDate]);

  return (
    <section aria-label={label} className="glass-card countdown-card">
      <p className="eyebrow">{label}</p>
      <div aria-live="polite" className="countdown-live">
        {formatDuration(duration)}
      </div>
      <div className="countdown-grid">
        {countdownLabels.map((item) => (
          <article className="countdown-unit" key={item.key}>
            <strong>{duration[item.key]}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CountdownCard;
