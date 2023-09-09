import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return res.status(400).json({ error: "请输入用户名和密码" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(400).json({ error: "用户已存在" });
  }
  const hashedPassword = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  // return res.status(200).json(newUser);
  return NextResponse.json(newUser);
}
