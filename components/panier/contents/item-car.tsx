import { useState } from "react";
import { car3 } from "../../../assets";
import Image from "next/image";

export const ItemCar = () => {
  const [dayNumber, setDayNumber] = useState<number>(1);

  const minus = () => {
    if (dayNumber > 1) setDayNumber((currentValue) => currentValue - 1);
  };

  const plus = () => {
    setDayNumber((currentValue) => currentValue + 1);
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="p-10 flex">
          <div className="">
            <Image src={car3} alt="car" />
          </div>

          <div>
            <h1>4*4 Mutsubishi</h1>
            <p>Prix : 250.000.000 Ar</p>
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>

            <p>
              Setting the bar as one of the loudest speakers in its class, the
              Kilburn is a compact, stout-hearted hero with a well-balanced
              audio which boasts a clear midrange and extended highs for a
              sound.
            </p>

            <div>
              <div>
                <button onClick={minus}>-</button>
                <span>{dayNumber}</span>
                <button onClick={plus}>+</button>
              </div>

              <label htmlFor="my-drawer-4" className="">
                Ajouter au panier{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>

          <a href="mailto:erica@yopmail.com">I love star wars</a>
        </ul>
      </div>
    </div>
  );
};
