
// src/components/MagicCursor.jsx
import { useEffect, useRef } from 'react';

const SPARKLE_CHARS = ['✦', '✧', '⭐', '✨', '💫', '🌟', '✴', '❇', '∙', '°'];
const HEART_CHARS = ['💖', '💗', '💕', '❤', '♥'];
const COLORS = ['#ffd966', '#ffb347', '#ff88aa', '#ffffff', '#c8a2ff', '#ffe6b0'];

export default function MagicCursor() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Spawn a sparkle particle at (x, y)
    const spawnSparkle = (x, y, options = {}) => {
      const count = options.count ?? 1;
      for (let i = 0; i < count; i++) {
        const isHeart = options.heart ?? Math.random() < 0.15;
        const char = isHeart
          ? HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)]
          : SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.4,
          life: 1,
          decay: 0.05 + Math.random() * 0.03,
          size: isHeart ? 14 + Math.random() * 10 : 8 + Math.random() * 12,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          char,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          isHeart,
        });
      }
      // cap particles for perf
      if (particlesRef.current.length > 150) {
        particlesRef.current.splice(0, particlesRef.current.length - 150);
      }
    };

    // Desktop: mouse move
    const handleMouseMove = (e) => {
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;

      // Spawn more sparkles the faster you move
      const spawnCount = Math.min(2, 1 + Math.floor(dist / 50));
      if (dist > 0.5) {
        spawnSparkle(e.clientX, e.clientY, { count: spawnCount });
      }
    };

    // Mobile: touch move
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      spawnSparkle(touch.clientX, touch.clientY, { count: 2 });
    };

    // Click explosion
    const handleClick = (e) => {
      spawnSparkle(e.clientX, e.clientY, { count: 22, heart: false });
      // add a few hearts in the mix
      setTimeout(() => {
        spawnSparkle(e.clientX, e.clientY, { count: 6, heart: true });
      }, 60);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      spawnSparkle(touch.clientX, touch.clientY, { count: 18 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.vx *= 0.98;
        p.life -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw with glow
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 18;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px "Segoe UI", "Arial", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw char twice for stronger glow
        ctx.fillText(p.char, 0, 0);
        if (p.isHeart) {
          ctx.globalAlpha *= 0.4;
          ctx.fillText(p.char, 0, 0);
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="magic-cursor-canvas"
      aria-hidden="true"
    />
  );
}