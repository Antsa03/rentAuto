import Link from "next/link";
import { CategoryType } from "@/types/category.type";

type CategoryProps = {
  category: CategoryType;
};

export const Category = (props: CategoryProps) => {
  const { category } = props;
  const { description, image, name, lien } = category;

  return (
    <article className="shadow-md flex flex-col h-[450px]">
      <div className="py-3 px-3p laptop:px-14 h-3/5">
        <img
          src={`/cars/${image}`}
          alt={name}
          className="object-contain h-full"
        />
      </div>

      <div className="bg-gray p-3 flex-1 flex flex-col">
        <div className="overflow-y-hidden flex-1">
          <h3 className="font-semibold text-green">{name}</h3>
          <p className=" text-ellipsis">{description}</p>
        </div>

        <Link
          href={lien}
          className="bg-customGreen w-min place-self-center px-10 py-2 text-white rounded-lg my-4"
        >
          Afficher
        </Link>
      </div>
    </article>
  );
};
