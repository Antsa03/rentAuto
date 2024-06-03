import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/roboto";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "@/components/Provider.component";
import { FooterApp } from "@/components/layouts/footer";
import { Navigation } from "@/components/layouts/navigation";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestion de location de voiture d'une agence",
  description: "Location de voiture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <header>
            <Navigation />
          </header>
          <main className="mt-20 min-h-[300px]">{children}</main>
          <footer className="bg-customBlue px-10 py-10 text-slate-200">
            <FooterApp />
          </footer>
        </Provider>
      </body>
    </html>
  );
}
