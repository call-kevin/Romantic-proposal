import { motion } from 'framer-motion';
import { config } from '../config';

export default function LoveLetters() {
  return (
    <section className="section letters-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Letters From My Heart 💌
      </motion.h2>
      <div className="letters-grid">
        {config.loveLetters.map((letter, i) => (
          <motion.div
            key={i}
            className="letter-card"
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <h3>{letter.title}</h3>
            <p>{letter.text}</p>
            <div className="letter-heart">💗</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}