import { useEffect, useRef } from 'react';

const STOPS = [
  { pos: 0, color: [91, 33, 182] },
  { pos: 0.5, color: [196, 165, 250] },
  { pos: 1, color: [91, 33, 182] },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function colorAt(t) {
  const wrapped = ((t % 1) + 1) % 1;
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (wrapped >= a.pos && wrapped <= b.pos) {
      const local = (wrapped - a.pos) / (b.pos - a.pos || 1);
      const r = lerp(a.color[0], b.color[0], local);
      const g = lerp(a.color[1], b.color[1], local);
      const bch = lerp(a.color[2], b.color[2], local);
      return `rgb(${r | 0}, ${g | 0}, ${bch | 0})`;
    }
  }
  const last = STOPS[STOPS.length - 1].color;
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`;
}

const POINTS = 40;

export default function AudioRing({ getLevels, isPlaying }) {
  const canvasRef = useRef(null);
  const smoothRef = useRef(new Array(POINTS).fill(0.18));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let size, dpr;
    let rotation = 0;
    let raf;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.parentElement.offsetWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      rotation += isPlaying ? 0.0016 : 0.0006;

      const levels = getLevels ? getLevels() : null;
      const center = size / 2;
      const baseRadius = size * 0.34;
      const maxExtra = size * 0.09;
      const smooth = smoothRef.current;

      const pts = [];
      for (let i = 0; i < POINTS; i++) {
        let target = 0.16;
        if (levels && levels.length && isPlaying) {
          const idx = Math.floor((i / POINTS) * levels.length);
          target = Math.min(1, Math.abs(levels[idx]) * 6.5 + 0.14);
        } else {
          target = 0.15 + 0.04 * Math.sin(rotation * 22 + i * 0.6);
        }
        // ease toward the target instead of jumping straight to it — this is what kills the flicker
        smooth[i] += (target - smooth[i]) * 0.12;

        const angle = (i / POINTS) * Math.PI * 2 - Math.PI / 2;
        const radius = baseRadius + smooth[i] * maxExtra;
        pts.push({
          x: center + Math.cos(angle) * radius,
          y: center + Math.sin(angle) * radius,
        });
      }

      // smooth closed spline through the points instead of straight radial ticks
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const curr = pts[i];
        const next = pts[(i + 1) % pts.length];
        const midX = (curr.x + next.x) / 2;
        const midY = (curr.y + next.y) / 2;
        if (i === 0) {
          ctx.moveTo(midX, midY);
        } else {
          ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
        }
      }
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, colorAt(rotation));
      grad.addColorStop(0.5, colorAt(rotation + 0.33));
      grad.addColorStop(1, colorAt(rotation + 0.66));

      ctx.strokeStyle = grad;
      ctx.lineWidth = size * 0.02;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(167, 139, 250, 0.55)';
      ctx.shadowBlur = size * 0.025;
      ctx.stroke();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying, getLevels]);

  return <canvas ref={canvasRef} className="audio-ring-canvas" aria-hidden="true" />;
}