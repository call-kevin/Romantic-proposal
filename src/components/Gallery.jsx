// src/components/Gallery.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { config } from '../config';

function FlipCard({ img, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="flip-card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onClick={() => setFlipped(!flipped)}
      whileHover={{ scale: 1.04 }}
    >
      <motion.div
        className="flip-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flip-front">
          <img src={img.src} alt={img.caption} loading="lazy" />
          <div className="flip-overlay">{img.caption}</div>
        </div>
        <div className="flip-back">
          <p>{img.note || img.caption}</p>
          <span className="flip-heart">💖</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section className="section gallery-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Beautiful Moments 📸
      </motion.h2>
      <p className="section-hint">(Tap a photo to see a secret note 💌)</p>

      <div className="gallery-grid">
        {config.images.map((img, i) => (
          <FlipCard key={i} img={img} index={i} />
        ))}
      </div>
    </section>
  );
}