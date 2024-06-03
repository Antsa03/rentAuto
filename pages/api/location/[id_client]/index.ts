import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_client } = req.query;
    const locations = await prisma.location.findMany({
      include: {
        vehicule: true,
      },
      where: { id_client: Number(id_client?.toString()) },
    });
    return res.status(200).json(locations);
  } catch (error) {
    return res.status(500).json(error);
  }
}
