"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StakeRunzScreen: React.FC = () => {
  const router = useRouter();
  const tokenImageUrl = "/icons/token-color.svg";

  // TODO: get from server
  const stakeAmount = "10.002";
  const availableRunz = 4329.34;
  const gasFees = 0.003;

  const handleWellDoneClick = async () => {
    // TODO: staking
    router.push("/completed");
  };

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-start px-5 pt-20">
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Stake RUNZ</h2>
        <p className="text-4xl font-bold text-gray-900 mb-1">{stakeAmount}</p>
        <p className="text-sm text-gray-500 mb-5">
          You have: {availableRunz} RUNZ
        </p>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Assets</h3>
        <div className="flex items-center p-3 border rounded-lg mb-4">
          <Image src={tokenImageUrl} alt="Token" width={40} height={40} />
          <p className="text-gray-800 font-semibold ml-5">RUNZ</p>
          <span className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-1">
          Expected Gas Fees: {gasFees} chiliz
        </p>
        <p className="text-sm text-primary-1000 mb-10">
          *RUNNERZ pays the gas fee for you!
        </p>
        <button
          onClick={handleWellDoneClick}
          className="bg-primary-1000 text-white w-full py-4 rounded-full font-bold mb-4"
        >
          Well done
        </button>
      </div>
    </div>
  );
};

export default StakeRunzScreen;
