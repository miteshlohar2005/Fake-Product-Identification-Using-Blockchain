# 🔐 Fake Product Identification Using Blockchain

A blockchain-based product verification system designed to help users verify product authenticity using smart contracts and a decentralized ledger.

## 📌 Overview

Fake products are a major problem in industries such as electronics, cosmetics, medicines, and branded goods. This project explores how blockchain technology can help verify product registration and reduce the risk of counterfeit products.

The application provides a web interface where users can connect their MetaMask wallet and interact with a Solidity smart contract to register or verify products.

## ✨ Features

- **MetaMask Integration:** Connect your Ethereum-compatible wallet.
- **Blockchain Verification:** Interact with product records stored on the blockchain.
- **Smart Contract:** Use Solidity to manage product registration and verification.
- **React Frontend:** A modern, responsive user interface.
- **Truffle Support:** Compile, deploy, and manage smart contracts.
- **Local Blockchain Testing:** Test the application using a local Truffle development network.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend application |
| JavaScript | Application logic |
| CSS | User interface styling |
| Solidity | Smart contract development |
| Truffle | Contract compilation and deployment |
| MetaMask | Wallet connection |
| Ganache / Truffle Develop | Local blockchain testing |

## 📂 Project Structure

```text
Fake-Product-Identification-Using-Blockchain/
├── contracts/
│   └── ProductVerification.sol
├── migrations/
│   └── 2_deploy_contracts.js
├── build/
│   └── contracts/
│       └── ProductVerification.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── contracts/
│   │   │   └── ProductVerification.json
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json
├── truffle-config.js
└── README.md
```

*Note: The structure above represents the expected project layout. Some files or folders may differ in your local setup.*

## ⚙️ Prerequisites

Install the following before running the project:

- [Node.js and npm](https://nodejs.org/)
- [MetaMask](https://metamask.io/)
- Truffle CLI
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/miteshlohar2005/Fake-Product-Identification-Using-Blockchain.git
cd Fake-Product-Identification-Using-Blockchain
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Start a local blockchain

Open a terminal in the project root:

```bash
npx truffle develop
```

Keep this terminal running. Truffle Develop starts a local blockchain and displays test accounts, private keys, and the local RPC endpoint.

Use only the generated test accounts and private keys for local development. Never import real wallet credentials into a test environment.

### 5. Compile the smart contract

Open another terminal in the project root:

```bash
npx truffle compile
```

### 6. Deploy the smart contract

In the second terminal, run:

```bash
npx truffle migrate --reset --network develop
```

If your Truffle configuration uses a different network name or port, adjust the command and configuration accordingly.

### 7. Configure MetaMask

Add or select your local development network using the RPC URL and chain ID reported by your running Truffle environment.

For a standard Truffle Develop session, these are commonly:

- Network name: Truffle Develop
- RPC URL: `http://127.0.0.1:9545`
- Chain ID: `1337`
- Currency symbol: `ETH`

Use the actual RPC URL and chain ID reported by your terminal. If MetaMask says the chain ID is already in use, select or edit the existing network instead of adding a duplicate.

Import a generated Truffle test account into MetaMask only for local testing.

### 8. Update the contract artifact

After compilation, copy the generated contract artifact into the frontend:

```powershell
New-Item -ItemType Directory -Force .\frontend\src\contracts
Copy-Item .\build\contracts\ProductVerification.json .\frontend\src\contracts\ProductVerification.json -Force
```

Repeat this step whenever the contract ABI or compiled artifact changes.

### 9. Start the frontend

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, commonly:

`http://localhost:5173`

## 🧪 Testing Checklist

1. Start the local blockchain and keep it running.
2. Compile and deploy `ProductVerification.sol`.
3. Confirm the frontend contract artifact is up to date.
4. Open the frontend in your browser.
5. Connect MetaMask and approve the account connection.
6. Confirm MetaMask is using the same local network as the deployed contract.
7. Test product registration using the fields supported by the smart contract.
8. Verify a registered product and check its stored details.
9. Try an unknown product ID to test the unsuccessful verification path.
10. Check the browser console and terminal for errors.

**Important:** The actual registration fields, verification function names, and expected results depend on the implementation of `ProductVerification.sol` and `App.jsx`.

## 🔒 Security Notes

- Never commit wallet seed phrases, private keys, or secret credentials.
- Use local test accounts during development.
- Do not use this local test setup to handle real funds or production product data.
- Blockchain registration alone does not physically prove that a product is genuine. Authenticity depends on reliable registration and supply-chain processes.

## 🔮 Future Enhancements

- QR-code generation and scanning.
- Product batch and manufacturer details.
- Product history and supply-chain tracking.
- Transaction history and verification reports.
- Deployment to a suitable public testnet.
- Improved mobile responsiveness and accessibility.

## 👨‍💻 Author

**Mitesh Ramesh Lohar**

- GitHub: [@miteshlohar2005](https://github.com/miteshlohar2005)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/mitesh-ramesh-lohar/)

## 📄 License

This project is intended for educational and academic purposes. Add a `LICENSE` file if you wish to distribute it under a specific open-source license.
