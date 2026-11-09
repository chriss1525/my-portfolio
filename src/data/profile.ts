const SUBSTACK = "https://amadwoman.substack.com/";

export const profile = {
  name: "Christine Okoth",
  fullName: "Christine Adhiambo Okoth",
  handle: "chriss",
  title: "Fullstack Engineer",
  pitch:
    "Fullstack engineer. I build backend systems and AI knowledge tools, and I teach people how the web works, from their first HTML page to their first smart contract.",
  now: {
    label: "building Robin, an AI second brain for organisations",
    stack: "Postgres · MCP · TypeScript",
  },
  location: "Nairobi, Kenya",
  email: "okothchris15@gmail.com",
  siteUrl: "https://chrissokoth.vercel.app",
  cv: "/CHRISTINE_OKOTH.pdf",
  links: {
    github: "https://github.com/chriss1525",
    linkedin: "https://www.linkedin.com/in/christine-okoth/",
    medium: "https://medium.com/@okothchris15",
    substack: SUBSTACK,
  },
  education: [
    { title: "Certificate in Software Engineering, Backend", school: "ALX Africa", date: "01/2024" },
    { title: "Bachelor of Education, Guidance and Counselling", school: "Moi University, Eldoret", date: "" },
  ],
  languages: ["English (fluent)", "Swahili (native)", "German (basics)"],
  /** The walking pawn: from first square to queen. */
  path: ["B.Ed", "instructional design", "UX design", "ALX", "blockchain", "AI"],
  story: [
    "I studied education and meant to teach language and literature.",
    "Instructional design pulled me towards tech, ALX gave me the foundations, and I taught myself the rest until backend systems became my day job.",
    "I still teach: how the web works, how software gets built, and Web3 once people are ready for it.",
  ],
  /** The fun facts brick deals these as cards: a name and a symbol on the face, then the fact, which can end with a link. */
  funfacts: [
    { card: "The Bridge", glyph: "⇄", text: "Teaching and code are my two passions, so I have a soft spot for EdTech and see myself building for it one day." },
    { card: "The Counsellor", glyph: "☾", text: "I'm a certified school counsellor, which means I know a bit of psychology and can probably read your mind." },
    {
      card: "The Teacher",
      glyph: "✏",
      text: "I'm a trained teacher too. In Kenya a school counsellor also teaches two subjects, and mine were English language and literature. For my practicum I was the counsellor and a teacher at the same school, at the same time, for three months.",
    },
    {
      card: "The Wordsmith",
      glyph: "✎",
      text: "Teaching language and literature suited me, because I will easily lose an evening discussing language, literature and everything in between, which explains my writing.",
      link: { label: "Check it out here →", href: SUBSTACK },
    },
    { card: "The Creative", glyph: "✂", text: "I'm a creative at heart and a slave to my whims. I've sung (well enough), sewn, written poetry and written plays. Each one became my whole personality for somewhere between three minutes and three years." },
    { card: "The Player", glyph: "♞", text: "I love chess, as you can probably tell." },
    { card: "The Myth-Chaser", glyph: "ᛟ", text: "I'm a big history nerd, and I fall in love with mythology of all kinds: Greek, Roman, Norse, Chinese, Luo, Kamba. If it's a myth, I'll go down its rabbit hole." },
    { card: "The Odyssey", glyph: "⚓", text: "Yes, I’ve read the Odyssey, and EPIC the musical is still a work of art. Argue with me." },
  ] as { card: string; glyph: string; text: string; link?: { label: string; href: string } }[],
};
