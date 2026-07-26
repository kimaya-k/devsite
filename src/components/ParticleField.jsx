import { useEffect, useRef } from 'react';

const LAYERS = [
  { count: 90, minR: 0.6, maxR: 1.2, speed: 0.05, parallax: 20, glow: 3, alpha: [0.2, 0.45] },
  { count: 55, minR: 1.0, maxR: 1.9, speed: 0.09, parallax: 42, glow: 7, alpha: [0.35, 0.65] },
  { count: 28, minR: 1.7, maxR: 2.8, speed: 0.14, parallax: 70, glow: 13, alpha: [0.5, 0.9] },
];

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, dpr;
    let layers = [];
    let raf;
    let t = 0;
    let rotation = 0;
    let spinVelocity = 0.0035; // visible constant drift (~full rotation every ~18s)
    const mouse = { x: 0, y: 0, nx: 0, ny: 0, active: false };

    const signalColor = '181, 140, 245';
    const amberColor = '226, 184, 255';
    const inkColor = '242, 244, 240';

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.x = width / 2;
      mouse.y = height / 2;

      layers = LAYERS.map((cfg) => ({
        cfg,
        stars: Array.from({ length: cfg.count }, () => {
          const roll = Math.random();
          const color = roll < 0.14 ? signalColor : roll < 0.22 ? amberColor : inkColor;
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: cfg.minR + Math.random() * (cfg.maxR - cfg.minR),
            vx: (Math.random() - 0.5) * cfg.speed,
            vy: (Math.random() - 0.5) * cfg.speed,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.5 + Math.random() * 1.3,
            baseAlpha: cfg.alpha[0] + Math.random() * (cfg.alpha[1] - cfg.alpha[0]),
            color,
          };
        }),
      }));
    }

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.nx = (mouse.x / width) * 2 - 1;
      mouse.ny = (mouse.y / height) * 2 - 1;
      mouse.active = true;
    }

    function onLeave() {
      mouse.active = false;
    }

    const BASE_SPIN = 0.0055; // max speed at far left/right of screen
    const IDLE_SPIN = 0.0018; // gentle drift when cursor isn't on the page

    function step() {
      t += 0.016;

      // Spin direction/speed follows cursor position smoothly: left half of the
      // screen spins one way, right half the other, easing continuously so quick
      // movements steer the field rather than jolting it.
      const target = mouse.active ? BASE_SPIN * mouse.nx : IDLE_SPIN;
      spinVelocity += (target - spinVelocity) * 0.025;
      rotation += spinVelocity;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotation);
      ctx.translate(-width / 2, -height / 2);

      layers.forEach((layer) => {
        const { cfg, stars } = layer;
        const parX = mouse.active ? mouse.nx * cfg.parallax : 0;
        const parY = mouse.active ? mouse.ny * cfg.parallax : 0;

        stars.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < -20) s.x = width + 20;
          if (s.x > width + 20) s.x = -20;
          if (s.y < -20) s.y = height + 20;
          if (s.y > height + 20) s.y = -20;

          const twinkle = 0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.phase);
          const alpha = s.baseAlpha * twinkle;
          const drawX = s.x + parX;
          const drawY = s.y + parY;

          ctx.beginPath();
          ctx.arc(drawX, drawY, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
          ctx.shadowColor = `rgba(${s.color}, ${Math.min(alpha + 0.2, 0.95)})`;
          ctx.shadowBlur = cfg.glow;
          ctx.fill();
        });
      });
      ctx.shadowBlur = 0;
      ctx.restore();

      raf = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) onMove(e.touches[0]);
    }, { passive: true });

    if (!prefersReduced) {
      raf = requestAnimationFrame(step);
    } else {
      step();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}