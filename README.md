
# Trading Bot

This is a simple trading bot application built with Node.js and Express. It simulates stock price changes and buys/sells a stock based on its price movements. The bot monitors an API endpoint to retrieve the current stock price and makes trading decisions based on predefined thresholds.

## Features

- **Mock Stock Data**: Starts with a stock price of 100 and simulates price changes every second (random changes between -2 and +2).
- **API Endpoint**: Provides an API (`/api/stock-price`) to fetch the current stock price.
- **Trading Logic**: 
  - Buys stock when the price drops by 2% (configurable).
  - Sells stock when the price rises by 3% (configurable).
- **Logging**: Logs trading activities, profit, and loss to both the console and a file (`app.log`).

## Prerequisites

- **Node.js** (v14 or later)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/trading-bot.git
   ```

2. **Install dependencies**:

   ```bash
   cd trading-bot
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variable:

   ```
   PORT=3000
   ```

   You can change the port as per your requirement.

## Running the Application

1. **Start the server**:

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000` (or the port specified in the `.env` file).

2. **Start the trading bot**: The bot will automatically start monitoring the stock price and making trades based on the configured thresholds. You can observe the trading activities and profit/loss in the console and the `app.log` file.

## Configuration

You can modify the following variables in `bot.js` to adjust the trading behavior:

- `initialBalance`: The starting balance for the trading bot (default: 10000).
- `buyThreshold`: The threshold for buying the stock (default: 0.98, i.e., buy when the price drops by 2%).
- `sellThreshold`: The threshold for selling the stock (default: 1.03, i.e., sell when the price rises by 3%).

## API

- **GET `/api/stock-price`**: Fetches the current mock stock price. The price changes every second within a range of -2 to +2.

## Dependencies

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [dotenv](https://github.com/motdotla/dotenv): Loads environment variables from a `.env` file.
- [axios](https://github.com/axios/axios): Promise-based HTTP client for Node.js.
- [winston](https://github.com/winstonjs/winston): A logger for Node.js.

## Project Structure

- `index.js`: Provides a mock API for fetching the stock price and simulates price changes.
- `bot.js`: Contains the trading bot logic, including fetching stock prices, making trades, and logging activities.

## Contributing
## License
# Trader
