package controllers

import (
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/models"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
	"math/big"
	"net/http"
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

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
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
