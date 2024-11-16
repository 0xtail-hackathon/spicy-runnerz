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

const RunzEcoABI = `[{"inputs":[{"internalType":"address","name":"_runzTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalDistance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalRunners","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"AggregatedDataLogged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"module","type":"address"}],"name":"ModuleAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"module","type":"address"}],"name":"ModuleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"distanceKm","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stakedAmount","type":"uint256"}],"name":"RouteCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"}],"name":"RouteFinished","type":"event"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"authorizeModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorizedModules","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_routeId","type":"uint256"}],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_routeId","type":"uint256"},{"internalType":"address","name":"_runner","type":"address"}],"name":"completeRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_distanceKm","type":"uint256"},{"internalType":"address","name":"_creator","type":"address"}],"name":"createRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creatorReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"executeModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_routeId","type":"uint256"}],"name":"finishRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_routeId","type":"uint256"}],"name":"getPendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalDistance","type":"uint256"},{"internalType":"uint256","name":"_totalRunners","type":"uint256"}],"name":"logAggregatedRunnerData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"revokeModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerKm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"routeCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"routes","outputs":[{"internalType":"uint256","name":"distanceKm","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"stakedAmount","type":"uint256"},{"internalType":"bool","name":"isFinished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"runzToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingRatePerKm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`
const RunzEcoContractAddress = "0x8e3B8132B1138E906773D03bB4A898f7861a4845"

type RunzEco struct {
	Contract *bind.BoundContract
}

func NewRunzEco(address common.Address, url string) (*RunzEco, error) {
	client, err := ethclient.Dial(url)
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
		return nil, err
	}

	parsedABI, err := abi.JSON(strings.NewReader(RunzEcoABI))
	if err != nil {
		log.Fatalf("Failed to parse ABI: %v", err)
		return nil, err
	}

	contract := bind.NewBoundContract(address, parsedABI, client, client, client)
	return &RunzEco{Contract: contract}, nil
}

// createRoute 함수
func (a *RunzEco) CreateRoute(auth *bind.TransactOpts, distance *big.Int, creatorAddress common.Address) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "createRoute", distance, creatorAddress)
}

// completeRoute 함수
func (a *RunzEco) CompleteRoute(auth *bind.TransactOpts, routeId *big.Int, runnerAddress common.Address) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "completeRoute", routeId, runnerAddress)
}

// finishRoute 함수
func (a *RunzEco) FinishRoute(auth *bind.TransactOpts, routeId *big.Int) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "finishRoute", routeId)
}

func (a *RunzEco) ClaimReward(auth *bind.TransactOpts, routeId *big.Int) (*types.Transaction, error) {
	return a.Contract.Transact(auth, "finishRoute", routeId)
}
