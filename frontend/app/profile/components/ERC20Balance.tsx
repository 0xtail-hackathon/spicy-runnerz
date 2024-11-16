import { useEffect } from "react";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { ethers, Contract, formatUnits } from "ethers";

interface ERC20BalanceProps {
    onBalanceUpdate: (balance: string) => void; // 잔액 업데이트 콜백
}

const ERC20Balance: React.FC<ERC20BalanceProps> = ({ onBalanceUpdate }) => {
    const userWallets = useUserWallets();

    const getERC20Balance = async (tokenAddress: string, walletAddress: string) => {
        const provider = new ethers.JsonRpcProvider("https://spicy-rpc.chiliz.com/");

        const abi = ["function balanceOf(address) view returns (uint256)"];
        const contract = new Contract(tokenAddress, abi, provider);

        try {
            const response = await contract.balanceOf(walletAddress);
            const balance = BigInt(response);
            return formatUnits(balance, 18); // 18은 토큰 소수점
        } catch (error) {
            console.error("Error fetching ERC20 balance:", error);
            return "0"; // 기본값 반환
        }
    };

    useEffect(() => {
        const fetchBalance = async () => {
            if (!userWallets.length) return;
            const tokenAddress = "0x17a2d13314786cE819590ba31B98AAcc0932EFfB"; // ERC20 토큰 주소
            const walletAddress = userWallets[0].address; // 첫 번째 지갑 사용

            const balance = await getERC20Balance(tokenAddress, walletAddress);
            console.log("Fetched balance:", balance);
            onBalanceUpdate(balance); // 부모 컴포넌트에 잔액 업데이트
        };

        fetchBalance();
    }, [userWallets]);

    return null; // UI를 렌더링하지 않음
};

export default ERC20Balance;
