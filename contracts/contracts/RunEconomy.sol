// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IRunzModule.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RunEconomy is Ownable {
    IERC20 public runzToken;

    struct Route {
        uint256 distanceKm;
        address creator;
        uint256 stakedAmount;
        bool isFinished;
        mapping(address => bool) hasClaimedReward;
    }

    mapping(uint256 => Route) public routes;
    mapping(address => bool) public authorizedModules; // 모듈 권한 관리
    uint256 public routeCounter;

    uint256 public rewardPerKm = 2;
    uint256 public creatorReward = 2;
    uint256 public stakingRatePerKm = 2;

    event RouteCreated(uint256 indexed routeId, address indexed creator, uint256 distanceKm, uint256 stakedAmount);
    event RewardClaimed(uint256 indexed routeId, address indexed runner, uint256 runnerReward, uint256 creatorReward);
    event RouteFinished(uint256 indexed routeId, address indexed creator);
    event AggregatedDataLogged(uint256 totalDistance, uint256 totalRunners, uint256 timestamp);
    event ModuleAuthorized(address module);
    event ModuleRevoked(address module);

    constructor(address _runzTokenAddress) {
        runzToken = IERC20(_runzTokenAddress);
    }

    // 모듈 권한 부여 및 철회 함수
    function authorizeModule(address module) external onlyOwner {
        authorizedModules[module] = true;
        emit ModuleAuthorized(module);
    }

    function revokeModule(address module) external onlyOwner {
        authorizedModules[module] = false;
        emit ModuleRevoked(module);
    }

    // 모듈이 RunEconomy 기능을 수행할 수 있도록 함
    function executeModule(address module, bytes calldata data) external {
        require(authorizedModules[module], "Module not authorized");
        IRunzModule(module).execute(address(this), data);
    }

    // 1. 루트 생성 함수 (컨트랙트 소유자만 호출 가능)
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

    // 집계된 데이터를 기록하는 함수
    function logAggregatedRunnerData(uint256 _totalDistance, uint256 _totalRunners) external onlyOwner {
        emit AggregatedDataLogged(_totalDistance, _totalRunners, block.timestamp);
    }

    // 2. 보상 청구 함수 (러너가 보상을 청구할 때 사용)
    function completeRoute(uint256 _routeId, address _runner) external onlyOwner {
        Route storage route = routes[_routeId];
        require(route.creator != address(0), "Route does not exist");
        require(!route.isFinished, "Route is already finished");
        require(!route.hasClaimedReward[_runner], "Runner has already claimed reward");

        uint256 runnerReward = route.distanceKm * rewardPerKm;
        uint256 creatorRewardAmount = creatorReward;

        require(runzToken.balanceOf(address(this)) >= runnerReward + creatorRewardAmount, "Contract has insufficient RUNZ");

        runzToken.transfer(_runner, runnerReward);
        runzToken.transfer(route.creator, creatorRewardAmount);

        route.hasClaimedReward[_runner] = true;

        emit RewardClaimed(_routeId, _runner, runnerReward, creatorRewardAmount);
    }

    // 3. 루트 종료 함수 (크리에이터가 스테이킹한 RUNZ를 돌려받고 루트를 종료)
    function finishRoute(uint256 _routeId) external onlyOwner {
        Route storage route = routes[_routeId];
        require(route.creator != address(0), "Route does not exist");
        require(!route.isFinished, "Route is already finished");

        runzToken.transfer(route.creator, route.stakedAmount);

        route.isFinished = true;

        emit RouteFinished(_routeId, route.creator);
    }

    // 4. 보상 및 스테이킹 비율 설정 함수
    function updateRewardParameters(uint256 _rewardPerKm, uint256 _creatorReward, uint256 _stakingRatePerKm) external onlyOwner {
        rewardPerKm = _rewardPerKm;
        creatorReward = _creatorReward;
        stakingRatePerKm = _stakingRatePerKm;
    }

    // 컨트랙트 내 RUNZ 잔액 확인 함수
    function contractBalance() external view returns (uint256) {
        return runzToken.balanceOf(address(this));
    }

    // 관리자가 토큰을 입금할 수 있는 기능
    function depositRUNZ(uint256 amount) external onlyOwner {
        require(runzToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }
}
