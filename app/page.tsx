"use client";
import { Home } from "@/components/home";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const { data: session }: any = useSession();

  useEffect(() => {
    if (session && session.userRole === "Administrateur")
      router.push("/admin/dashboard");
  }, [session]);
  return <Home />;
}
