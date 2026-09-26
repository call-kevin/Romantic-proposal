import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function FloatingHearts() {
  const hearts = useMemo(
    () => Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 12 + Math.random() * 20,
    })),
    []
  );

  return (
    <div className="floating-hearts">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="floating-heart"
          style={{ left: `${h.x}%`, fontSize: h.size }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}