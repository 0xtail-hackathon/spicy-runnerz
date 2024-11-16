package main

import (
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/config"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/controllers"
	"github.com/gin-gonic/gin"
)

func main() {
	// 데이터베이스 연결
	config.ConnectDatabase()

	// Gin 라우터 설정
	r := gin.Default()

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.POST("/record-run", controllers.RecordRun)
	r.POST("/create-challenge", controllers.CreateChallenge)
	r.POST("/complete-challenge", controllers.CompleteChallenge)
	r.POST("/convert-points", controllers.ConvertPointsToTokens)
	r.GET("/user-stats", controllers.GetUserStats)

	// 서버 실행
	r.Run(":8080") // 기본 포트 8080에서 실행
}
