import { NextApiRequest, NextApiResponse } from "next";
import responseData from "@/utils/responseData";
import prisma from "@/lib/prisma";

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(403).json(responseData(403, "Method not allowed", null, null));
    }

    const data = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });

    return res.status(200).json(responseData(200, "All user", null, data));
  } catch (error) {
    return res.status(500).json(responseData(500, "Internal Server Error", error, null));
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(403).json(responseData(403, "Method not allowed", null, null));
    }

    const { username, roomId } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        username,
        roomId,
      },
    });

    if (existingUser) {
      return res.status(403).json(responseData(403, "Username telah digunakan", null, null));
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        roomId,
      },
    });

    return res.status(200).json(responseData(200, "Username telah berhasil dibuat", null, newUser));
  } catch (error) {
    return res.status(500).json(responseData(500, "Internal Server Error", error, null));
  }
}

export { getUser, createUser };
