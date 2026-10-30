"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

const Typewriter = ({ text, delay = 0, speed = 15, className = "" }: TypewriterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? delay : speed);
    return () => clearTimeout(timer);
  }, [count, text, delay, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
    </span>
  );
};

export default Typewriter;
