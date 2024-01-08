# Continuous Big Data Integrity Checking

## Project Overview

This project aims to ensure continuous data integrity in decentralized storage using blockchain technology and smart contracts. The system checks the integrity of stored data over time, optimizing communication and computation resources.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Requirements

Before you begin, ensure you have the following installed:
- Node.js
- Ethereum Wallet/MetaMask

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

1. **Smart Contract:**
    - Deploy the `VerifyDataIntegrity.sol` smart contract on the Ethereum blockchain.
    - Update the contract address in `App.js` under `connectWallet` function.

2. **MetaMask:**
    - Ensure MetaMask is installed in your browser.
    - Connect MetaMask to the Ethereum blockchain.

## Usage

1. **Run the React app:**
    ```bash
    npm start
    ```

2. **Access the app:**
    Open your browser and navigate to `http://localhost:3000`.

3. **Upload and Extract:**
    - Choose a file and click "Upload and Extract" to display its content.

4. **Update File Hash:**
    - After extracting content, click "Update File Hash" to update the file hash on the blockchain.

5. **Verify Integrity:**
    - Click "Verify Integrity" to check if the file content has been modified.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

