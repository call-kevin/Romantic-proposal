// src/components/GiftBox.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { config } from '../config';

export default function GiftBox() {
  const [open, setOpen] = useState(false);
  const [size] = useState({ w: window.innerWidth, h: window.innerHeight });

  return (
    <section className="section gift-section">
      {open && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}>
          <Confetti width={size.w} height={size.h} numberOfPieces={300} recycle={false} />
        </div>
      )}

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        A Gift For You 🎁
      </motion.h2>

      <div className="gift-wrap">
        {!open ? (
          <motion.div
            className="gift-box"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.94 }}
            animate={{ rotate: [0, -3, 3, -3, 3, 0] }}
            transition={{ rotate: { duration: 2.5, repeat: Infinity, repeatDelay: 1 } }}
          >
            <div className="gift-lid" />
            <div className="gift-body" />
            <div className="gift-ribbon-v" />
            <div className="gift-ribbon-h" />
            <div className="gift-bow">🎀</div>
            <p className="gift-hint">Tap to unwrap</p>
          </motion.div>
        ) : (
          <motion.div
            className="gift-revealed"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <h3>{config.giftMessage.title}</h3>
            <p>{config.giftMessage.body}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}