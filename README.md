# Spicy Runnerz

> **Spicy Runnerz** is a platform that combines movement and art, enabling users to create and share "Run Art" by running. Users can earn rewards for completing and sharing courses, powered by blockchain technology.

---
## 👥 Contributors

- Seokhun Yoon - @imysh578
- Doyoung Kim - @Do-youngKim
- Jina Lee - @jijijjj

## 🚀 Project Overview

- **Goal**: Combine exercise and creativity to bring fun and motivation to users.
- **Key Features**:
    1. Draw art by following running courses.
    2. Share and collaborate with other users.
    3. Earn blockchain-based rewards (EVM tokens) for completing courses.
    4. Interact with a vibrant community.

---

## 🛠️ Tech Stack

- **Blockchain**:
    - Chiliz Spicy Testnet 🌶️
    - Dynamic Labs SDK
    - hardhat
    - solidity
- **Frontend**:
    - TypeScript
    - Next.js
    - TailwindCSS
    - Google Map API
- **Backend**:
    - Go
    - Node.js
---

## 📂 Project Structure
```
spicy-runnerz/
├── README.md                # Main project documentation
├── backend/                 # Backend-related files and servers
│   └── go-server/           # Go-based backend server
├── contracts/               # Smart contract development
│   ├── contracts/           # Solidity contracts
│   ├── hardhat.config.ts    # Hardhat configuration
│   ├── ignition/            # Deployment and testing tools
│   └── tsconfig.json        # TypeScript configuration
└── frontend/                # Frontend application
    ├── app/                 # Next.js pages and components
    ├── constants/           # Constants and configuration files
    ├── data/                # Static data files
    ├── lib/                 # Utility libraries and helpers
    ├── public/              # Static assets (images, icons, etc.)
    ├── tailwind.config.ts   # TailwindCSS configuration
    └── tsconfig.json        # TypeScript configuration
```

---
## 🏗️ Development Roadmap
- Verification System:
	- Capture runner’s location coordinates every 10 meters during the run.
	- Compare captured coordinates against the original route’s coordinates.
	- Validate the run if at least 90% of the paths match the original route.
	- Store the validation result as proof of completion.
- Ad Runs:
    - Allow businesses to create custom RUNs as advertising campaigns.
    - Businesses send a pool of tokens to RUNNERZ for airdrops.
    - Users complete runs shaped like business logos to earn tokens.
    - Example: Running the shape of the ETH logo around a convention area.
- Shop Feature:
    - Enable users to spend earned tokens on digital or physical goods.
    - Support for exclusive in-app items.
- Timeline Feature:
    - Allow users to view and share their running history as a timeline.
    - Display completed art, statistics, and rewards in a visual format.

---
## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/0xtail-hackathon/spicy-runnerz.git
cd spicy-runnerz
