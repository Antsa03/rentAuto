import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const vehicules = await prisma.vehicule.findMany({
      orderBy: {
        categorie: "asc",
      },
    });
    return res.status(200).json(vehicules);
  } catch (error) {
    return res.status(500).json(error);
  }
}
