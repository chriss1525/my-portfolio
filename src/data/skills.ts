/** Each skill names the stack labels (as written in projects.ts) that count as using it. */
export const skillsByCategory: Record<string, { name: string; matches?: string[] }[]> = {
  backend: [
    { name: "Node.js", matches: ["Node.js", "Express", "Hono"] },
    { name: "TypeScript" },
    { name: "PostgreSQL", matches: ["PostgreSQL", "pgvector"] },
    { name: "Python" },
    { name: "APIs & microservices", matches: ["Express", "Hono"] },
    { name: "MySQL" },
    { name: "InfluxDB" },
  ],
  ai: [
    { name: "MCP" },
    { name: "LLM pipelines", matches: ["MCP", "Demucs"] },
    { name: "Vector search", matches: ["pgvector"] },
  ],
  blockchain: [
    { name: "Solidity", matches: ["Solidity", "Hardhat"] },
    { name: "Rust" },
    { name: "ICP" },
    { name: "Motoko" },
    { name: "EVM L2s" },
    { name: "Masumi Network" },
  ],
  frontend: [
    { name: "React", matches: ["Next.js"] },
    { name: "Next.js" },
    { name: "Tailwind CSS" },
    { name: "HTML & CSS", matches: ["HTML", "CSS"] },
  ],
  practice: [
    { name: "Git" },
    { name: "Docker" },
    { name: "Unit & integration testing" },
    { name: "Security best practices" },
  ],
};

/** Projects whose stack uses a skill. */
export function projectsUsing<T extends { stack: string[] }>(skill: { name: string; matches?: string[] }, list: T[]): T[] {
  const keys = skill.matches ?? [skill.name];
  return list.filter((p) => p.stack.some((s) => keys.includes(s)));
}
