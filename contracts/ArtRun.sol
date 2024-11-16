// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArtRun {

    struct RunRecord {
        address runner;
        bytes32 hash;
        uint256 distance;
        uint256 time;
    }

    struct Challenge {
        bool active;
        uint256 distanceRequired;
        uint256 rewardPoints;
        uint256 rewardTokens;
    }

    struct User {
        uint256 totalPoints;
        uint256 totalTokens;
        mapping(uint256 => bool) completedChallenges;
    }

    uint256 public pointConversionRate = 1000;
    uint256 public cooldownPeriod = 7 days;
    uint256 public maxDailyConversion = 50000;

    mapping(address => User) public users;
    mapping(uint256 => RunRecord) public runRecords;
    mapping(uint256 => Challenge) public challenges;

    uint256 public totalRuns = 0;
    uint256 public totalChallenges = 0;

    event RunRecorded(address indexed user, bytes32 indexed hash, uint256 distance, uint256 time);
    event ChallengeCreated(uint256 indexed challengeId, uint256 distanceRequired, uint256 rewardPoints);
    event ChallengeCompleted(address indexed user, uint256 indexed challengeId);
    event PointsConverted(address indexed user, uint256 points, uint256 tokens);

    function recordRun(uint256 _distance, uint256 _time, bytes32 _hash) public {
        totalRuns++;
        runRecords[totalRuns] = RunRecord(msg.sender, _hash, _distance, _time);
        uint256 pointsEarned = _distance * 100;
        users[msg.sender].totalPoints += pointsEarned;
        emit RunRecorded(msg.sender, _hash, _distance, _time);
    }

    function verifyRun(uint256 _runId, bytes32 _hash) public view returns (bool) {
        return runRecords[_runId].hash == _hash;
    }

    function createChallenge(uint256 _distanceRequired, uint256 _rewardPoints, uint256 _rewardTokens) public {
        totalChallenges++;
        challenges[totalChallenges] = Challenge(true, _distanceRequired, _rewardPoints, _rewardTokens);
        emit ChallengeCreated(totalChallenges, _distanceRequired, _rewardPoints);
    }

    function completeChallenge(uint256 _challengeId) public {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.active, "Challenge not active");
        require(users[msg.sender].completedChallenges[_challengeId] == false, "Challenge already completed");

        users[msg.sender].totalPoints += challenge.rewardPoints;
        users[msg.sender].totalTokens += challenge.rewardTokens;
        users[msg.sender].completedChallenges[_challengeId] = true;

        emit ChallengeCompleted(msg.sender, _challengeId);
    }

    function convertPointsToTokens(uint256 _points) public {
        User storage user = users[msg.sender];
        require(_points >= pointConversionRate, "Insufficient points to convert");
        require(user.totalPoints >= _points, "Not enough points");

        uint256 tokensToConvert = _points / pointConversionRate;
        require(tokensToConvert <= maxDailyConversion, "Daily conversion limit exceeded");

        user.totalPoints -= _points;
        user.totalTokens += tokensToConvert;

        emit PointsConverted(msg.sender, _points, tokensToConvert);
    }

    function getUserStats(address _user) public view returns (uint256 points, uint256 tokens) {
        return (users[_user].totalPoints, users[_user].totalTokens);
    }

    function updateConversionRate(uint256 _newRate) public {
        pointConversionRate = _newRate;
    }

    function updateMaxDailyConversion(uint256 _newMax) public {
        maxDailyConversion = _newMax;
    }
}
