import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getUser(req, res);
    case "PUT":
      return await updateUser(req, res);
    default:
      res?.setHeader("Allow", ["GET", "PUT"]);
      res?.status(405)?.end(`Method ${method} Not Allowed`);
  }
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req?.query;

  try {
    const user = await prisma?.user?.findUnique({
      where: { id: userId as string },
    });

    if (!user) return res?.status(404).json({ message: "User not found" });

    res?.status(200).json(user);
  } catch (error) {
    res?.status(500).json({ message: "Internal server error" });
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req?.query;
  const { name, email, password } = req?.body;

  try {
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt?.hash(password, 10);
    }

    const updatedUser = await prisma?.user?.update({
      where: { id: userId as string },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
