/** The chess game: what each brick is, what unlocks it, and the lines it says. */

export interface Brick {
  label: string;
  /** Shown in the "still hidden" list. */
  how: string;
  bg: string;
  fg: string;
  /** Width of the brick in the tower, in px. */
  width: number;
  /** Small line above the heading; one per visit to this brick, cycling. */
  eyebrows: string[];
  /** Big heading; cycles like eyebrows. Empty for bricks with a fixed heading. */
  headings: string[];
}

/** The ten bricks. A brick's index is its id (see `B` in ChessGame). */
export const bricks: Brick[] = [
  {
    label: "who I am",
    how: "move a pawn",
    bg: "#ffd500",
    fg: "#1b1b1f",
    width: 300,
    eyebrows: ["you moved a pawn · who I am", "another pawn · still me", "pawns again · the walk goes on", "one more pawn · one more square"],
    headings: [],
  },
  {
    label: "skills",
    how: "move a knight",
    bg: "#c91a09",
    fg: "#ffffff",
    width: 260,
    eyebrows: ["you moved a knight · skills", "the knight again · skills", "still hopping · skills"],
    headings: [
      "Knights don’t move in straight lines. Neither do I.",
      "Another L-shape. Still not straight.",
      "Hop, hop. Here’s everything I can do.",
      "The knight again? Fine. Skills again.",
    ],
  },
  {
    label: "experience",
    how: "move a bishop",
    bg: "#0055bf",
    fg: "#ffffff",
    width: 320,
    eyebrows: ["you moved a bishop · experience", "bishop again · experience", "more diagonals · experience"],
    headings: ["The long diagonal.", "Diagonals all the way down.", "Same bishop, same long road.", "Still on the diagonal."],
  },
  {
    label: "where I started",
    how: "move your king",
    bg: "#36aebf",
    fg: "#1b1b1f",
    width: 290,
    eyebrows: ["you moved your king · where I started", "the king again · where I started", "small steps · where I started"],
    headings: ["The king takes small steps. So did I.", "One square at a time. That’s how I learned.", "Back to the beginning."],
  },
  {
    label: "levelling up",
    how: "capture a piece",
    bg: "#00852b",
    fg: "#ffffff",
    width: 280,
    eyebrows: ["you captured · levelling up", "another capture · levelling up", "taking again · levelling up"],
    headings: [
      "You took something. Here’s what pushed me.",
      "Another capture. Another step up.",
      "Greedy. I like it. Here’s what made me better.",
    ],
  },
  {
    label: "built on-chain",
    how: "move a rook",
    bg: "#a5ca18",
    fg: "#1b1b1f",
    width: 270,
    eyebrows: ["you moved a rook · built on-chain", "the rook again · built on-chain", "rooks again · built on-chain"],
    headings: ["Rooks move in straight lines, like a ledger. Here’s what I built on-chain.", "Another rook move. More blocks on the chain.", "Straight lines again. More on-chain."],
  },
  {
    label: "client work",
    how: "move or lose your queen",
    bg: "#fe8a18",
    fg: "#1b1b1f",
    width: 300,
    eyebrows: ["your queen · client work", "the queen again · client work", "queen on the move · client work"],
    headings: [
      "The queen works for others.",
      "The queen’s out again. Client work it is.",
      "Moving the queen? She’s busy with clients.",
    ],
  },
  {
    label: "writing",
    how: "give check",
    bg: "#00727a",
    fg: "#ffffff",
    width: 240,
    eyebrows: ["you gave check · writing", "check again · writing", "still checking · writing"],
    headings: ["Check. And check out my writing.", "Check again. More reading.", "Still in check. Still writing."],
  },
  {
    label: "fun facts",
    how: "find every brick: it's the bonus",
    bg: "#e4adc8",
    fg: "#1b1b1f",
    width: 230,
    eyebrows: ["bonus · fun facts", "bonus · fun facts again"],
    headings: ["One more thing. Time to get personal.", "Still here? Here’s more of me."],
  },
  {
    label: "say hello",
    how: "checkmate (or find all the others)",
    bg: "#3a3a42",
    fg: "#ffffff",
    width: 200,
    eyebrows: ["you found all the others · say hello"],
    headings: [],
  },
];

/** Lines for special moves. They replace a brick's usual eyebrow and heading for that one move. */
export const SPECIAL = {
  mate: { eyebrow: "checkmate · say hello" },
  allFound: { eyebrow: "you found all the others · say hello" },
  enPassant: { eyebrow: "en passant · levelling up", heading: "En passant! Nobody believes that’s legal. Here’s what pushed me." },
  castle: { eyebrow: "you castled · where I started", heading: "You castled. Safe at home, back where I started." },
  promotion: {
    eyebrow: "your pawn became a queen · who I am",
    note: "Your pawn walked all the way and became a queen. So did I: B.Ed, instructional design, UX, ALX, blockchain, AI.",
  },
  doubleCheck: { eyebrow: "double check · writing", heading: "Double check! Read twice." },
  captureCheck: { eyebrow: "a capture and a check · writing", heading: "You took something and gave check. Show-off. Here’s my writing." },
  discoveredCheck: { eyebrow: "discovered check · writing", heading: "A discovered check. Sneaky. Check out my writing." },
  knightCheck: { eyebrow: "knight check · writing", heading: "A knight check. Nobody sees those coming." },
  queenCheck: { eyebrow: "queen check · writing", heading: "Check from the queen. Bold. Here’s my writing." },
  /** Capturing, by what was taken. */
  took: {
    p: { eyebrow: "you took a pawn · levelling up", heading: "You took a pawn. Small wins add up, and these did." },
    n: { eyebrow: "you took a knight · levelling up", heading: "You took a knight. Nobody likes their forks. Here’s what pushed me." },
    b: { eyebrow: "you took a bishop · levelling up", heading: "You took a bishop. One less diagonal. Here’s what levelled me up." },
    r: { eyebrow: "you took a rook · levelling up", heading: "You took a rook. That’s a big one. Here’s what pushed me." },
    q: { eyebrow: "you took a queen · levelling up", heading: "You took their queen! Here are the ones I’m proudest of." },
  } as Record<string, { eyebrow: string; heading: string }>,
};

/** What the status line says when black takes one of your pieces. */
export const LOSSES: Record<string, string> = {
  p: "Black took your pawn.",
  n: "Black took your knight. Rude.",
  b: "Black took your bishop. Ouch.",
  r: "Black took your rook. Rude.",
  q: "Black took your queen!",
};

export const QUEEN_LOST = {
  eyebrow: "you lost your queen · client work",
  heading: "You lost your queen. She was working for clients anyway.",
};

/** Légal's mate, the seven-move line the hint walks people through. */
export const legalsMate: { white: [string, string]; black: [string, string] | null; hint: string; reply: string }[] = [
  { white: ["e2", "e4"], black: ["e7", "e5"], hint: "Push the king’s pawn two squares: e2 to e4.", reply: "Black mirrors you." },
  { white: ["g1", "f3"], black: ["d7", "d6"], hint: "Bring a knight out: g1 to f3.", reply: "Black plays it quiet." },
  { white: ["f1", "c4"], black: ["c8", "g4"], hint: "Bishop onto the long diagonal: f1 to c4.", reply: "Black pins your knight." },
  { white: ["b1", "c3"], black: ["g7", "g6"], hint: "The other knight: b1 to c3. No new brick this time. Trust the plan.", reply: "Black isn’t paying attention." },
  { white: ["f3", "e5"], black: ["g4", "d1"], hint: "Knight takes e5. Yes, your queen will hang.", reply: "Black took your queen. Exactly as planned." },
  { white: ["c4", "f7"], black: ["e8", "e7"], hint: "Bishop takes f7. Check!", reply: "The king runs to e7." },
  { white: ["c3", "d5"], black: null, hint: "Knight to d5. Checkmate.", reply: "" },
];

export const quietMoves = ["Nothing in that one.", "Solid move. No brick.", "Nope, nothing hiding there.", "Fine move. Empty pockets."];
