import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Now from "@/components/Now";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import TerminalCommands from "@/components/TerminalCommands";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 md:px-6">
        <Hero />
        <Now />
        <Projects />
        <Timeline />
        <Skills />
        <Writing />
        <Contact />
      </main>
      <TerminalCommands />
    </>
  );
}
