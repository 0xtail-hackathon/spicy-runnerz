# 1. recordRun API 호출
curl -X POST http://localhost:8080/record-run \
  -H "Content-Type: application/json" \
  -d '{"distance": "5000", "time": "1800", "hash": "0x1234567890abcdef"}'

# 2. createChallenge API 호출
curl -X POST http://localhost:8080/create-challenge \
  -H "Content-Type: application/json" \
  -d '{"distanceRequired": "10000", "rewardPoints": "500", "rewardTokens": "10"}'

# 3. completeChallenge API 호출
curl -X POST http://localhost:8080/complete-challenge \
  -H "Content-Type: application/json" \
  -d '{"challengeId": "1"}'

# 4. convertPointsToTokens API 호출
curl -X POST http://localhost:8080/convert-points \
  -H "Content-Type: application/json" \
  -d '{"points": "1000"}'

# 5. getUserStats API 호출
curl -X GET "http://localhost:8080/user-stats?userAddress=0xYourUserAddress"

# 6. verifyRun API 호출
curl -X GET "http://localhost:8080/verify-run?runId=1&hash=0x1234567890abcdef"
