# Backend & Blockchain Development: ArtRun & RUNZToken

This repository includes a Go server and smart contracts for the `ArtRun` running challenge tracking system and `RUNZToken` ERC-20 token. The Go server interacts with the Ethereum blockchain, providing RESTful APIs for interaction with these contracts.

## Prerequisites

- Go (version 1.16+ recommended)
- Node.js (version 14+ recommended)
- Docker (for PostgreSQL database)
- Hardhat

## Getting Started

### 1. Install Dependencies

#### Go Dependencies

Navigate to the Go server folder and install dependencies:

```bash
cd backend
go mod tidy
```

#### Node.js Dependencies

Navigate to the Hardhat project folder and install dependencies:

```bash
cd ../hardhat
npm install
```

### 3. Set Up the Database (PostgreSQL with Docker)

Run PostgreSQL as a Docker container:

```bash
docker run --name my_postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:latest
```

### 4. Configure Environment Variables

Create `.env` files on root directory to manage sensitive information like private keys and RPC URLs.

#### Example `.env` for Go Server

In `.env`:

```plaintext
DEPLOYER_PRIVATE_KEY=abcd...123
RPC_URL="https://spicy-rpc.chiliz.com/"
```

### 5. Deploy Contracts

Navigate to the Hardhat directory and deploy the smart contracts:

```bash
npx hardhat run scripts/deploy.js --network spicyChiliz
```

After deployment, note down the contract addresses for `ArtRun` and `RUNZToken` and add them to the Go server configuration.

### 6. Run the Go Server

Navigate to the Go server directory and start the server:

```bash
cd backend
go run main.go
```

The server should now be running on `http://localhost:8080`.

## API Endpoints

The following RESTful API endpoints are available to interact with the smart contracts:

- **Record Run**: `POST /record-run`
- **Create Challenge**: `POST /create-challenge`
- **Complete Challenge**: `POST /complete-challenge`
- **Convert Points to Tokens**: `POST /convert-points`
- **Get User Stats**: `GET /user-stats?userAddress=<address>`
- **Verify Run**: `GET /verify-run?runId=<id>&hash=<hash>`

### Example Usage (cURL)

To test the API, you can use `curl` commands. Here is an example of recording a run:

```bash
curl -X POST http://localhost:8080/record-run \
  -H "Content-Type: application/json" \
  -d '{"distance": "5000", "time": "1800", "hash": "0x1234567890abcdef"}'
```
