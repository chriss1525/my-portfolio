"use client";
import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

const Typewriter = ({ 
  text, 
  delay = 0, 
  speed = 15, 
  showCursor = true, 
  className = '',
  onComplete 
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + (currentIndex === 0 ? delay : speed));

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, delay, speed, isComplete, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      {showCursor && (
        <span className={`inline-block w-2 h-5 bg-terminal-green ml-1 ${isComplete ? 'animate-blink' : ''}`}>
        </span>
      )}
    </span>
  );
};

export default Typewriter;
