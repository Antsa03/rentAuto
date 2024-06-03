import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const locations = await prisma.location.findMany({
      include: {
        client: {
          include: {
            utilisateur: true,
          },
        },
        vehicule: true,
      },
    });
    return res.status(200).json(locations);
  } catch (error) {
    return res.status(500).json(error);
  }
}
