import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function ProfileLayout({
                                          children,
                                      }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <Header lines={["Your Wallet"]} />
            {children}
            <Footer/>
        </div>
    );
}
