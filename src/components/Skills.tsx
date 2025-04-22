import { skillsByCategory } from "../data/skills";


export default function Skills() {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
          Technical Skills
        </h2>
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground capitalize">
              {category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 px-4 py-2 rounded-lg text-base text-muted-foreground hover:bg-gray-800 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
