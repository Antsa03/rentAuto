import { Client, Utilisateur } from "@prisma/client";

export default interface ClientType extends Client {
  utilisateur: Utilisateur;
}
