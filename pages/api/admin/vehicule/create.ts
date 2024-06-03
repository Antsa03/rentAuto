import prisma from "@/prisma/client";
import { Vehicule } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      return res.status(401).json("Méthode non autorisé");

    const vehiculeProps: Vehicule = req.body;
    const createVehicule = await prisma.vehicule.create({
      data: vehiculeProps,
    });
    return res.status(200).json(createVehicule);
  } catch (error) {
    return res.status(500).json(error);
  }
}
