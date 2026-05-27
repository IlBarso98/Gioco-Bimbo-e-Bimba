import { motion } from 'framer-motion';

function EmptyState({ title, text, action }) {
  return (
    <motion.section
      className="soft-card empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <span className="empty-state-icon">♥</span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action ? <p className="empty-state-action">{action}</p> : null}
    </motion.section>
  );
}

export default EmptyState;

