import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { GameProvider } from "@/utilitiy/providers/GameProvider";
const inter = Inter({ subsets: ["latin"] });
import { SkeletonTheme } from "react-loading-skeleton";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <GameProvider>{children}</GameProvider>
        </SkeletonTheme>
      </body>
    </html>
  );
}
