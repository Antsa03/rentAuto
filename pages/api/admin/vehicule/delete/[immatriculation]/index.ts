import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "DELETE")
      return res.status(401).json("Méthode non autorisé");
    const { immatriculation } = req.query;
    if (immatriculation && typeof immatriculation === "string") {
      const deleteVehicule = await prisma.vehicule.delete({
        where: { immatriculation: immatriculation },
      });
      return res.status(201).json(deleteVehicule);
    } else return res.status(500).json("Immatriculation invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}
