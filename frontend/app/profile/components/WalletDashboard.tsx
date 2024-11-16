"use client";

import React, { useEffect, useState } from "react";
import { useTokenBalances } from "@dynamic-labs/sdk-react-core";
import { useSession } from "@/app/context/SessionContext";

interface Transaction {
    type: string;
    amount: string;
    date: string;
    link: string;
}

interface WalletData {
    tokenBalance: number;
    transactions: Transaction[];
}

interface WalletDashboardProps {
    balance: string; // 외부에서 전달받을 balance
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ balance }) => {
    const isLoggedIn = useSession(); // 세션을 통해 로그인 상태 확인
    const { tokenBalances } = useTokenBalances(); // ERC-20 토큰 잔액 가져오기
    // const [walletData, setWalletData] = useState<WalletData>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [walletData, setWalletData] = useState<WalletData>({
        tokenBalance: 0,
        transactions: [],
    });

    useEffect(() => {
        if (!isLoggedIn) {
            console.log("User not logged in");
            return;
        }

        if (tokenBalances && tokenBalances.length > 0) {
            // 특정 토큰의 잔액 가져오기 (예: RUNZ 토큰)
            const runzToken = tokenBalances.find((token) => token.symbol === "RUNZ");

            setWalletData({
                tokenBalance: runzToken?.balance || 0,
                transactions: [], // 예제에서는 거래 내역 없음
            });
        }
    }, [isLoggedIn, tokenBalances]);

    // const { tokenBalance, transactions } = walletData;

    return (
        <div className="w-full flex flex-col items-center gap-3">
            {/* Wallet Balance */}
            <div
                className="${jockeyOne.className} align-middle bg-white rounded-lg shadow-lg p-8 text-center mb-4 mt-4">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{balance} $RUNZ</h2>
                <p className="text-green-600 text-lg">+12.44%</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mb-2">
                <img src="/send-button.png" alt="Deposit" className="h-10 cursor-pointer"/>
            </div>

            {/* Activity Section */}
            <div className="w-full max-w-md">
                <img src="/activitiy.png" alt="Activity Section" className="w-full"/>
            </div>
        </div>
    );
};

export default WalletDashboard;
