import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const locationsByVehicle = await prisma.location.groupBy({
        by: ["immatriculation"],
        _count: {
          immatriculation: true,
        },
      });

      const data = locationsByVehicle.map((locationCount) => {
        return {
          "Nombre de location": locationCount._count.immatriculation,
          immatriculation: locationCount.immatriculation,
        };
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
