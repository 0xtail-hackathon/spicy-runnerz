package config

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDatabase() {
	dsn := "user=myuser password=mypassword dbname=mydb host=localhost port=5432 sslmode=disable"
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		panic("Failed to connect to database!")
	}
	DB = db
	fmt.Println("Database connected successfully!")
}
