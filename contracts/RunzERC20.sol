// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RUNZToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("RUNZ Token", "RUNZ") {
        _mint(msg.sender, initialSupply);
    }

    // 추가 기능: 토큰 발행 함수 (관리자만 호출 가능)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // 추가 기능: 토큰 소각 함수 (사용자가 직접 소각 가능)
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
