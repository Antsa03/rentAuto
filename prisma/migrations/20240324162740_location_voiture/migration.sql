-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" SERIAL NOT NULL,
    "photo_profil" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "genre" VARCHAR(1) NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Client" (
    "id_client" SERIAL NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    "permis_de_conduire" TEXT NOT NULL,
    "date_de_naissance" DATE NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "immatriculation" TEXT NOT NULL,
    "image_vehicule" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "annee" INTEGER NOT NULL,
    "kilometrage" INTEGER NOT NULL,
    "carburant" TEXT NOT NULL,
    "type_vehicule" TEXT NOT NULL,
    "prix_par_jour" DOUBLE PRECISION NOT NULL,
    "caution" DOUBLE PRECISION NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("immatriculation")
);

-- CreateTable
CREATE TABLE "Location" (
    "id_location" SERIAL NOT NULL,
    "id_client" INTEGER NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "date_debut" DATE NOT NULL,
    "date_fin" DATE NOT NULL,
    "prix_total" DECIMAL(65,30) NOT NULL,
    "payee_location" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id_location")
);

-- CreateTable
CREATE TABLE "Facture" (
    "id_facture" SERIAL NOT NULL,
    "id_location" INTEGER NOT NULL,
    "date_facture" DATE NOT NULL,
    "montant" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id_facture")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_immatriculation_fkey" FOREIGN KEY ("immatriculation") REFERENCES "Vehicule"("immatriculation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "Location"("id_location") ON DELETE RESTRICT ON UPDATE CASCADE;
