import express from 'express';
import dotenv from 'dotenv';
import logger from '../utils/logger.js'; // Import your logger

dotenv.config();

const app = express();
let stockPrice = 100;

/**
 * Generates a random price change based on volatility and drift.
 * @param {number} currentPrice - The current stock price.
 * @returns {number} The change in stock price.
 */
const generateRandomPriceChange = (currentPrice) => {
  const volatility = 0.02;
  const drift = 0.01;
  const randomShock = Math.random() * 2 - 1;
  const priceChange = (drift + volatility * randomShock) * currentPrice;
  return priceChange;
};

// Simulates stock price changes every second.
setInterval(() => {
  const priceChange = generateRandomPriceChange(stockPrice);
  stockPrice += priceChange;
}, 1000);

/**
 * Endpoint to get the current stock price.
 * @returns {number} The current stock price.
 */
app.get('/current-price', (req, res) => {
  res.json({ price: stockPrice });
});

/**
 * Server port for the stock prices API.
 * @const {number|string}
 */
const port = process.env.STOCK_API_PORT || 4000; // Use environment variable or default to 4000
app.listen(port, () => {
  logger.info(`Stock prices API running on port ${port}`); // Use logger instead of console.log
});

export default app;
