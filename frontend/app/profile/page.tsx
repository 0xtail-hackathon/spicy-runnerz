"use client";

import React, { useState } from "react";
import WalletDashboard from "./components/WalletDashboard";
import ERC20Balance from "./components/ERC20Balance";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const WalletPage: React.FC = () => {
    const { user } = useDynamicContext();
    const [balance, setBalance] = useState<string>("0"); // balance 상태 추가

    const handleBalanceUpdate = (newBalance: string) => {
        setBalance(newBalance); // ERC20Balance로부터 잔액 업데이트
    };

    return (
        <div>
            {/* ERC20Balance 컴포넌트 */}
            <ERC20Balance onBalanceUpdate={handleBalanceUpdate} />

            {/* WalletDashboard에 balance 전달 */}
            <WalletDashboard balance={balance} />
        </div>
    );
};

export default WalletPage;
