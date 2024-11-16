"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jockeyOne } from "@/app/fonts";

const JoinedScreen: React.FC = () => {
  const router = useRouter();

  // Placeholder data, to be replaced with actual data from the server
  const accountProfileImageUrl = "icons/account-profile.svg";
  const tokenIconUrl = "/icons/token-color.svg";
  const runnerImageUrl = "/images/runner.svg";
  const copyImageUrl = "icons/copy.svg";
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678";
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleOkayClick = () => {
    router.push("/");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
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
            +20 RUNZ
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
      <div className="text-gray-600 w-full max-w-lg text-center mt-5">
        <p>
          <strong>2 RUNZ</strong> were sent to the user
        </p>
        <p>who created this RUN</p>
      </div>
    </div>
  );
};

export default JoinedScreen;
