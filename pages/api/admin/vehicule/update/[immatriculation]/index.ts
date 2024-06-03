import prisma from "@/prisma/client";
import { Vehicule } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PUT")
      return res.status(401).json("Méthode non autorisé");

    const { immatriculation } = req.query;
    const vehiculeProps: Vehicule = req.body;
    if (immatriculation && typeof immatriculation === "string") {
      const updateVehicule = await prisma.vehicule.update({
        where: { immatriculation: immatriculation },
        data: vehiculeProps,
      });
      return res.status(200).json(updateVehicule);
    } else return res.status(404).json({ message: "Immatriculation invalide" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
