// src/components/StartScreen.jsx
import { motion } from 'framer-motion';
import { config } from '../config';

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      className="start-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="start-sparkle"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        ✨
      </motion.div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        FOR MY PRINCESS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        ✨ A journey from my heart to yours ✨
      </motion.p>

      <motion.button
        className="start-btn"
        onClick={onStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 30px #ffaa33', '0 0 70px #ffdd88', '0 0 30px #ffaa33'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        START OUR JOURNEY
      </motion.button>

      <motion.div
        className="start-names"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {config.yourName} ❤ {config.herName}
      </motion.div>
    </motion.div>
  );
}