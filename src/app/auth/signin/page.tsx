"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
// import {compare} from "bcrypt";
function Page() {
  // 登录成功后显示通知
  const { toast } = useToast();
  const router = useRouter();

  const hanldeCredentialSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(result);
      if (!result?.error) {
        toast({
          title: "Login Success",
          description: "You are now logged in",
          duration: 3000,
          className: "bg-green-200 top-0",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your email and password",
          duration: 3000,
          variant: "destructive",
        });
        setError(result?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleGithubLogin = async () => {
    setLoading(true);
    const result = await signIn("github", {
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="  w-screen min-h-screen">
      <div className="sm:w-[450px] lg:p-10 flex flex-col gap-2 mx-auto my-auto min-h-screen justify-center">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
        <p className="text-slate-500 text-sm text-center">
          Enter your email below to login your account
        </p>
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{error}, 请重试</AlertDescription>
          </Alert>
        )}

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
          <Button onClick={(e) => hanldeCredentialSubmit(e)}>
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
          <Button variant="outline" onClick={handleGithubLogin}>
            {!loading ? (
              <Icons.gitHub className="w-4 h-4 mr-2" />
            ) : (
              <Icons.spinner className="mr-2 w-4 h-5 animate-spin" />
            )}
            Github
          </Button>

          <Button variant="outline" onClick={handleGoogleLogin}>
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
