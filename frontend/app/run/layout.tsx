import React from "react";
import Footer from "@/app/components/Footer";
import RunHeader from "./components/RunHeader";

const dummyData = {
  route: {
    name: "ETHGlobal Bangkok RUNN",
  },
};

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routeName = dummyData.route.name;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50 h-full">
      <RunHeader routeName={routeName} />
      {children}
      <Footer />
    </div>
  );
}
