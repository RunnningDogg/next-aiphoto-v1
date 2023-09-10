import prisma from "@/lib/db";
import { NextApiResponse } from "next";

type RequestBody = {
  email: string;
  password: string;
};

export async function POST(req: Request, res: NextApiResponse) {
  const { email, password } = (await req.json()) as RequestBody;
  if (!email || !password) {
    return res.status(400).json({ error: "请输入邮箱和密码" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user && user.password === password) {
    const { password, ...userWithOutPassword } = user;
    return new Response(JSON.stringify(userWithOutPassword));
  }

  // return res.status(200).json(newUser);

  return new Response(JSON.stringify({ error: "邮箱或密码错误" }));
}
