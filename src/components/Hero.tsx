"use client";

import { TypeAnimation } from "react-type-animation";

interface HeroProps {
  onOpenExperiences: () => void;
}

export default function Hero({ onOpenExperiences }: HeroProps) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center text-center relative">
      <div className="animate-fadeIn">
        <h1 className="text-5xl font-bold mb-4 animate-slideDown">
          Hi, I am <span className="text-blue-500">Christine Okoth</span>
        </h1>
        <TypeAnimation
          sequence={[
            "Blockchain Developer",
            1000,
            "ICP Expert",
            1000,
            "Backend Engineer",
            1000,
            "Rust Developer",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-2xl text-gray-400"
        />
        <div className="mt-8 space-x-4 animate-slideUp">
          <button
            onClick={onOpenExperiences}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            View My Work
          </button>
          <a
            href="mailto:okothchris15@gmail.com"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
