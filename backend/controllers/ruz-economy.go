package controllers

import (
	"context"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/models"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
	"math/big"
	"net/http"
	"strings"
	"time"
)

var runzEcoErc20 *models.RunzEco

func init() {
	privateKey, err := crypto.HexToECDSA(privateKeyHex)
	if err != nil {
		panic("Invalid private key")
	}
	auth, err = bind.NewKeyedTransactorWithChainID(privateKey, new(big.Int).SetUint64(88882))
	if err != nil {
		panic("Create auth failed")
	}

	auth.GasPrice = new(big.Int).SetInt64(2500000000000)
	runzEcoErc20, err = models.NewRunzEco(common.HexToAddress(models.RunzEcoContractAddress), chainURl)
	if err != nil {
		panic("Create contract failed")
	}
}

// 2. createRoute 함수
func CreateRoute(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	distance, ok1 := req["distance"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing distance"})
		return
	}
	creatorAddress, ok2 := req["creatorAddress"].(string)
	if !ok2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing creator address"})
		return
	}

	distanceBig, ok := new(big.Int).SetString(distance, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid distance"})
		return
	}

	address := common.HexToAddress(creatorAddress)

	tx, err := runzEcoErc20.CreateRoute(auth, distanceBig, address)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 트랜잭션 영수증 대기
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	receipt, err := bind.WaitMined(ctx, ethClient, tx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction mining error: " + err.Error()})
		return
	}

	if receipt.Status != 1 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction failed"})
		return
	}

	// ABI 정의 (RunEconomy 컨트랙트의 ABI에서 이벤트 정의 부분 추가 필요)
	parsedABI, err := abi.JSON(strings.NewReader(`[{"inputs":[{"internalType":"address","name":"_runzTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalDistance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalRunners","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"AggregatedDataLogged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"runner","type":"address"},{"indexed":false,"internalType":"uint256","name":"runnerReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"creatorReward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"distanceKm","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stakedAmount","type":"uint256"}],"name":"RouteCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"routeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"}],"name":"RouteFinished","type":"event"},{"inputs":[{"internalType":"uint256","name":"_routeId","type":"uint256"},{"internalType":"address","name":"_runner","type":"address"}],"name":"completeRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_distanceKm","type":"uint256"},{"internalType":"address","name":"_creator","type":"address"}],"name":"createRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creatorReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositRUNZ","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_routeId","type":"uint256"}],"name":"finishRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalDistance","type":"uint256"},{"internalType":"uint256","name":"_totalRunners","type":"uint256"}],"name":"logAggregatedRunnerData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerKm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"routeCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"routes","outputs":[{"internalType":"uint256","name":"distanceKm","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"stakedAmount","type":"uint256"},{"internalType":"bool","name":"isFinished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"runzToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingRatePerKm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerKm","type":"uint256"},{"internalType":"uint256","name":"_creatorReward","type":"uint256"},{"internalType":"uint256","name":"_stakingRatePerKm","type":"uint256"}],"name":"updateRewardParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}]`))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse ABI: " + err.Error()})
		return
	}

	// RouteCreated 이벤트 파싱
	for _, vLog := range receipt.Logs {
		event := struct {
			RouteID      *big.Int       `json:"route_id"`
			Creator      common.Address `json:"creator"`
			DistanceKm   *big.Int       `json:"distanceKm"`
			StakedAmount *big.Int       `json:"stakedAmount"`
		}{}

		err := parsedABI.UnpackIntoInterface(&event, "RouteCreated", vLog.Data)
		if err != nil {
			continue // 이 로그가 RouteCreated 이벤트가 아니면 건너뜁니다.
		}
		routeID := new(big.Int).SetBytes(vLog.Topics[1].Bytes())
		creator := common.HexToAddress(vLog.Topics[2].Hex())

		// 이벤트 필드 반환
		c.JSON(http.StatusOK, gin.H{
			"transaction": tx.Hash().Hex(),
			"event": gin.H{
				"routeId":      routeID,
				"creator":      creator,
				"distanceKm":   event.DistanceKm.String(),
				"stakedAmount": event.StakedAmount.String(),
			},
		})
		return
	}

	c.JSON(http.StatusInternalServerError, gin.H{"error": "RouteCreated event not found in transaction receipt"})
}

// 3. completeRoute 함수
func CompleteRoute(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	routeId, ok1 := req["routeId"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing routeId"})
		return
	}
	runnerAddress, ok2 := req["runnerAddress"].(string)
	if !ok2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing runner address"})
		return
	}

	routeIdBig, ok := new(big.Int).SetString(routeId, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid routeId"})
		return
	}

	runner := common.HexToAddress(runnerAddress)

	tx, err := runzEcoErc20.CompleteRoute(auth, routeIdBig, runner)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}

// 4. finishRoute 함수
func FinishRoute(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	routeId, ok := req["routeId"].(string)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing routeId"})
		return
	}

	routeIdBig, valid := new(big.Int).SetString(routeId, 10)
	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid routeId"})
		return
	}

	tx, err := runzEcoErc20.FinishRoute(auth, routeIdBig)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}
