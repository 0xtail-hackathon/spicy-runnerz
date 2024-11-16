"use client";

import React from "react";
// import React, { useState } from "react";
import Footer from "@/app/components/Footer";

export default function ProfileLayout({
                                          children,
                                      }: Readonly<{ children: React.ReactNode }>) {
    // const [tokenBalance] = useState<number>(0);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            {/*<header className="w-full text-center p-4 bg-white shadow-md">*/}
            {/*    <h1 className="text-2xl font-bold">ETHGlobal Bangkok RUN</h1>*/}
            {/*    <p className="text-gray-600">RUNZ Balance: {tokenBalance} RUNZ</p>*/}
            {/*</header>*/}
            {children}
            <Footer />
        </div>
    );
}
