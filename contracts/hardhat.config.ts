import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.0",
    etherscan: {
        apiKey: {
            chiliz_spicy: "chiliz_spicy", // apiKey is not required, just set a placeholder
        },
        customChains: [
            {
                network: "chiliz_spicy",
                chainId: 88882,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan",
                    browserURL: "https://testnet.chiliscan.com"
                }
            }
        ]
    },
    networks: {
        spicyChiliz: {
            url: process.env.RPC_URL,
            accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY}`],
        },
    },
};

export default config;
