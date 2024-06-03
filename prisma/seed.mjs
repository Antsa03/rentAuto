import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const utilisateur = await prisma.utilisateur.upsert({
    where: { email: "admindefault@gmail.com" },
    update: {},
    create: {
      photo_profil: "user.png",
      nom: "RAMAMONJISOA",
      prenom: "Andrianiony Antsatiana",
      genre: "M",
      adresse: "Ambalabe Andrainjato",
      telephone: "+261344027527",
      email: "ramantsa03@gmail.com",
      password: await bcrypt.hash("antsa2003", 10),
      isAdmin: true,
    },
  });
  console.log(utilisateur);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
