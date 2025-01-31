import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Technical Skills</h2>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800 px-4 py-2 rounded-lg text-sm"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
