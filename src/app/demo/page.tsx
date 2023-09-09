import { Button } from "@/components/ui/button";

import Image from "next/image";

/**
 * 用来fetch 游戏,学习写 server component
 */
type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  rating_count: number;
};

const getGames = async (): Promise<Game[]> => {
  console.log(process.env.NEXT_PUBLIC_RAWG_API_KEY);

  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const games = await res.json();

  return games.results;
};

export default async function Home() {
  // const games = await getGames();
  // console.log(games);

  return (
    <main className="min-h-screen bg-red-50">
      {/* {games.map((game) => (
        <div key={game.id} className="flex gap-3">
          <div>{game.id}</div>
          <div>{game.name}</div>
          <Image
            src={game.background_image}
            width={100}
            height={100}
            alt="image-hero"
            className="aspect-video"
          />
        </div>
      ))} */}
    </main>
  );
}
