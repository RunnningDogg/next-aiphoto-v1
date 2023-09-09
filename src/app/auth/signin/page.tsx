"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
function Page() {
  const hanldeSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <div className="  w-screen min-h-screen">
      <div className="sm:w-[450px] lg:p-10 flex flex-col gap-2 mx-auto my-auto min-h-screen justify-center">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
        <p className="text-slate-500 text-sm text-center">
          Enter your email below to login your account
        </p>
        <form className="mt-2 flex flex-col gap-3">
          <div className="flex flex-col w-full max-w-sm   gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              className="py-1"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full max-w-sm   gap-1.5">
            <Label htmlFor="email">Password</Label>
            <Input
              className="py-1"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={(e) => hanldeSubmit(e)}>
            {loading && <Icons.spinner className="mr-2 w-4 h-5 animate-spin" />}{" "}
            Sign In With Email
          </Button>
        </form>

        {/* Oauth */}
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-md text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Button variant="outline">
            {!loading ? (
              <Icons.gitHub className="w-4 h-4 mr-2" />
            ) : (
              <Icons.spinner className="mr-2 w-4 h-5 animate-spin" />
            )}
            Github
          </Button>

          <Button variant="outline">
            {!loading ? (
              <Icons.google className="w-4 h-4 mr-2" />
            ) : (
              <Icons.spinner className="mr-2 w-4 h-5 animate-spin" />
            )}
            Google
          </Button>

          <Button variant="outline">
            {!loading ? (
              <Icons.apple className="w-4 h-4 mr-2" />
            ) : (
              <Icons.spinner className="mr-2 w-4 h-5 animate-spin" />
            )}
            Apple
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
