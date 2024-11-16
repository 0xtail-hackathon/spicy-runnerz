package controllers

import (
	"database/sql"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/config"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

// 비밀번호 해싱
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// 비밀번호 검증
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// 회원가입 핸들러
func Register(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, _ := hashPassword(input.Password)
	input.Password = hashedPassword

	_, err := config.DB.Exec("INSERT INTO users (username, password) VALUES ($1, $2)", input.Username, input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to register user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

// 로그인 핸들러
func Login(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	row := config.DB.QueryRow("SELECT id, username, password FROM users WHERE username=$1", input.Username)
	err := row.Scan(&user.ID, &user.Username, &user.Password)
	if err == sql.ErrNoRows || !checkPasswordHash(input.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged in successfully"})
}
