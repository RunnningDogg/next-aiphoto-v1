import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Github,
  Twitter,
  Facebook,
  LogOut,
  User,
  CreditCard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggleBtn";

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  // console.log(process.env.NEXT_PUBLIC_RAWG_API_KEY);

  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const games = await res.json();

  return games.results;
};

async function Page() {
  const games = await getGames();
  const session = await getServerSession(options);
  console.log(session);

  // const users = await prisma.user.findMany();
  // console.log(users);

  return (
    <section className="px-12 py-6 flex flex-col">
      <header className="border-b py-4 flex justify-between">
        <h1 className="text-4xl font-bold">
          extendPhotos.io <ModeToggle />{" "}
        </h1>
        <div className="flex gap-3">
          {/* 区分登录和非登录 */}
          {!session ? (
            <Button>
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {session?.user?.image ? (
                  <Avatar>
                    <AvatarImage src={session?.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <span>My Account</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link href="/api/auth/signout">
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <main className="mt-32 flex flex-col gap-6 items-center">
        <h2 className="text-5xl font-bold  text-center">
          Extend your Ecom photos with AI
        </h2>
        <p className="mt-2 text-slate-400  mx-auto max-w-md ">
          Exteng the merchant photo with greate extension(16:9、9:16、3:4 and
          4:3) , using the latest AIGC technology
        </p>

        <div className="cta flex gap-6">
          <Button variant="secondary">Learn How it Built</Button>
          <Button>Extend Yout Photo</Button>
        </div>

        {/* <div className="image-gallery">
          <div className="grid grid-cols-2 gap-6">
            {games.map((game) => (
              <div key={game.id} className="flex flex-col gap-3 items-center">
                <h2 className=" text-xl font-semibold">{game.name}</h2>
                <Image
                  src={game.background_image}
                  width={200}
                  height={200}
                  alt="image-hero"
                  className="aspect-video rounded-lg"
                />
              </div>
            ))}
          </div>
        </div> */}
        <div className="image-gallery">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3 items-center">
              <h2 className=" text-xl font-semibold">Before</h2>
              <Image
                src="/v1-1.jpg"
                width={900}
                height={900}
                alt="image-hero"
                className="rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3 items-center">
              <h2 className=" text-xl font-semibold">After</h2>
              <Image
                src="/v1-2.jpg"
                width={900}
                height={900}
                alt="image-hero"
                className=" rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3 items-center">
              <h2 className=" text-xl font-semibold">Before</h2>
              <Image
                src="/v2-1.jpg"
                width={900}
                height={900}
                alt="image-hero"
                className="  rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3 items-center">
              <h2 className=" text-xl font-semibold">After</h2>
              <Image
                src="/v2-2.jpg"
                width={900}
                height={900}
                alt="image-hero"
                className="  rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 flex justify-between border-t py-2 px-4">
        <p className="text-xl font-semibold">
          Powered By Vercel, Replicate, and OpenAI
        </p>
        <div className="logos flex gap-2">
          <Link href="http://www.baidu.com" target="_blank">
            <Twitter size={24} fill="state" />
          </Link>

          <Link href="http://www.baidu.com" target="_blank">
            <Github size={24} fill="state" />
          </Link>

          <Link href="http://www.baidu.com" target="_blank">
            <Facebook size={24} fill="state" />
          </Link>
        </div>
      </footer>
    </section>
  );
}

export default Page;
