import { Location, Vehicule } from "@prisma/client";

export default interface ClientLocation extends Location {
  vehicule: Vehicule;
}
