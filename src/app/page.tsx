import Header from "@/components/Header";
import ChessGame from "@/components/ChessGame";
import { latestPosts } from "@/lib/feeds";

export default async function Home() {
  const [medium, substack] = await Promise.all([
    latestPosts("https://medium.com/feed/@okothchris15"),
    latestPosts("https://amadwoman.substack.com/feed"),
  ]);
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Christine Okoth, fullstack engineer: a portfolio you play as a game of chess</h1>
        <ChessGame writing={{ medium, substack }} />
      </main>
    </>
  );
}
