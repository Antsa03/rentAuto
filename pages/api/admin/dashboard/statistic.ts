import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve the number of clients
    const clientCount = await prisma.client.count();

    // Retrieve the number of vehicles
    const vehicleCount = await prisma.vehicule.count();

    // Retrieve the total price of all locations
    const totalLocationPrice = await prisma.location.aggregate({
      _sum: {
        prix_total: true,
      },
    });

    // Construct the statistics object
    const statistics = {
      nbr_client: clientCount,
      nbr_voiture: vehicleCount,
      total_prix_location: totalLocationPrice._sum.prix_total || 0,
    };

    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve statistics" });
  }
}
