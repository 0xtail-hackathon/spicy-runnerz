import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

// 초기 공급량과 기본 Gwei 값 설정
const INITIAL_SUPPLY: bigint = BigInt(hre.ethers.parseUnits("1000000", 18).toString()); // 100만 RUNZ

const GAS: bigint = BigInt(hre.ethers.parseUnits("2600", "gwei").toString());

// Ignition 모듈 생성
const ArtRunModule = buildModule("ArtRunModule", (m) => {
    // RUNZToken 컨트랙트 배포
    const runzToken = m.contract("RUNZToken", [INITIAL_SUPPLY]);

    // ArtRun 컨트랙트 배포 (필요한 경우 RUNZToken 주소를 생성자에 전달할 수 있음)
    const artRun = m.contract("ArtRun", [], );

    return { runzToken, artRun };
});

export default ArtRunModule;
