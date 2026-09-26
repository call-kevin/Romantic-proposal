
// src/components/CrystalBall.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';

export default function CrystalBall() {
  const [prediction, setPrediction] = useState(null);
  const [shaking, setShaking] = useState(false);

  const reveal = () => {
    if (shaking) return;
    setShaking(true);
    setPrediction(null);
    setTimeout(() => {
      const p = config.predictions[Math.floor(Math.random() * config.predictions.length)];
      setPrediction(p);
      setShaking(false);
    }, 1200);
  };

  return (
    <section className="section crystal-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Future 🔮
      </motion.h2>

      <div className="crystal-wrap">
        <motion.div
          className="crystal-ball"
          onClick={reveal}
          animate={shaking ? { rotate: [0, -8, 8, -8, 8, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.08 }}
        >
          <div className="crystal-glow" />
          <span className="crystal-emoji">🔮</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {prediction && (
            <motion.p
              key={prediction}
              className="crystal-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {prediction}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="crystal-hint">{prediction ? 'Tap again for another glimpse' : 'Tap the crystal ball'}</p>
      </div>
    </section>
  );
}