"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    DynamicContextProvider,
    EthereumWalletConnectors,
} from "../lib/dynamic";
import { SessionProvider } from "./context/SessionContext"; // SessionProvider 추가
import "./globals.css";
import { inter } from "./fonts";

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();

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
                        router.push("/run"); // 로그인 성공 시 /run으로 이동
                    },
                    onLogout: () => {
                        console.log("Logged Out");
                        router.push("/sign-in"); // 로그아웃 시 /sign-in으로 이동
                    },
                },
            }}
        >
            <SessionProvider>
                {children}
            </SessionProvider>
        </DynamicContextProvider>
        </body>
        </html>
    );
}
