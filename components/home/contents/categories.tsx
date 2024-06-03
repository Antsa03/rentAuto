import { useState } from "react";
import { Category } from "../components/category";

const LIMIT_OF_CATEGORY = 3;

export const Categories = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const categorie = [
    {
      id: 1,
      name: "Berline",
      description:
        "Elégance et raffinement au service de votre confort.  Nos berlines vous offrent une expérience de conduite haut de gamme, pour un plaisir incomparable.",
      image: "car-4.png",
      lien: "/vehicule#Berline",
      stock: 50,
    },
    {
      id: 2,
      name: "Citadine",
      description:
        "Zipsotez en ville avec nos citadines ! Maniable, économique et stylée, elle est votre alliée idéale pour les trajets quotidiens et les escapades urbaines.",
      image: "car-5.png",
      lien: "/vehicule#Citadine",
      stock: 50,
    },
    {
      id: 3,
      name: "Compacte",
      description:
        "Parfaite pour tous les terrains, que ce soit pour un road trip entre amis ou une virée en famille, elle vous offrira un maximum de confort et de plaisir de conduite.",
      image: "car-2.png",
      lien: "/vehicule#Compacte",
      stock: 20,
    },
    {
      id: 4,
      name: "Monospace",
      description:
        "Besoin de plus d'espace ? Notre gamme de monospace vous offre la souplesse dont vous avez besoin quand 5 places ne sont pas suffisant.",
      image: "car-1.png",
      lien: "/vehicule#Monospace",
      stock: 15,
    },
    {
      id: 5,
      name: "SUV",
      description:
        "Explorez de nouveaux horizons avec nos SUV robustes et stylés. Aventurez-vous en famille ou entre amis. Espace, sécurité et performance pour des moments inoubliables.",
      image: "car-3.png",
      lien: "/vehicule#SUV",
      stock: 50,
    },
  ];

  const limit = isShow ? categorie?.length : LIMIT_OF_CATEGORY;

  const toggleShow = () => setIsShow((currentValue) => !currentValue);

  return (
    <div className="px-10">
      <h2 className="text-3xl font-semibold text-center">
        Découvrir nos catégories de voiture{" "}
      </h2>
      <div className="grid grid-cols-2 tablet:grid-cols-3 gap-5 mt-10">
        {categorie?.slice(0, limit).map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>

      <button
        onClick={toggleShow}
        className="mt-5 ml-[50%] -translate-x-1/2 py-1 px-5 rounded-md shadow-xl text-customGreenOpacity"
      >
        Voir {isShow ? "moins" : "plus"} de Catégories
      </button>
    </div>
  );
};
