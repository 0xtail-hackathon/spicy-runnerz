import type { Metadata } from "next";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";
import "./globals.css";
import { inter } from "./fonts";

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
      <body className={`${inter.className} antialiased text-gray-900`}>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.DYNAMIC_KEY || "",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
