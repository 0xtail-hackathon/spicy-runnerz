"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CompletedRunScreen: React.FC = () => {
  const router = useRouter();
  // Placeholder data to be replaced with actual run data from the server
  const runImageUrl = "/images/map-example.svg";
  const accountProfileImageUrl = "icons/account-profile.svg";
  const copyImageUrl = "icons/copy.svg";
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleWellDoneClick = async () => {
    router.push("/");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
  };

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-start px-5">
      <Image
        src={runImageUrl}
        alt="Run Map"
        width={320}
        height={320}
        className="mb-5"
      />
      <div className="flex w-80 items-center p-3 border bg-gray-50 rounded-lg mb-10 max-w-sm">
        <Image
          src={accountProfileImageUrl}
          alt="Wallet Icon"
          width={40}
          height={40}
        />
        <div className="ml-5">
          <p className="text-gray-800 font-semibold">RUNNZ Creator Wallet</p>
          <p className="text-gray-500 flex items-center">
            {formatWalletAddress(walletAddress)}
            <button onClick={handleCopyAddress} className="ml-2">
              <Image
                src={copyImageUrl}
                alt="Copy Icon"
                width={20}
                height={20}
              />
            </button>
          </p>
        </div>
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
