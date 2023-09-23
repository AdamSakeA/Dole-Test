import { NextApiRequest, NextApiResponse } from "next";
import ResponseData from "@/utils/responseData";
import prisma from "@/lib/prisma";

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "DELETE") {
      return res.status(403).json(ResponseData(403, "Method not allowed", null, null));
    }

    const { id } = req.query;

    const data = await prisma.user.delete({
      where: {
        id: id as string,
      },
    });

    return res.status(200).json(ResponseData(200, "Success Delete User", null, data));
  } catch (error) {
    return res.status(500).json(ResponseData(500, "Internal Server Error", error, null));
  }
}

async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(403).json(ResponseData(403, "Method not allowed", null, null));
    }

    const { id } = req.query;

    const data = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });

    return res.status(200).json(ResponseData(200, "Success Get User", null, data));
  } catch (error) {
    return res.status(500).json(ResponseData(500, "Internal Server Error", error, null));
  }
}

export { deleteUser, getUserById };
