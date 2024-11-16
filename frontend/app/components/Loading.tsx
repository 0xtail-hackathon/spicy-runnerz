import React from "react";
import Image from "next/image";
import logo from "@/public/icons/token-filled.svg"; // Update this path to where your logo is stored

const Loading = ({
  width = 50,
  height = 50,
}: {
  width: number;
  height: number;
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-bounce">
        <Image src={logo} alt="Logo" width={width} height={height} />
      </div>
    </div>
  );
};

export default Loading;
