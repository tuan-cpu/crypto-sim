"use client";
import { Inter } from "next/font/google";
import "./globals.css";

//INTERNAL IMPORT
import { Footer, Navbar } from "@/components";
import { ConnectWalletContextProvider } from "@/context/ConnectWalletContext";
import { NFTContextProvider } from "@/context/NFTContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectWalletContextProvider>
          <Navbar />
          <NFTContextProvider>{children}</NFTContextProvider>
          <Footer />
        </ConnectWalletContextProvider>
      </body>
    </html>
  );
}
