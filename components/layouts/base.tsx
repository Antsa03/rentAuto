import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { FooterApp } from "./footer";

export const BaseLayout = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>

      <div className="pt-20">
        <Outlet />
      </div>

      <FooterApp />
    </div>
  );
};
