// src/components/SayYesButton.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function SayYesButton() {
  const [yes, setYes] = useState(false);
  const [size] = useState({ w: window.innerWidth, h: window.innerHeight });

  return (
    <section className="section yes-section">
      {yes && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}>
          <Confetti width={size.w} height={size.h} numberOfPieces={500} recycle={true} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!yes ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          >
            <h2 className="proposal-line1">Will You Be Mine, Forever? 💍</h2>
            <p className="proposal-line2">Take a breath… and answer with your heart.</p>
            <motion.button
              className="yes-btn"
              onClick={() => setYes(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 30px #ff5577', '0 0 70px #ff88aa', '0 0 30px #ff5577'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              YES 💖
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="celebrate"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 1 }}
            className="yes-celebration"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="yes-heart"
            >
              💖
            </motion.div>
            <h2 className="proposal-line1">Thank You! Chellamey For Loving Me 🎉</h2>
            <p className="proposal-line2">Inime Ready ah iru chellamey una Tholla pana poren 🤗 </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}