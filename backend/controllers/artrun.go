package controllers

import (
	"encoding/hex"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/models"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-gonic/gin"
	"math/big"
	"net/http"
	"os"
	"strings"
)

var (
	chainURl      = os.Getenv("RPC_URL")
	privateKeyHex = os.Getenv("DEPLOYER_PRIVATE_KEY")
)

// 이더리움 클라이언트 설정
var contract *models.ArtRun
var auth *bind.TransactOpts
var ethClient *ethclient.Client

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
	contract, err = models.NewArtRun(common.HexToAddress(models.ArtRunContractAddress), chainURl)
	if err != nil {
		panic("Create contract failed")
	}

	ethClient, err = ethclient.Dial(chainURl)
	if err != nil {
		panic("Failed to connect to RPC")
	}
}

// recordRun API
func RecordRun(c *gin.Context) {
	// distance, time, hash 파라미터를 수신
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
	time, ok2 := req["time"].(string)
	if !ok2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing time"})
		return
	}
	hash, ok3 := req["hash"].(string)
	if !ok3 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing hash"})
		return
	}
	hash = strings.TrimPrefix(hash, "0x")

	// ArtRun 컨트랙트 인스턴스 생성

	// recordRun 호출
	distanceBig, ok := new(big.Int).SetString(distance, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid distance"})
		return
	}
	timeBig, ok := new(big.Int).SetString(time, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid time"})
		return
	}
	hashBytes, err := hex.DecodeString(hash)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid hash"})
		return
	}
	tx, err := contract.RecordRun(auth, distanceBig, timeBig, [32]byte(hashBytes))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}

// CreateChallenge API
func CreateChallenge(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	distanceRequired, ok1 := req["distanceRequired"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing distanceRequired"})
		return
	}
	rewardPoints, ok2 := req["rewardPoints"].(string)
	if !ok2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing rewardPoints"})
		return
	}
	rewardTokens, ok3 := req["rewardTokens"].(string)
	if !ok3 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing rewardTokens"})
		return
	}

	distanceRequiredBig, ok := new(big.Int).SetString(distanceRequired, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid distanceRequired"})
		return
	}
	rewardPointsBig, ok := new(big.Int).SetString(rewardPoints, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid rewardPoints"})
		return
	}
	rewardTokensBig, ok := new(big.Int).SetString(rewardTokens, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid rewardTokens"})
		return
	}

	tx, err := contract.CreateChallenge(auth, distanceRequiredBig, rewardPointsBig, rewardTokensBig)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}

// CompleteChallenge API
func CompleteChallenge(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	challengeId, ok1 := req["challengeId"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing challengeId"})
		return
	}

	challengeIdBig, ok := new(big.Int).SetString(challengeId, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid challengeId"})
		return
	}

	tx, err := contract.CompleteChallenge(auth, challengeIdBig)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}

// ConvertPointsToTokens API
func ConvertPointsToTokens(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	points, ok1 := req["points"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing points"})
		return
	}

	pointsBig, ok := new(big.Int).SetString(points, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid points"})
		return
	}
	tx, err := contract.ConvertPointsToTokens(auth, pointsBig)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}

// GetUserStats API
func GetUserStats(c *gin.Context) {
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	userAddress, ok1 := req["userAddress"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing points"})
		return
	}

	address := common.HexToAddress(userAddress)

	points, tokens, err := contract.GetUserStats(nil, address)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"points": points, "tokens": tokens})
}

// VerifyRun API
func VerifyRun(c *gin.Context) {
	runId := c.Query("runId")
	hash := c.Query("hash")

	runIdBig, ok := new(big.Int).SetString(runId, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "runId time"})
		return
	}
	hashBytes, err := hex.DecodeString(hash)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid hash"})
		return
	}

	verified, err := contract.VerifyRun(nil, runIdBig, [32]byte(hashBytes))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"verified": verified})
}
