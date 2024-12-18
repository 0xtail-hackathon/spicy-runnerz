"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useUserWallets } from "@dynamic-labs/sdk-react-core";

const ShareRunScreen: React.FC = () => {
  // const userWallets = useUserWallets();
  const router = useRouter();
  // Placeholder data to be replaced with actual run data from the server
  const runImageUrl = "/images/map-example.svg";
  const tokenIconUrl = "/icons/token-color.svg";
  const discordIconUrl = "/icons/discord.svg";
  const twitterIconUrl = "/icons/twitter.svg";
  const telegramIconUrl = "/icons/telegram.svg";

  const handleWellDoneClick = async () => {
    // TODO:
    // const createRouteResponse = await fetch(`${baseUrl}/create-route`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     routeId: "2",
    //     runnerAddress: userWallets[0].address,
    //   }),
    // });
    //
    // if (!createRouteResponse.ok) {
    //   throw new Error("Failed to create route");
    // }
    //
    // const createRouteData = await createRouteResponse.json();
    // console.log("Route created:", createRouteData);

    router.push("/joined");
  };

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-start px-5 pt-10">
      <Image
        src={runImageUrl}
        alt="Run Map"
        width={300}
        height={300}
        className="mb-10"
      />
      <button
        onClick={handleWellDoneClick}
        className="bg-primary-1000 w-full max-w-lg py-3 rounded-3xl font-bold mb-10"
      >
        <p className="text-white text-xl">Well Done!</p>
        <div className="flex flex-row justify-center gap-1">
          <span className="text-black text-sm">+20 RUNZ</span>
          <Image src={tokenIconUrl} alt="Token Icon" width={14} height={14} />
        </div>
      </button>
      <p className="text-gray-600 font-semibold mb-8">
        If you want more RUNZ, Share more
      </p>
      <div className="flex justify-center gap-8 mb-10">
        <button className="w-12 h-12">
          <Image
            src={discordIconUrl}
            alt="Discord Icon"
            width={48}
            height={48}
          />
        </button>
        <button className="w-12 h-12">
          <Image
            src={twitterIconUrl}
            alt="Twitter Icon"
            width={48}
            height={48}
          />
        </button>
        <button className="w-12 h-12">
          <Image
            src={telegramIconUrl}
            alt="Telegram Icon"
            width={48}
            height={48}
          />
        </button>
      </div>
    </div>
  );
};

export default ShareRunScreen;
