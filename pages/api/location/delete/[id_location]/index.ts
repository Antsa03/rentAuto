import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "DELETE")
      return res.status(401).json("Méthode non autorisé");
    const { id_location } = req.query;
    if (id_location) {
      const deleteLocation = await prisma.location.delete({
        where: { id_location: parseInt(id_location.toString()) },
      });
      if (deleteLocation) {
        await prisma.vehicule.update({
          where: { immatriculation: deleteLocation.immatriculation },
          data: {
            disponible: true,
          },
        });
      }
      return res.status(200).json(deleteLocation);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
