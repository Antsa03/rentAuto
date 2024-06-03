import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { immatriculation } = req.query;
    if (immatriculation) {
      const setDispoVehicule = await prisma.vehicule.update({
        where: { immatriculation: immatriculation.toString() },
        data: {
          disponible: true,
        },
      });
      return res.status(200).json(setDispoVehicule);
    } else return res.status(500).json("Immatriculation introuvable");
  } catch (error) {
    return res.status(500).json(error);
  }
}
