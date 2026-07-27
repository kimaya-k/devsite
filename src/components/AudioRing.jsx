import { useEffect, useRef } from 'react';

// Monochrome purple — light violet to deep violet and back
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

export default function AudioRing({ getLevels, isPlaying }) {
  const canvasRef = useRef(null);

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

    const segments = 90;

    function draw() {
      ctx.clearRect(0, 0, size, size);
      rotation += isPlaying ? 0.0032 : 0.0009;

      const levels = getLevels ? getLevels() : null;
      const center = size / 2;
      // baseRadius + max ray length stays under 0.5 so nothing clips the canvas edge
      const baseRadius = size * 0.32;
      const maxExtra = size * 0.1;

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
        const outer = baseRadius + amp * maxExtra;

        const x1 = center + Math.cos(angle) * inner;
        const y1 = center + Math.sin(angle) * inner;
        const x2 = center + Math.cos(angle) * outer;
        const y2 = center + Math.sin(angle) * outer;

        ctx.strokeStyle = colorAt(i / segments + rotation);
        ctx.lineWidth = size * 0.012;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

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