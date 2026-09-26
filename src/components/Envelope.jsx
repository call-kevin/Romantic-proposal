// src/components/Envelope.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';

export default function Envelope() {
  const [open, setOpen] = useState(false);
  const L = config.envelopeLetter;

  return (
    <section className="section envelope-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        A Letter Just For You 💌
      </motion.h2>

      <div className="envelope-wrap">
        {!open ? (
          <motion.div
            className="envelope"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 3, repeat: Infinity } }}
          >
            <div className="envelope-flap" />
            <div className="envelope-body" />
            <div className="envelope-seal">❤</div>
            <p className="envelope-hint">Click to open</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="letter-paper"
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="letter-to">{L.to}</p>
              {L.body.split('\n\n').map((para, i) => (
                <p key={i} className="letter-para">{para}</p>
              ))}
              <p className="letter-sign">{L.signature}</p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}