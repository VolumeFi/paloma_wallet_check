# 🌐 Wallet Balance Checker

This Node.js web application 🚀 reads a list of cryptocurrency wallet addresses from a text file, serves them as clickable URLs on a web page, and upon clicking, checks their balances using the `palomad` CLI to determine if they meet a specified minimum balance threshold.

## Features

- **Configurable Settings**: Set your server's host, port, and protocol via an `.env` file. ⚙️
- **Web Interface**: Visit the root URL to view and interact with the list of wallet addresses. 🌍
- **Balance Verification**: Click an address to verify its balance through the `palomad` command-line query. 💼
- **Threshold Validation**: The app evaluates if the balance is above or below a pre-defined value, displaying true or false accordingly. ✅❌

## How to Use

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Create an `.env` file with `PROTOCOL`, `HOST`, and `PORT` variables.
4. Add your wallet addresses to `addresses.txt`.
5. Start the server using `npm start`.
6. Open your web browser to your server's URL to view and interact with the wallet addresses.

## Installation

```bash
git clone https://github.com/rootedbox/wallet_check.git
cd wallet_check
npm install
# Configure your .env file
npm start
