// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IRunzModule.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RunEconomy2 is Ownable {
    IERC20 public runzToken;

    struct Route {
        uint256 distanceKm;
        address creator;
        uint256 stakedAmount;
        bool isFinished;
    }

    mapping(uint256 => Route) public routes;
    mapping(address => mapping(uint256 => uint256)) public pendingRewards; // [사용자 주소][루트 ID] 보상 금액
    mapping(address => bool) public authorizedModules; // 모듈 권한 관리
    uint256 public routeCounter;

    uint256 public rewardPerKm = 2;
    uint256 public creatorReward = 2;
    uint256 public stakingRatePerKm = 2;

    event RouteCreated(uint256 indexed routeId, address indexed creator, uint256 distanceKm, uint256 stakedAmount);
    event RewardDistributed(address indexed user, uint256 indexed routeId, uint256 reward);
    event RewardClaimed(address indexed user, uint256 indexed routeId, uint256 reward);
    event RouteFinished(uint256 indexed routeId, address indexed creator);
    event AggregatedDataLogged(uint256 totalDistance, uint256 totalRunners, uint256 timestamp);
    event ModuleAuthorized(address module);
    event ModuleRevoked(address module);

    constructor(address _runzTokenAddress) {
        runzToken = IERC20(_runzTokenAddress);
    }

    // 1. 모듈 권한 부여 및 철회 함수
    function authorizeModule(address module) external onlyOwner {
        authorizedModules[module] = true;
        emit ModuleAuthorized(module);
    }

    function revokeModule(address module) external onlyOwner {
        authorizedModules[module] = false;
        emit ModuleRevoked(module);
    }

    // 2. 모듈이 RunEconomy 기능을 수행할 수 있도록 함
    function executeModule(address module, bytes calldata data) external {
        require(authorizedModules[module], "Module not authorized");
        IRunzModule(module).execute(address(this), data);
    }

    // 3. 루트 생성 함수
    function createRoute(uint256 _distanceKm, address _creator) external onlyOwner {
        uint256 stakingAmount = _distanceKm * stakingRatePerKm;
        require(runzToken.balanceOf(_creator) >= stakingAmount, "Insufficient RUNZ for staking");

        runzToken.transferFrom(_creator, address(this), stakingAmount);

        routeCounter++;
        routes[routeCounter].distanceKm = _distanceKm;
        routes[routeCounter].creator = _creator;
        routes[routeCounter].stakedAmount = stakingAmount;
        routes[routeCounter].isFinished = false;

        emit RouteCreated(routeCounter, _creator, _distanceKm, stakingAmount);
    }

    function logAggregatedRunnerData(uint256 _totalDistance, uint256 _totalRunners) external onlyOwner {
        emit AggregatedDataLogged(_totalDistance, _totalRunners, block.timestamp);
    }

    // 4. 루트 완료 시 보상 기록 (관리자만 호출 가능)
    function completeRoute(uint256 _routeId, address _runner) external onlyOwner {
        Route storage route = routes[_routeId];
        require(route.creator != address(0), "Route does not exist");
        require(!route.isFinished, "Route already finished");

        uint256 runnerReward = route.distanceKm * rewardPerKm;
        uint256 creatorRewardAmount = creatorReward;

        // 보상 기록 (실제 전송은 사용자가 청구 시 수행)
        pendingRewards[_runner][_routeId] += runnerReward;
        pendingRewards[route.creator][_routeId] += creatorRewardAmount;

        emit RewardDistributed(_runner, _routeId, runnerReward);
        emit RewardDistributed(route.creator, _routeId, creatorRewardAmount);
    }

    // 5. 루트 종료 시 스테이킹 반환 및 보상 기록 (관리자만 호출 가능)
    function finishRoute(uint256 _routeId) external onlyOwner {
        Route storage route = routes[_routeId];
        require(route.creator != address(0), "Route does not exist");
        require(!route.isFinished, "Route already finished");

        // 스테이킹 반환 및 보상 기록
        pendingRewards[route.creator][_routeId] += route.stakedAmount;
        route.isFinished = true;

        emit RouteFinished(_routeId, route.creator);
    }

    // 6. 사용자 보상 청구 함수
    function claimReward(uint256 _routeId) external {
        uint256 reward = pendingRewards[msg.sender][_routeId];
        require(reward > 0, "No reward available for claim");

        // 보상 지급 및 기록 초기화
        pendingRewards[msg.sender][_routeId] = 0;
        runzToken.transfer(msg.sender, reward);

        emit RewardClaimed(msg.sender, _routeId, reward);
    }

    // 7. 특정 루트에 대해 청구 가능한 보상 조회 함수
    function getPendingReward(uint256 _routeId) external view returns (uint256) {
        return pendingRewards[msg.sender][_routeId];
    }

    // 8. 컨트랙트 잔액 확인 함수
    function contractBalance() external view returns (uint256) {
        return runzToken.balanceOf(address(this));
    }
}
