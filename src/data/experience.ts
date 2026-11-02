export interface Role {
  title: string;
  company: string;
  start: string;
  end: string;
  link?: string;
  points: string[];
}

export const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Robin",
    start: "05/2026",
    end: "now",
    link: "https://withrobin.ai/knowledge",
    points: [
      "Build across Robin's server, web app and AI pipeline: the API, the agent that turns conversations into notes and wikis, and the MCP tools AI clients use.",
      "Work on the permissions model and database migrations for a single-tenant product where every organisation runs its own instance.",
      "Ship through a weekly release train, from pull request and review to canary and production.",
    ],
  },
  {
    title: "Fullstack Developer",
    company: "Chain Academy",
    start: "05/2025",
    end: "08/2026",
    points: [
      "Led new products from first architecture to deployment: backend services, APIs and user interfaces.",
      "Built across the frontend, backend and smart contract layers of client projects, including Aeli Health and New Skin.",
      "Joined existing production systems to debug, extend and scale them.",
    ],
  },
  {
    title: "Backend Smart Contract Developer",
    company: "Investa Farm",
    start: "07/2024",
    end: "12/2024",
    link: "https://investafarm.com",
    points: [
      "Took ideas from scope to production rollout, including the architecture.",
      "Refactored prototype codebases so they could scale and be maintained.",
      "Worked with clients and the team to plan scope and keep delivery on schedule.",
    ],
  },
  {
    title: "Rust Developer",
    company: "Carbon Crowd",
    start: "03/2024",
    end: "08/2024",
    link: "https://owqnd-biaaa-aaaak-qidaq-cai.icp0.io/",
    points: [
      "Wrote Rust canisters for icfootprint.io on the Internet Computer.",
      "Connected the canisters to the frontend and an InfluxDB store, and built the UI to show what they do.",
    ],
  },
];
