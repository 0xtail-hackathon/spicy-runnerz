import React from "react";
import Image from "next/image";
import { jockeyOne } from "@/app/fonts";

interface ControlBoxProps {
  status: "ready" | "running" | "pause" | "end";
  runningTime: string;
}

const ControlBox: React.FC<ControlBoxProps> = ({ status, runningTime }) => {
  let buttonIcon = "/icons/play.svg";
  let buttonText = "START";

  if (status === "running" || status === "pause") {
    buttonIcon = "/icons/pause.svg";
    buttonText = runningTime;
  } else if (status === "end") {
    buttonIcon = "/icons/end.svg";
    buttonText = "END";
  }

  return (
    <div className="fixed bottom-24 flex flex-col items-center bg-white shadow-md rounded-lg w-9/12 md:w-8/12 lg:w-1/2 p-6 pt-16 mt-10 h-52">
      <div className="absolute -top-10">
        <button className="w-20 h-20 bg-primary-1000 rounded-full flex items-center justify-center mb-5">
          <Image src={buttonIcon} alt="Control Icon" width={24} height={24} />
        </button>
      </div>
      <h2
        className={`${jockeyOne.className} text-5xl font-bold text-gray-900 mb-5`}
      >
        {buttonText}
      </h2>
      <div className="w-full flex justify-around">
        <div className="text-center basis-1/3 border-r">
          <p className="text-xs font-medium text-gray-500">Avr Pace</p>
          <p className="text-2xl font-bold text-gray-900">0'00"</p>
        </div>
        <div className="text-center basis-1/3 border-r">
          <p className="text-xs font-medium text-gray-500">Remaining</p>
          <p className="text-2xl font-bold text-gray-900">0 km</p>
        </div>
        <div className="text-center basis-1/3">
          <p className="text-xs font-medium text-gray-500">Distance</p>
          <p className="text-2xl font-bold text-gray-900">0 km</p>
        </div>
      </div>
    </div>
  );
};

export default ControlBox;
