import { motion } from 'framer-motion';

function PageIntro({ eyebrow, title, text, align = 'left' }) {
  return (
    <motion.section
      className={`page-intro page-intro-${align}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.section>
  );
}

export default PageIntro;

