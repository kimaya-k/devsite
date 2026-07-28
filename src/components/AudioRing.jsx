import { useEffect, useRef } from 'react';

const BAR_COUNT = 72;

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
  const smoothRef = useRef(new Array(BAR_COUNT).fill(0.08));

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
      // slower rotation
      rotation += isPlaying ? 0.00045 : 0.00015;

      const levels = getLevels ? getLevels() : null;
      const center = size / 2;
      const innerRadius = size * 0.34;
      // shorter bars
      const maxBarLength = size * 0.08;
      const smooth = smoothRef.current;

      for (let i = 0; i < BAR_COUNT; i++) {
        let target = 0.07;

        if (levels && levels.length && isPlaying) {
          const idx = Math.floor((i / BAR_COUNT) * levels.length);
          target = Math.min(1, Math.abs(levels[idx]) * 5.5 + 0.07);
        } else {
          target = 0.07 + 0.025 * Math.sin(rotation * 20 + i * 0.8);
        }

        // slower easing toward target = calmer, less twitchy motion
        smooth[i] += (target - smooth[i]) * 0.09;

        const angle = (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2;
        const barLen = smooth[i] * maxBarLength;

        const x1 = center + Math.cos(angle) * innerRadius;
        const y1 = center + Math.sin(angle) * innerRadius;
        const x2 = center + Math.cos(angle) * (innerRadius + barLen);
        const y2 = center + Math.sin(angle) * (innerRadius + barLen);

        ctx.strokeStyle = colorAt(i / BAR_COUNT + rotation);
        // thicker bars
        ctx.lineWidth = size * 0.02;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(167, 139, 250, 0.45)';
        ctx.shadowBlur = size * 0.01;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
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