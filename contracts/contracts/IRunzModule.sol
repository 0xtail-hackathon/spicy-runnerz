// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRunzModule {
    function execute(address target, bytes calldata data) external;
}
