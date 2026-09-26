import { useEffect, useRef } from 'react';

export default function JourneyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, stars = [], hearts = [], princess, rafId;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.8 + 0.3, p: Math.random() * Math.PI * 2,
      }));
      hearts = Array.from({ length: 20 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        s: Math.random() * 20 + 10, vy: Math.random() * 1 + 0.3,
        o: Math.random() * 0.5 + 0.3, ph: Math.random() * Math.PI * 2,
      }));
      princess = { x: w / 2, y: h * 0.85, tx: w / 2, ty: h * 0.35 };
    };

    const draw = (t) => {
      const grad = ctx.createRadialGradient(w/2, h*0.3, 50, w/2, h/2, w);
      grad.addColorStop(0, '#1a1a3a');
      grad.addColorStop(0.7, '#0b0b1a');
      grad.addColorStop(1, '#050510');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // stars
      stars.forEach(s => {
        const tw = Math.sin(t * 0.002 + s.p) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${tw})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ffd966';
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // hearts
      hearts.forEach(hr => {
        hr.y -= hr.vy * 0.5;
        hr.x += Math.sin(t * 0.001 + hr.ph) * 0.3;
        if (hr.y < -50) { hr.y = h + 30; hr.x = Math.random() * w; }
        ctx.font = `${hr.s}px serif`;
        ctx.globalAlpha = hr.o;
        ctx.fillStyle = '#ff99aa';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ffb3b3';
        ctx.fillText('❤️', hr.x, hr.y);
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // princess (glowing orb)
      princess.x += (princess.tx - princess.x) * 0.02;
      princess.y += (princess.ty - princess.y) * 0.02;

      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ffcc88';
      ctx.beginPath();
      ctx.arc(princess.x, princess.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,215,120,0.25)';
      ctx.fill();

      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(princess.x, princess.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,240,180,0.95)';
      ctx.fill();

      ctx.font = '40px serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffdd99';
      ctx.fillText('👑', princess.x, princess.y - 45);
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="journey-canvas" />;
}