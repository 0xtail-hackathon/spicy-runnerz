import React from "react";
import Image from "next/image";

interface RunHeaderProps {
  routeName: string;
}

const RunHeader: React.FC<RunHeaderProps> = ({ routeName }) => {
  return (
    <header className="w-full flex items-center justify-start px-5 py-4 h-header">
      <Image
        src="/icons/routing.svg"
        alt="Route Icon"
        width={40}
        height={40}
        className="mr-3"
      />
      <div>
        <p className="text-sm text-gray-500">My route</p>
        <h1 className="text-xl font-bold text-gray-900">{routeName}</h1>
        <p className="text-sm text-gray-500 flex items-center">
          <Image
            src="/icons/clock.svg"
            alt="Clock Icon"
            width={14}
            height={14}
            className="mr-1"
          />
          Today, 6:00 PM
        </p>
      </div>
    </header>
  );
};

export default RunHeader;
