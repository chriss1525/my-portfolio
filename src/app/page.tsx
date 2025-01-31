import Header from "../components/Header";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <Timeline />
      <Skills />
    </main>
  );
}
