"useclient";

import { experience } from "../data/experience";

interface TimelineProps {
  onClose: () => void;
}

export default function Timeline({ onClose }: TimelineProps) {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4 relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-0 text-blue-500 hover:text-blue-400 transition-colors"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
        <div className="space-y-8">
          {experience.map((item, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-2 border-blue-600"
            >
              <div className="absolute -left-2.5 top-0 w-5 h-5 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl font-bold mb-2">
                {item.title}{" "}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 text-sm ml-2"
                >
                  Visit Platform →
                </a>
              </h3>
              <div className="space-y-2">
                {item.description.split("\n").map((line, i) => (
                  <p key={i} className="text-gray-300">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
