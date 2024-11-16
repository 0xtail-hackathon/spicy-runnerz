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

    const { tokenBalance, transactions } = walletData;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="text-center py-6">
                <h1 className="text-3xl font-extrabold text-gray-800">Your Wallet</h1>
            </header>

            {/* 잔액 표시 */}
            <div className="bg-white rounded-lg shadow-md mx-4 p-6 mb-6">
                <h2 className="text-4xl font-bold text-gray-800 text-center">
                    {balance} $RUNZ
                </h2>
                <p className="text-center text-green-600 text-lg mt-2">+12.44%</p>
            </div>

            {/* 버튼 섹션 */}
            <div className="flex justify-center gap-4 mb-6">
                <button className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-md flex items-center gap-2">
                    <span>➔</span> Send
                </button>
                <button className="bg-gray-200 text-black font-bold py-3 px-8 rounded-full shadow-md flex items-center gap-2">
                    <span>➕</span> Deposit
                </button>
            </div>

            {/* 활동 섹션 */}
            <div className="px-4">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Activity</h3>
                <ul className="space-y-4">
                    {transactions.length ? (
                        transactions.map((tx, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-white rounded-lg shadow-md p-4"
                            >
                                <div>
                                    <p className="font-bold text-gray-800">
                                        {tx.type} {tx.amount} RUNZ
                                    </p>
                                    <p className="text-sm text-gray-600">{tx.date}</p>
                                </div>
                                <a
                                    href={tx.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-sm"
                                >
                                    View
                                </a>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No transactions available</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default WalletDashboard;
