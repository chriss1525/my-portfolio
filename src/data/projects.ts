export type Tag = "ai" | "backend" | "web3" | "frontend" | "teaching" | "play";

export interface Project {
  slug: string;
  name: string;
  summary: string;
  stack: string[];
  year: string;
  tags: Tag[];
  featured?: boolean;
  /** Past client work: described, never linked. */
  client?: string;
  role?: string;
  repo?: string;
  live?: string;
  images?: string[];
}

export const tags: Tag[] = ["ai", "backend", "web3", "frontend", "teaching", "play"];

export const projects: Project[] = [
  {
    slug: "blockcoop",
    name: "BlockCoop",
    summary:
      "DeFi savings and lending protocol with liquidity pools, leveraged borrowing, oracle price feeds and an admin dashboard for running it.",
    stack: ["Solidity", "Hardhat", "Node.js", "PostgreSQL", "Next.js"],
    year: "2025",
    tags: ["web3", "backend"],
    featured: true,
    repo: "https://github.com/chriss1525/DeFi-protocol",
    images: [
      "/projects/blockcoop/blockcoop.png",
      "/projects/blockcoop/dashboard.png",
      "/projects/blockcoop/savings.png",
      "/projects/blockcoop/liquidity.png",
      "/projects/blockcoop/wallet.png",
      "/projects/blockcoop/admin.png",
    ],
  },
  {
    slug: "chrome-extension-server",
    name: "Screen recorder API",
    summary:
      "API behind a screen-recording Chrome extension: uploads videos, transcribes them, and serves the video and transcript data.",
    stack: ["Node.js", "Express"],
    year: "2023",
    tags: ["backend", "ai"],
    featured: true,
    repo: "https://github.com/chriss1525/chrome-extension-server",
  },
  {
    slug: "jamz",
    name: "JamZ",
    summary: "Audio API that splits songs into vocals and instrumentals with Demucs and stores them in Supabase.",
    stack: ["Python", "Demucs", "Supabase"],
    year: "2024",
    tags: ["backend", "ai"],
    featured: true,
    repo: "https://github.com/chriss1525/JamZ",
  },
  {
    slug: "penny",
    name: "Penny",
    summary: "Personal finance assistant.",
    stack: ["Next.js", "TypeScript"],
    year: "2024",
    tags: ["frontend"],
    featured: true,
    repo: "https://github.com/chriss1525/Penny",
    live: "https://penny-one.vercel.app",
  },
  {
    slug: "dex-comparator",
    name: "DEX Comparator",
    summary: "Compares DEX prices on-chain, with KRNL Protocol signing the price data.",
    stack: ["Solidity", "KRNL"],
    year: "2025",
    tags: ["web3"],
    repo: "https://github.com/chriss1525/dex-comparator",
  },
  {
    slug: "fundraisa",
    name: "Fundraisa",
    summary: "Decentralised fundraising campaigns on the Internet Computer.",
    stack: ["ICP", "JavaScript"],
    year: "2024",
    tags: ["web3"],
    repo: "https://github.com/chriss1525/fundraisa",
  },
  {
    slug: "flipdeck",
    name: "FlipDeck",
    summary: "Flashcards app for making decks and studying online.",
    stack: ["HTML", "JavaScript"],
    year: "2023",
    tags: ["teaching", "frontend"],
    repo: "https://github.com/chriss1525/FlipDeck",
  },
  {
    slug: "commandline-guru",
    name: "Commandline Guru",
    summary: "Telegram bot that teaches command-line tips and shortcuts.",
    stack: ["Python", "Telegram"],
    year: "2023",
    tags: ["teaching"],
    repo: "https://github.com/chriss1525/Commandline_Guru",
  },
  {
    slug: "african-wooers",
    name: "African Wooers",
    summary: "Event site for Africa Web3 × Fintech builder meetups and office hours.",
    stack: ["Next.js"],
    year: "2025",
    tags: ["teaching", "web3", "frontend"],
    repo: "https://github.com/chriss1525/african-wooers",
    live: "https://african-wooers.vercel.app",
  },
  {
    slug: "bloodkonekt",
    name: "BloodKonekt",
    summary: "Connects blood donors with people who need blood.",
    stack: ["Next.js"],
    year: "2025",
    tags: ["frontend"],
    repo: "https://github.com/chriss1525/bloodkonekt",
    live: "https://bloodkonekt.vercel.app",
  },
  {
    slug: "harpoon",
    name: "Harpoon",
    summary: "Backend for an events app, built with a team.",
    stack: ["Node.js"],
    year: "2023",
    tags: ["backend"],
  },
  {
    slug: "task-manager",
    name: "Task Manager",
    summary: "Task management canister on the Internet Computer.",
    stack: ["Rust", "ICP"],
    year: "2024",
    tags: ["web3", "backend"],
    repo: "https://github.com/chriss1525/task_manager",
  },
  {
    slug: "my-people",
    name: "My People",
    summary: "A small friendship app for the people who matter.",
    stack: ["Next.js"],
    year: "2025",
    tags: ["play", "frontend"],
    repo: "https://github.com/chriss1525/my-people",
    live: "https://my-people-lac.vercel.app",
  },
  {
    slug: "love-letter",
    name: "Love Letter",
    summary: "Interactive medieval scroll letter with calligraphy, ink stains and music.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    tags: ["play", "frontend"],
  },
];

export const clientWork: Project[] = [
  {
    slug: "robin",
    name: "Robin",
    client: "Robin",
    role: "Software engineer across the server, web app and AI pipeline",
    summary:
      "AI second brain for organisations. Conversations become atomic notes, filed into topic wikis anyone in the workspace can search. One instance per organisation, with an MCP server so any AI client can read and write to it.",
    stack: ["TypeScript", "Hono", "PostgreSQL", "pgvector", "Next.js", "MCP"],
    year: "2026",
    tags: ["ai", "backend"],
  },
  {
    slug: "aeli",
    name: "Aeli Health",
    client: "Aeli Health",
    role: "Built all of it, and deployed it to Google Cloud",
    summary:
      "AI therapy-support platform that recommends support avenues, tracks conversation themes over time, and runs sign-in and Stripe subscriptions.",
    stack: ["TypeScript", "Express", "PostgreSQL", "Stripe", "Docker", "Cloud Build"],
    year: "2026",
    tags: ["ai", "backend"],
  },
  {
    slug: "new-skin",
    name: "New Skin",
    client: "Skintech",
    role: "Built most of the backend",
    summary: "Skin-analysis app: accounts with JWT auth and storage for the AI analysis results.",
    stack: ["JavaScript", "PostgreSQL"],
    year: "2025–26",
    tags: ["ai", "backend"],
  },
];

/** Where it started: ALX and early experiments. */
export const archive = [
  { name: "simple_shell", what: "A Unix shell in C", repo: "https://github.com/chriss1525/simple_shell" },
  { name: "monty", what: "Monty bytecode interpreter in C", repo: "https://github.com/chriss1525/monty" },
  { name: "printf", what: "printf from scratch in C", repo: "https://github.com/chriss1525/printf" },
  { name: "AirBnB_clone_v3", what: "Console, REST API and web app", repo: "https://github.com/chriss1525/AirBnB_clone_v3" },
  { name: "sorting_algorithms", what: "Sorting algorithms in C", repo: "https://github.com/chriss1525/sorting_algorithms" },
  { name: "binary_trees", what: "Binary trees in C", repo: "https://github.com/chriss1525/binary_trees" },
  { name: "Madlib", what: "My first terminal game, in C", repo: "https://github.com/chriss1525/Madlib" },
];

export const allProjects = [...projects, ...clientWork];
