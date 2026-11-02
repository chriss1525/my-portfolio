export interface Project {
  slug: string;
  name: string;
  summary: string;
  /** The part of the journey it belongs to, in my words. */
  story?: string;
  /** Where it came from: ALX, HNG, a bounty, my own idea… */
  stage?: string;
  stack: string[];
  year: string;
  /** Client work: described, never linked to code. */
  client?: string;
  /** What I did on it. */
  role?: string;
  /** Where I work now. */
  current?: boolean;
  repo?: string;
  live?: string;
}

const gh = (repo: string) => `https://github.com/chriss1525/${repo}`;

/** Where I started: ALX, a lot of C, and the side projects I built to teach myself. Oldest first. */
export const learning: Project[] = [
  {
    slug: "simple-shell",
    name: "simple_shell",
    stage: "ALX",
    summary: "A Unix shell in C.",
    story: "Built when I was struggling with C, and the reason I stopped being scared of it.",
    stack: ["C"],
    year: "2022",
    repo: gh("simple_shell"),
  },
  {
    slug: "alx-c",
    name: "printf, monty & friends",
    stage: "ALX",
    summary: "printf from scratch, a bytecode interpreter, sorting algorithms and binary trees.",
    story: "The ALX C projects: memory, pointers and data structures, the hard way.",
    stack: ["C"],
    year: "2023",
    repo: gh("monty"),
  },
  {
    slug: "madlib",
    name: "Madlib",
    stage: "my own",
    summary: "A word game for the terminal, built in C and then again in Python.",
    story: "A challenge I set myself, to understand how command-line programs really work.",
    stack: ["C", "Python"],
    year: "2023",
    repo: gh("Madlib"),
  },
  {
    slug: "snake",
    name: "Snake",
    stage: "my own",
    summary: "The classic snake game.",
    story: "I was learning Python and thought a snake game would be fun. It was.",
    stack: ["Python"],
    year: "2023",
    repo: gh("Snake_Game"),
  },
  {
    slug: "commandline-guru",
    name: "Commandline Guru",
    stage: "my own",
    summary: "A Telegram bot that teaches command-line tips and shortcuts.",
    story: "My first attempt at EdTech: a bot that teaches, built while I was still learning Python and bots myself.",
    stack: ["Python", "Telegram"],
    year: "2023",
    repo: gh("Commandline_Guru"),
  },
  {
    slug: "flipdeck",
    name: "FlipDeck",
    stage: "my own",
    summary: "A flashcards app for making decks and studying online.",
    story: "My own project to learn HTML, CSS and JavaScript. It taught me I enjoy the frontend’s craft but love the backend’s puzzles, which is why I lean backend today.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2023",
    repo: gh("FlipDeck"),
  },
  {
    slug: "airbnb-clone",
    name: "AirBnB clone",
    stage: "ALX",
    summary: "A fullstack AirBnB clone: a console, a REST API and a web app, across several repos.",
    story: "Where I learned to build with a partner, across the backend and the frontend.",
    stack: ["Python", "Flask", "MySQL", "JavaScript"],
    year: "2023",
    repo: gh("AirBnB_clone_v3"),
  },
];

/** The projects that took me past the basics. */
export const levellingUp: Project[] = [
  {
    slug: "chrome-extension-server",
    name: "Screen recorder API",
    stage: "HNG internship",
    summary: "The API behind a screen-recording Chrome extension: it uploads videos, transcribes them, and serves the video and transcript data.",
    story: "It pushed me past the simple REST APIs I thought I knew into real backend work. HNG shaped my resilience with complex code.",
    stack: ["Node.js", "Express"],
    year: "2023",
    repo: gh("chrome-extension-server"),
  },
  {
    slug: "jamz",
    name: "JamZ",
    stage: "final ALX project",
    summary: "An audio API that splits songs into vocals and instrumentals with Demucs and stores them in Supabase.",
    story: "The one I loved. Where I got comfortable with APIs, Postman and shipping something whole.",
    stack: ["JavaScript", "Demucs", "Supabase"],
    year: "2024",
    repo: gh("JamZ"),
  },
];

/** How I learned what blockchains are for. */
export const onChain: Project[] = [
  {
    slug: "fundraisa",
    name: "Fundraisa",
    stage: "learning",
    summary: "Decentralised fundraising campaigns on the Internet Computer.",
    story: "My first ICP project, built while I was learning what blockchain is for, and my first time with Rust-family languages (back when Motoko was rough).",
    stack: ["ICP", "Motoko", "JavaScript"],
    year: "2023",
    repo: gh("fundraisa"),
  },
  {
    slug: "task-manager",
    name: "Task Manager",
    stage: "learning",
    summary: "A simple task manager as a pure Rust canister on the Internet Computer.",
    story: "Another learning one: Rust, with nothing else in the way.",
    stack: ["Rust", "ICP"],
    year: "2023",
    repo: gh("task_manager"),
  },
  {
    slug: "dex-comparator",
    name: "DEX Comparator",
    stage: "bounty",
    summary: "Compares DEX prices on-chain, with KRNL Protocol signing the price data.",
    story: "KRNL had a bounty, so I jumped in. I only got fifty dollars for it 😢",
    stack: ["Solidity", "KRNL"],
    year: "2025",
    repo: gh("dex-comparator"),
  },
];

export const clientWork: Project[] = [
  {
    slug: "robin",
    name: "Robin",
    client: "Robin",
    current: true,
    live: "https://withrobin.ai/knowledge",
    summary:
      "An AI second brain for organisations. People talk to it through Claude, the web app or any MCP client, and it files what they say into topic wikis the whole workspace can search. One instance per organisation, and every wiki has a guardian.",
    role: "The server and API, the AI agent that turns conversations into notes and wikis, the MCP tools, permissions and database migrations, and the weekly release train.",
    stack: ["TypeScript", "Hono", "PostgreSQL", "pgvector", "Next.js", "MCP", "BullMQ"],
    year: "2026",
  },
  {
    slug: "aeli",
    name: "Aeli Health",
    client: "Aeli Health",
    summary:
      "An AI therapy-support platform: it recommends support avenues, tracks conversation themes over time, and runs sign-in, feedback and Stripe subscriptions.",
    role: "Built all of it, then containerised it and deployed it to Google Cloud.",
    stack: ["TypeScript", "Express", "PostgreSQL", "Stripe", "Docker", "Cloud Build"],
    year: "2026",
  },
  {
    slug: "new-skin",
    name: "New Skin",
    client: "Skintech",
    summary: "A skin-analysis app for a skincare company: people get AI analysis of their skin and keep their results.",
    role: "Built most of the backend, including accounts with JWT auth and storage for the AI analysis results.",
    stack: ["JavaScript", "PostgreSQL"],
    year: "2025–26",
  },
  {
    slug: "blockcoop",
    name: "BlockCoop",
    client: "BlockCoop",
    summary: "A DeFi savings and lending protocol with liquidity pools, leveraged borrowing, oracle price feeds and an admin dashboard.",
    role: "Built the core components and the admin interface. Client work, and a big learning experience too.",
    stack: ["Solidity", "Hardhat", "Node.js", "PostgreSQL", "Next.js"],
    year: "2025",
  },
];

export const allProjects = [...learning, ...levellingUp, ...onChain, ...clientWork];
