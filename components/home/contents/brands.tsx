import Slider from "react-slick";
import { brands } from "@/data";
import Image from "next/image";
import React from "react";

export const Brands: React.FC = () => {
  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 0,
    arrows: false,
    cssEase: "linear",
  };

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-semibold text-center">
        Nos marques de voiture
      </h2>

      <div className="mt-5 bg-customGray py-3">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <Image
              key={index}
              src={brand}
              alt={`brand-${index}`}
              className="h-16 object-contain"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
