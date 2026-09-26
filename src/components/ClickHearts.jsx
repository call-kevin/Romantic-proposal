// src/components/ClickHearts.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClickHearts() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      const hearts = Array.from({ length: 8 }, (_, i) => ({
        id: `${id}-${i}`,
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / 8,
        emoji: ['💖', '💗', '💕', '❤️', '💘', '💝', '💓', '♥️'][i % 8],
      }));
      setBursts((prev) => [...prev, ...hearts]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((h) => !h.id.startsWith(`${id}`)));
      }, 1400);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="click-hearts-layer" aria-hidden>
      <AnimatePresence>
        {bursts.map((h) => (
          <motion.div
            key={h.id}
            className="click-heart"
            style={{ left: h.x, top: h.y }}
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.6,
              x: Math.cos(h.angle) * 120,
              y: Math.sin(h.angle) * 120 - 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}