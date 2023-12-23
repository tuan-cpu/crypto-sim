"use client";
import { Inter } from "next/font/google";
import "../globals.css";

//INTERNAL IMPORT
import { Footer, Navbar } from "@/components";
import { ConnectWalletContextProvider } from "@/context/ConnectWalletContext";
import { NFTContextProvider } from "@/context/NFTContext";
import { ControlContextProvider } from "@/context/ControlContext";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConnectWalletContextProvider>
            <NFTContextProvider>
              <ControlContextProvider>
                <Navbar />
                {children}
              </ControlContextProvider>
            </NFTContextProvider>
            <Footer />
          </ConnectWalletContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
