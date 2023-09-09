import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db";
// import { compare } from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Please Input Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Please Input Password",
        },
      },
      async authorize(credentials) {
        // db数据 js语法 如果为空返回 {}
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("请输入用户名和密码");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        // 如果用户不存在或者 password 不match
        // if (!user || !(await compare(password, user.password))) {
        //   throw new Error("用户名或密码错误");
        // }
        if (!user || password !== user.password) {
          throw new Error("用户名或密码错误");
        }
        return user;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/auth/signin",
  },
};

// 我们可以用 process.env.GITHUB_ID 和 process.env.GITHUB_SECRET 来访问环境变量。
// 当提示报错的时候, 可以用 as string
