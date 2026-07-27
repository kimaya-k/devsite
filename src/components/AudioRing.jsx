import { useEffect, useRef } from 'react';

const STOPS = [
  { pos: 0, color: [124, 58, 237] },
  { pos: 0.3, color: [17, 15, 23] },
  { pos: 0.62, color: [219, 39, 119] },
  { pos: 0.85, color: [244, 238, 250] },
  { pos: 1, color: [124, 58, 237] },
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

export default function AudioRing({ getLevels, isPlaying, size = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const center = size / 2;
    const baseRadius = size * 0.4;
    const segments = 84;
    let rotation = 0;
    let raf;

    function draw() {
      ctx.clearRect(0, 0, size, size);
      rotation += isPlaying ? 0.0032 : 0.0009;

      const levels = getLevels ? getLevels() : null;

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2 - Math.PI / 2;
        let amp = 0.16;

        if (levels && levels.length && isPlaying) {
          const idx = Math.floor((i / segments) * levels.length);
          amp = Math.min(1, Math.abs(levels[idx]) * 7 + 0.14);
        } else {
          amp = 0.14 + 0.05 * Math.sin(rotation * 30 + i * 0.7);
        }

        const inner = baseRadius;
        const outer = baseRadius + amp * (size * 0.14);

        const x1 = center + Math.cos(angle) * inner;
        const y1 = center + Math.sin(angle) * inner;
        const x2 = center + Math.cos(angle) * outer;
        const y2 = center + Math.sin(angle) * outer;

        const colorT = i / segments + rotation;
        ctx.strokeStyle = colorAt(colorT);
        ctx.lineWidth = size * 0.014;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, isPlaying, getLevels]);

  return <canvas ref={canvasRef} className="audio-ring-canvas" aria-hidden="true" />;
}