import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function CreateRunLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="flex-grow w-full flex items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}
