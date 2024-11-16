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
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-bounce">
        <Image src={logo} alt="Logo" width={width} height={height} />
      </div>
    </div>
  );
};

export default Loading;
