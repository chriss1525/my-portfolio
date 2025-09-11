# 🖥️ Christine's Terminal Portfolio

A retro terminal-themed portfolio website built with Next.js, TypeScript, and Tailwind CSS. Experience the nostalgia of old-school terminals with modern web technologies!

## 🌟 Features

### 🎨 Terminal Aesthetics
- **CRT Monitor Effect**: Authentic scanlines and screen curvature
- **Matrix Rain Background**: Animated falling characters effect
- **Terminal Color Scheme**: Classic green text on black background with amber highlights
- **Monospace Typography**: JetBrains Mono and Fira Code fonts

### ⚡ Interactive Elements
- **Typewriter Animations**: Realistic terminal typing effects
- **Blinking Cursor**: Authentic terminal cursor animation
- **Terminal Commands**: Interactive command prompts throughout the site
- **Glowing Effects**: Hover effects with terminal-style glows

### 🔧 Technical Features
- **Responsive Design**: Looks great on all devices
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Performance Optimized**: Fast loading with Turbopack
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Customization

### Colors
Edit the CSS variables in `src/app/globals.css`:
```css
:root {
  --terminal-bg: #0a0a0a;        /* Background */
  --terminal-green: #00ff00;      /* Primary text */
  --terminal-amber: #ffb000;      /* Highlights */
  --terminal-cyan: #00ffff;       /* Links */
  --terminal-red: #ff0000;        /* Errors/warnings */
  --terminal-gray: #808080;       /* Comments */
  --terminal-white: #ffffff;      /* Secondary text */
}
```

### Content
Update your information in:
- `src/components/Hero.tsx` - Main introduction
- `src/data/skills.ts` - Technical skills
- `src/data/experience.ts` - Work experience
- `src/components/Header.tsx` - Social links

## 🎭 Components

### Core Components
- **MatrixRain**: Animated background effect
- **Typewriter**: Terminal typing animation
- **Hero**: Main introduction with ASCII art
- **Skills**: Technical skills display
- **Timeline**: Experience timeline
- **Header**: Navigation with terminal styling

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

*Built with ❤️ and lots of ☕ by Christine Okoth*
