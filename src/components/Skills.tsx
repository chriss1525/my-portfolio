import { skillsByCategory } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="w-full px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="max-w-4xl mx-auto terminal-window p-6">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-terminal-green font-mono">ls -la ./skills</span>
          </div>
        </div>

        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-terminal-gray font-mono">./</span>
              <h3 className="text-xl md:text-2xl font-mono text-terminal-amber capitalize">
                {category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <code
                  key={index}
                  className="font-mono text-sm text-terminal-green bg-black/60 border border-terminal-green/40 px-3 py-1.5 rounded hover:bg-black/80 hover:border-terminal-amber/60 transition-colors"
                >
                  {skill}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
