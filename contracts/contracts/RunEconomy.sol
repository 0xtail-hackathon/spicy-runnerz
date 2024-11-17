// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RunEconomy is Ownable {
    IERC20 public runzToken;

    struct Route {
        uint256 distanceKm;           // 루트 거리 (km 단위)
        address creator;              // 루트 생성자
        uint256 stakedAmount;         // 루트 생성자가 스테이킹한 RUNZ 양
        bool isFinished;              // 루트가 완전히 종료되었는지 여부
        mapping(address => bool) hasClaimedReward;  // 각 Runner의 보상 수령 여부
    }

    mapping(uint256 => Route) public routes;
    uint256 public routeCounter; // 루트 ID 카운터

    uint256 public rewardPerKm = 2;       // 러너에게 지급되는 RUNZ 보상 (km당 2개)
    uint256 public creatorReward = 2;     // 크리에이터가 받는 고정 보상
    uint256 public stakingRatePerKm = 2;  // 루트 생성 시 1km당 필요한 스테이킹 RUNZ 개수

    // 이벤트 정의
    event RouteCreated(uint256 indexed routeId, address indexed creator, uint256 distanceKm, uint256 stakedAmount);
    event RewardClaimed(uint256 indexed routeId, address indexed runner, uint256 runnerReward, uint256 creatorReward);
    event RouteFinished(uint256 indexed routeId, address indexed creator);
    event AggregatedDataLogged(uint256 totalDistance, uint256 totalRunners, uint256 timestamp);


    constructor(address _runzTokenAddress) {
        runzToken = IERC20(_runzTokenAddress);
    }

    // 1. 루트 생성 함수 (컨트랙트 소유자만 호출 가능)
    function createRoute(uint256 _distanceKm, address _creator) external onlyOwner {
        uint256 stakingAmount = _distanceKm * stakingRatePerKm;
        require(runzToken.balanceOf(_creator) >= stakingAmount, "Insufficient RUNZ for staking");

        // 스테이킹을 위해 토큰을 컨트랙트로 전송
        runzToken.transferFrom(_creator, address(this), stakingAmount);

        // 새로운 루트 생성 및 저장
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

        // 보상 지급 가능 여부 확인
        require(runzToken.balanceOf(address(this)) >= runnerReward + creatorRewardAmount, "Contract has insufficient RUNZ");

        // 러너와 크리에이터에게 보상 지급
        runzToken.transfer(_runner, runnerReward);
        runzToken.transfer(route.creator, creatorRewardAmount);

        // 보상을 받은 러너 기록
        route.hasClaimedReward[_runner] = true;

        emit RewardClaimed(_routeId, _runner, runnerReward, creatorRewardAmount);
    }

    // 3. 루트 종료 함수 (크리에이터가 스테이킹한 RUNZ를 돌려받고 루트를 종료)
    function finishRoute(uint256 _routeId) external onlyOwner {
        Route storage route = routes[_routeId];
        require(route.creator != address(0), "Route does not exist");
        require(!route.isFinished, "Route is already finished");

        // 스테이킹한 토큰을 크리에이터에게 환불
        runzToken.transfer(route.creator, route.stakedAmount);

        // 경로 종료 상태 설정
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
