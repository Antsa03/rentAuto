"use client";
import { Brands, Categories, Header, Location } from "./contents";
import "@/app/globals.css";

export const Home = () => {
  return (
    <>
      <Header />
      <Categories />
      <Brands />
      <Location />
    </>
  );
};
