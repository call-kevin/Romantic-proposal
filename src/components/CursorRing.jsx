
// src/components/CursorRing.jsx
import { useEffect, useRef } from 'react';

export default function CursorRing() {
  const ringRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const handleMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    let raf;
    const loop = () => {
      // Smooth follow with easing
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;

      if (ring) {
        ring.style.transform = `translate3d(${posRef.current.x - 18}px, ${posRef.current.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden />;
}