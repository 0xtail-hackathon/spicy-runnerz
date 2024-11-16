"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jockeyOne } from "@/app/fonts";

const JoinedScreen: React.FC = () => {
  const router = useRouter();

  // Placeholder data, to be replaced with actual data from the server
  const tokenIconUrl = "/icons/token-color.svg";
  const runnerImageUrl = "/images/runner.svg";

  const handleOkayClick = () => {
    router.push("/");
  };

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-start px-5 pt-10">
      <div
        className={`${jockeyOne.className} flex flex-col items-center mb-10`}
      >
        <Image src={runnerImageUrl} alt="Token Icon" width={80} height={80} />
        <div className="text-6xl font-medium text-gray-800 text-center">
          <p>You got </p>
          <p>$RUNZ</p>
          <p>Successfully!</p>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center mt-2">
          <p className="text-2xl font-normal text-gray-700 text-center">
            +2 RUNZ
          </p>
          <Image src={tokenIconUrl} alt="Token Icon" width={20} height={20} />
        </div>
      </div>
      <button
        onClick={handleOkayClick}
        className="bg-primary-1000 text-white w-full max-w-lg py-4 rounded-full text-xl font-bold mb-10"
      >
        Okay
      </button>
    </div>
  );
};

export default JoinedScreen;
