package main

import (
	"time"

	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/config"
	"github.com/0xtail-hackathon/pre-eth-bangkok/art-run-backend/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// 데이터베이스 연결
	config.ConnectDatabase()

	// Gin 라우터 설정
	r := gin.Default()
	// CORS 설정: 모든 출처, 모든 메서드 허용
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true, // 모든 도메인 허용
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // 모든 메서드 허용
		AllowHeaders:    []string{"Origin", "Content-Type", "Authorization"}, // 필요한 헤더들
		ExposeHeaders:   []string{"Content-Length"}, // 클라이언트가 접근할 수 있는 헤더
		AllowCredentials: true,
		MaxAge:          12 * time.Hour,
	}))
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.POST("/record-run", controllers.RecordRun)
	r.POST("/create-challenge", controllers.CreateChallenge)
	r.POST("/complete-challenge", controllers.CompleteChallenge)
	r.POST("/convert-points", controllers.ConvertPointsToTokens)
	r.GET("/user-stats", controllers.GetUserStats)

	r.POST("/mint", controllers.Mint)
	r.POST("/approve", controllers.Approve)

	r.POST("/create-route", controllers.CreateRoute)
	r.POST("/complete-route", controllers.CompleteRoute)
	r.POST("/finish-route", controllers.FinishRoute)

	// 서버 실행
	r.Run(":8080") // 기본 포트 8080에서 실행
}
