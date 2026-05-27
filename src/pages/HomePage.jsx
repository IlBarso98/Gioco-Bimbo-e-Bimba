import { motion } from "framer-motion";
import CountdownCard from "../components/CountdownCard";
import PolaroidPhoto from "../components/PolaroidPhoto";
import SectionTitle from "../components/SectionTitle";
import { homePolaroids } from "../data/photos";
import { relationshipStartDate, siteContent } from "../data/siteContent";

const sectionCards = [
  {
    title: "Home",
    text: "Il contatore che parte dal 19 aprile 2016 e continua a girare in tempo reale."
  },
  {
    title: "Mappa",
    text: "I posti speciali della nostra vita insieme"
  },
  {
    title: "Quiz",
    text: "Domande a scelta multipla su di noi, Non ti azzardare a sbagliare bimba!"
  },
  {
    title: "Ti amo",
    text: "Una carrellata di bei ricordi di momenti felici"
  },
  {
    title: "La ruota",
    text: "Un succoso premio per un piccolo gioco. Tranquilla non devi indovinare niente qui"
  }
];

function HomePage() {
  return (
    <div className="page-section">
      <section className="hero-grid">
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="glass-card hero-card"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow">Per te</p>
          <h1>{siteContent.homeTitle}</h1>
          <p className="hero-copy">{siteContent.homeSubtitle}</p>
        </motion.article>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="countdown-wrap"
          initial={{ opacity: 0, y: 22 }}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          <CountdownCard label={siteContent.homeCountdownLabel} startDate={relationshipStartDate} />
        </motion.div>
      </section>

      <section className="section-block">
        <SectionTitle eyebrow="Istantanee" title="Una piccola parete di polaroid" />
        <div className="polaroid-showcase">
          {homePolaroids.map((photo, index) => (
            <motion.div
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              initial={{ opacity: 0, rotate: index % 2 === 0 ? -2 : 2, y: 16 }}
              key={photo.id}
              transition={{ delay: 0.05 * index, duration: 0.45 }}
            >
              <PolaroidPhoto photo={photo} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle eyebrow="Dentro il sito" title="Cosa trovi qui dentro" />
        <div className="section-grid">
          {sectionCards.map((card) => (
            <article className="mini-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
