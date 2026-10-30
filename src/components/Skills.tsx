import { allProjects } from "@/data/projects";
import { projectsUsing, skillsByCategory } from "@/data/skills";
import { profile } from "@/data/profile";
import Section from "./Section";

export default function Skills() {
  const categories = Object.entries(skillsByCategory);
  return (
    <Section id="skills" cmd="tree skills" title="Skills" intro="Each skill links to the projects that use it.">
      <div className="grid gap-x-10 gap-y-8 font-mono text-sm sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([category, skills]) => (
          <div key={category} className="min-w-0">
            <p className="font-semibold text-second">{category}/</p>
            <ul className="mt-2">
              {skills.map((skill, i) => {
                const used = projectsUsing(skill, allProjects);
                return (
                  <li key={skill.name} className="flex gap-2 py-0.5">
                    <span className="text-dim" aria-hidden="true">{i === skills.length - 1 ? "└──" : "├──"}</span>
                    <span className="min-w-0">
                      {skill.name}
                      {used.length > 0 && (
                        <span className="text-xs text-dim">
                          {" "}
                          ({used.map((p, j) => (
                            <span key={p.slug}>
                              {j > 0 && ", "}
                              <a href={`#project-${p.slug}`} className="hover:text-accent hover:underline">{p.slug}</a>
                            </span>
                          ))})
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="min-w-0">
          <p className="font-semibold text-second">education/</p>
          <ul className="mt-2 space-y-2 font-sans">
            {profile.education.map((e) => (
              <li key={e.title}>
                <span className="block">{e.title}</span>
                <span className="text-xs text-dim">{e.school}{e.date && ` · ${e.date}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
