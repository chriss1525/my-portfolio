"use client";
import { useEffect, useRef } from "react";

/** A short burst of rain behind the hero, in the current accent colour, then it fades out. */
const MatrixRain = ({ duration = 2600 }: { duration?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const parent = canvas.parentElement!;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]=+;:".split("");
    const fontSize = 14;
    const drops = Array.from({ length: Math.floor(canvas.width / fontSize) }, () => Math.random() * -20);
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent").trim();
    const bg = styles.getPropertyValue("--bg").trim();

    const draw = () => {
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = accent;
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.97 ? 0 : y + 1;
      });
    };

    const interval = setInterval(draw, 45);
    const stop = setTimeout(() => clearInterval(interval), duration);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{ animation: `rainfade ${duration + 1400}ms ease-out forwards` }}
    />
  );
};

export default MatrixRain;
