import React from "react";
import Footer from "@/app/components/Footer";

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      {children}
      <Footer />
    </div>
  );
}
