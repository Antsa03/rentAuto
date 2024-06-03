import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const utilisateur = await prisma.utilisateur.findMany();
    return res.status(200).json(utilisateur);
  } catch (error) {
    return res.status(500).json(error);
  }
}
