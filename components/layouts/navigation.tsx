"use client";
import Link from "next/link";
import { logo } from "@/assets";
import { path } from "@/constants/path";
import { Nav } from "./components/nav-item";
import Image from "next/image";
import LoginModal from "../modal/LoginModal.component";
import { signOut, useSession } from "next-auth/react";
import { Dropdown, MenuProps } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import ClientProfileModal from "../profile/ClientProfileModal.component";
import AdminProfileModal from "../profile/AdminProfileModal.component";
import UpdatePasswordModal from "../modal/UpdatePasswordModal.component";

export const Navigation = () => {
  const { data: session }: any = useSession();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label:
        session?.userRole === "Administrateur" ? (
          <AdminProfileModal />
        ) : (
          <ClientProfileModal />
        ),
    },
    {
      key: "2",
      label: <UpdatePasswordModal />,
    },
    {
      key: "3",
      label: (
        <button
          className="text-red-500 flex flex-row items-center gap-2"
          onClick={() => signOut()}
        >
          <Icon icon="ic:baseline-logout" className="text-xl" />
          <span>Se déconnecter</span>
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between px-10 py-2 bg-white fixed z-30 left-0 right-0 top-0 bottom-0 h-fit">
        {/* Navigation côté client */}
        <div className="flex gap-x-5">
          <Link href={path.home}>
            <Image src={logo} alt="logo" className="" />
          </Link>
          {session?.userRole === "Administrateur" ? (
            <nav className="flex gap-x-3 laptop:gap-x-8">
              <Nav
                text="Tableau de bord"
                icon="fluent-mdl2:b-i-dashboard"
                to={path.dashboard}
              />
              <Nav text="Administrateur" icon="ri:admin-fill" to={path.admin} />
              <Nav text="Client" icon="ic:baseline-person" to={path.client} />
              <Nav text="Véhicule" icon="fa-solid:car" to={path.vehicule} />
              <Nav
                text="Location"
                icon="carbon:global-loan-and-trial"
                to={path.adminLocation}
              />
            </nav>
          ) : (
            <nav className="flex gap-x-3 laptop:gap-x-8">
              <Nav
                text="Accueil"
                icon="material-symbols:home-outline"
                to={path.home}
              />
              <Nav
                text="Véhicule"
                icon="fa-solid:car"
                to={path.clientVehicule}
              />
              {session && (
                <Nav
                  text="Historique"
                  icon="ic:baseline-history"
                  to={path.historique}
                />
              )}
            </nav>
          )}
        </div>

        {!session ? (
          <LoginModal />
        ) : (
          <div className="flex flex-row items-center justify-end gap-2">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-x-3"
            >
              <img
                src={`/img/photo-profil/${session.user?.image}`}
                alt="profil"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span>{session.user?.email}</span>
            </div>
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <span className="text-[50px]">
                <Icon icon="iconamoon:arrow-down-2-fill" />
              </span>
            </Dropdown>
          </div>
        )}
      </div>
    </>
  );
};
