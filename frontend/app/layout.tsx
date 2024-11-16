"use client";

import { useRouter } from "next/navigation";
import {
    DynamicContextProvider,
    EthereumWalletConnectors,
} from "../lib/dynamic";
import "./globals.css";
import { inter } from "./fonts";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();

    console.log("Environment Key:", process.env.NEXT_PUBLIC_DYNAMIC_KEY); // 디버깅

    return (
        <html lang="en">
        <body className={`${inter.className} antialiased text-gray-900`}>
        <DynamicContextProvider
            settings={{
                environmentId: process.env.NEXT_PUBLIC_DYNAMIC_KEY || "",
                walletConnectors: [EthereumWalletConnectors],
                events: {
                    onAuthFlowClose: () => {
                        console.log("Auth Flow Closed");
                    },
                    onAuthFlowOpen: () => {
                        console.log("Auth Flow Opened");
                    },
                    onAuthSuccess: () => {
                        console.log("Authentication Successful");
                        router.push("/");
                    },
                    onLogout: () => {
                        console.log("Logged Out");
                    },
                },
            }}
        >
            {children}
        </DynamicContextProvider>
        </body>
        </html>
    );
}
