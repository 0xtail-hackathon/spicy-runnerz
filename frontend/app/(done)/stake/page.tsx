"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { Contract, ethers, formatUnits } from "ethers";
import { baseUrl } from "@/constants";

const StakeRunzScreen: React.FC = () => {
  const [availableRunz, setAvailableRunz] = useState<string>("0"); // 초기값 설정

  const userWallets = useUserWallets();

  // const getERC20Balance = async (
  //   tokenAddress: string,
  //   walletAddress: string,
  // ) => {
  //   const provider = new ethers.JsonRpcProvider(
  //     "https://spicy-rpc.chiliz.com/",
  //   );
  //
  //   const abi = ["function balanceOf(address) view returns (uint256)"];
  //   const contract = new Contract(tokenAddress, abi, provider);
  //
  //   try {
  //     const response = await contract.balanceOf(walletAddress);
  //     const balance = BigInt(response);
  //     return formatUnits(balance, 18); // 18은 토큰 소수점
  //   } catch (error) {
  //     console.error("Error fetching ERC20 balance:", error);
  //     return "0"; // 기본값 반환
  //   }
  // };
  //
  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     if (!userWallets.length) return;
  //     const tokenAddress = "0x17a2d13314786cE819590ba31B98AAcc0932EFfB"; // ERC20 토큰 주소
  //     const walletAddress = userWallets[0].address; // 첫 번째 지갑 사용
  //
  //     const balance = await getERC20Balance(tokenAddress, walletAddress);
  //     console.log("Fetched balance:", balance);
  //     setAvailableRunz(balance); // 상태 업데이트
  //   };
  //
  //   fetchBalance();
  // }, [userWallets]); // userWallets 변경 시마다 실행

  const router = useRouter();
  const tokenImageUrl = "/icons/token-color.svg";

  const stakeAmount = "10.002";
  const gasFees = 0.003;
  const distance = "5";

  const handleStakeClick = async () => {
    if (!userWallets.length) return;

    try {
      // // Step 1: Approve API 호출
      // const approveResponse = await fetch(`${baseUrl}/approve`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: "owen_creator",
      //     spender: "0x8e3B8132B1138E906773D03bB4A898f7861a4845",
      //     amount: stakeAmount, // 100 RUNZ를 18 소수점으로 표현
      //   }),
      // });
      //
      // if (!approveResponse.ok) {
      //   throw new Error("Failed to approve token transfer");
      // }

      console.log("Approve successful");

      // Step 2: Create Route API 호출
      const walletAddress = userWallets[0].address;
      const createRouteResponse = await fetch(`${baseUrl}/create-route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance: distance,
          creatorAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        }),
      });

      if (!createRouteResponse.ok) {
        throw new Error("Failed to create route");
      }

      const createRouteData = await createRouteResponse.json();
      console.log("Route created:", createRouteData);

      // 생성 성공 후 다른 페이지로 이동
      router.push("/created");
    } catch (error) {
      console.error("Error during staking:", error);
    }
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
          onClick={handleStakeClick}
          className="bg-primary-1000 text-white w-full py-4 rounded-full font-bold mb-4 text-xl"
        >
          Stake
        </button>
      </div>
    </div>
  );
};

export default StakeRunzScreen;
