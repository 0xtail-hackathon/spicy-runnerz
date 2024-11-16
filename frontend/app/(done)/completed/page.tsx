"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CompletedRunScreen: React.FC = () => {
  const router = useRouter();
  // Placeholder data to be replaced with actual run data from the server
  const runImageUrl = "/images/sample-map.png";
  const accountProfileImageUrl = "icons/account-profile.svg";
  const walletAddress = "Au...Ux";

  const handleAccountClick = async () => {
    // TODO: staking
    router.push("/profile");
  };

  const handleWellDoneClick = async () => {
    router.push("/");
  };

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-start px-5 pt-20">
      <Image
        src={runImageUrl}
        alt="Run Map"
        width={200}
        height={200}
        className="mb-5"
      />
      <div className="flex items-center p-3 border rounded-lg mb-10 w-full max-w-sm">
        <Image
          src={accountProfileImageUrl}
          alt="Wallet Icon"
          width={40}
          height={40}
        />
        <div className="ml-5">
          <p className="text-gray-800 font-semibold">RUNNZ Creator Wallet</p>
          <p className="text-gray-500">{walletAddress}</p>
        </div>
        <button onClick={handleAccountClick} className="ml-auto">
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
              d="M16.5 4.5l-9 9m9 0V4.5h-9"
            />
          </svg>
        </button>
      </div>
      <button
        onClick={handleWellDoneClick}
        className="bg-primary-1000 text-white w-full max-w-lg py-4 rounded-full font-bold"
      >
        Well done
      </button>
    </div>
  );
};

export default CompletedRunScreen;
