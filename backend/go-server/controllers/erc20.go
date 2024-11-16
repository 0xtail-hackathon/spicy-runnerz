package controllers

import (
	"database/sql"
	"errors"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/config"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/models"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
	"math/big"
	"net/http"
)

// 이더리움 클라이언트 설정
var contractErc20 *models.Erc20

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
	contractErc20, err = models.NewErc20(common.HexToAddress(models.Erc20ContractAddress), chainURl)
	if err != nil {
		panic("Create contract failed")
	}
}

// recordRun API
func Mint(c *gin.Context) {
	// distance, time, hash 파라미터를 수신
	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	hexAddress, ok1 := req["address"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing hexAddress"})
		return
	}
	amount, ok2 := req["amount"].(string)
	if !ok2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing amount"})
		return
	}

	address := common.HexToAddress(hexAddress)

	// recordRun 호출
	amountBig, ok := new(big.Int).SetString(amount, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}
	tx, err := contractErc20.Mint(auth, address, amountBig)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}

// recordRun API
func Approve(c *gin.Context) {
	// distance, time, hash 파라미터를 수신

	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	name, ok0 := req["name"].(string)
	if !ok0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing hexSpender"})
		return
	}
	hexSpender, ok1 := req["spender"].(string)
	if !ok1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing hexSpender"})
		return
	}
	amount, ok2 := req["amount"].(string)
	if !ok2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing time"})
		return
	}

	address := common.HexToAddress(hexSpender)

	var user models.User
	row := config.DB.QueryRow("SELECT id, username, password, private_key FROM users WHERE username=$1", name)
	err := row.Scan(&user.ID, &user.Username, &user.Password, &user.PrivateKey)
	if errors.Is(err, sql.ErrNoRows) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username"})
		return
	}

	// recordRun 호출
	amountBig, ok := new(big.Int).SetString(amount, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}
	privateKey, err := crypto.HexToECDSA(user.PrivateKey)
	if err != nil {
		panic("Invalid private key")
	}
	localAuth, err := bind.NewKeyedTransactorWithChainID(privateKey, new(big.Int).SetUint64(88882))
	if err != nil {
		panic("Create auth failed")
	}
	tx, err := contractErc20.Approve(localAuth, address, amountBig)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": tx.Hash().Hex()})
}
