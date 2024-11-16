package models

import (
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"log"
	"math/big"
	"strings"
)

const ArtRunABI = `[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"challengeId","type":"uint256"}],"name":"ChallengeCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"challengeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"distanceRequired","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPoints","type":"uint256"}],"name":"ChallengeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"points","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"PointsConverted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"distance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"RunRecorded","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"challenges","outputs":[{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint256","name":"distanceRequired","type":"uint256"},{"internalType":"uint256","name":"rewardPoints","type":"uint256"},{"internalType":"uint256","name":"rewardTokens","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_challengeId","type":"uint256"}],"name":"completeChallenge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_points","type":"uint256"}],"name":"convertPointsToTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cooldownPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_distanceRequired","type":"uint256"},{"internalType":"uint256","name":"_rewardPoints","type":"uint256"},{"internalType":"uint256","name":"_rewardTokens","type":"uint256"}],"name":"createChallenge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"points","type":"uint256"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDailyConversion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pointConversionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_distance","type":"uint256"},{"internalType":"uint256","name":"_time","type":"uint256"},{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"recordRun","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"runRecords","outputs":[{"internalType":"address","name":"runner","type":"address"},{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint256","name":"distance","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalChallenges","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRuns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRate","type":"uint256"}],"name":"updateConversionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newMax","type":"uint256"}],"name":"updateMaxDailyConversion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"totalPoints","type":"uint256"},{"internalType":"uint256","name":"totalTokens","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_runId","type":"uint256"},{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"verifyRun","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]`
const ContractAddress = "0x707eB6A05049eD6c983C096a7b022aD4d2C3330b"

type ArtRun struct {
	Contract *bind.BoundContract
}

// ArtRun 컨트랙트 인스턴스 생성
func NewArtRun(address common.Address, url string) (*ArtRun, error) {
	client, err := ethclient.Dial(url)
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
		return nil, err
	}

	parsedABI, err := abi.JSON(strings.NewReader(ArtRunABI))
	if err != nil {
		log.Fatalf("Failed to parse ABI: %v", err)
		return nil, err
	}

	contract := bind.NewBoundContract(address, parsedABI, client, client, client)
	return &ArtRun{Contract: contract}, nil
}

// recordRun 함수 호출
func (a *ArtRun) RecordRun(auth *bind.TransactOpts, distance *big.Int, time *big.Int, hash [32]byte) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "recordRun", distance, time, hash)
}

// createChallenge 함수 호출
func (a *ArtRun) CreateChallenge(auth *bind.TransactOpts, distanceRequired *big.Int, rewardPoints *big.Int, rewardTokens *big.Int) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "createChallenge", distanceRequired, rewardPoints, rewardTokens)
}

// completeChallenge 함수 호출
func (a *ArtRun) CompleteChallenge(auth *bind.TransactOpts, challengeId *big.Int) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "completeChallenge", challengeId)
}

// convertPointsToTokens 함수 호출
func (a *ArtRun) ConvertPointsToTokens(auth *bind.TransactOpts, points *big.Int) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "convertPointsToTokens", points)
}

// getUserStats 함수 호출 (조회 전용)
func (a *ArtRun) GetUserStats(callOpts *bind.CallOpts, user common.Address) (*big.Int, *big.Int, error) {
	var points, tokens *big.Int
	err := a.Contract.Call(callOpts, nil, "getUserStats", user)
	if err != nil {
		return nil, nil, err
	}
	err = a.Contract.Call(callOpts, nil, "getUserStats", user)
	return points, tokens, err
}

// verifyRun 함수 호출 (조회 전용)
func (a *ArtRun) VerifyRun(callOpts *bind.CallOpts, runId *big.Int, hash [32]byte) (bool, error) {
	var verified bool
	err := a.Contract.Call(callOpts, nil, "verifyRun", runId, hash)
	return verified, err
}
