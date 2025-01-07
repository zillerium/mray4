import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers"; // added
import { cookieToInitialState } from "wagmi"; // added
import { config } from "@/config"; // added
import Web3ModalProvider from "@/context"; // added

export const metadata: Metadata = {
  title: "Mray NFTs",
  description: "Powered by WalletConnect"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie")); // added
  return (
    <html lang="en">
  <head>
        {/* Add the Google Fonts link here */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
