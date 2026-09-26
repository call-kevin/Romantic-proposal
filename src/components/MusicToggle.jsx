// src/components/MusicToggle.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!config.musicSrc) return;
    const audio = new Audio(config.musicSrc);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  if (!config.musicSrc) return null;

  return (
    <motion.button
      className="music-toggle"
      onClick={toggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={playing ? { rotate: [0, 8, -8, 0] } : {}}
      transition={{ rotate: { duration: 2, repeat: Infinity } }}
      aria-label="Toggle music"
    >
      {playing ? '🎵' : '🔇'}
    </motion.button>
  );
}
