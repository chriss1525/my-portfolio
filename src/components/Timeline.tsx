"useclient";

import { experience } from "../data/experience";

interface TimelineProps {
  onClose: () => void;
}

export default function Timeline({ onClose }: TimelineProps) {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-6 top-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Experience
          </h2>
          <div className="space-y-12">
            {experience.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-gray-800/50"
              >
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gray-800/50 rounded-full" />
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {item.title}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:bg-gray-800/50 text-lg ml-4 transition-colors"
                  >
                    Visit Platform →
                  </a>
                </h3>
                <div className="space-y-4">
                  {item.description.split("\n").map((line, i) => (
                    <p key={i} className="text-muted-foreground text-lg">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
