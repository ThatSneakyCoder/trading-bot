import axios from 'axios';
import logger from '../utils/logger.js';

let initialBalance = 10000;
let balance = initialBalance;
let shares = 0;
let previousPrice = 100;
let profitLoss = 0;
let stockPrices = [];
let trades = [];

const shortTermPeriod = 5;
const longTermPeriod = 20;

const buyThreshold = 0.98;
const sellThreshold = 1.03;

/**
 * Calculates the moving average of the given prices over a specified period.
 * @param {number[]} prices - An array of stock prices.
 * @param {number} period - The period over which to calculate the moving average.
 * @returns {number|null} The moving average or null if not enough data points.
 */
const calculateMovingAverage = (prices, period) => {
  if (prices.length < period) return null;
  const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
  return sum / period;
};

/**
 * Executes a trading strategy based on moving averages.
 * Fetches the current stock price, calculates moving averages, and decides whether to buy or sell.
 */
const trade = async () => {
  try {
    logger.info('Fetching stock price...');
    const response = await axios.get('http://localhost:3000/api/stock-price', {
      headers: {
        'Connection': 'keep-alive',
      },
    });
    const currentPrice = response.data.price;
    logger.info(`API Response: ${JSON.stringify(response.data)}`);

    if (typeof currentPrice !== 'number' || isNaN(currentPrice)) {
      throw new Error('Invalid stock price received from API');
    }

    stockPrices.push(currentPrice);

    const shortTermMA = calculateMovingAverage(stockPrices, shortTermPeriod);
    const longTermMA = calculateMovingAverage(stockPrices, longTermPeriod);

    logger.info(`Current price: ${currentPrice}`);
    logger.info(`Short Term MA: ${shortTermMA}`);
    logger.info(`Long Term MA: ${longTermMA}`);

    let action = null;
    let tradeShares = 0;
    let tradeBalance = 0;

    if (shares === 0 && currentPrice <= previousPrice * buyThreshold) {
      shares = Math.floor(balance / currentPrice);
      balance -= shares * currentPrice;
      action = 'buy';
      tradeShares = shares;
      tradeBalance = balance;
      logger.info(`Bought ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
    } else if (shares > 0 && currentPrice >= previousPrice * sellThreshold) {
      balance += shares * currentPrice;
      profitLoss = balance - initialBalance;
      action = 'sell';
      tradeShares = shares;
      tradeBalance = balance;
      logger.info(`Sold ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}, P/L: $${profitLoss.toFixed(2)}`);
      shares = 0;
    }

    if (shortTermMA && longTermMA) {
      if (shortTermMA > longTermMA && shares === 0) {
        shares = Math.floor(balance / currentPrice);
        balance -= shares * currentPrice;
        action = 'buy';
        tradeShares = shares;
        tradeBalance = balance;
        logger.info(`MA Crossover - Bought ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
      } else if (shortTermMA < longTermMA && shares > 0) {
        balance += shares * currentPrice;
        profitLoss = balance - initialBalance;
        action = 'sell';
        tradeShares = shares;
        tradeBalance = balance;
        logger.info(`MA Crossover - Sold ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}, P/L: $${profitLoss.toFixed(2)}`);
        shares = 0;
      }
    }

    if (action) {
      trades.push({
        action,
        price: currentPrice,
        shares: tradeShares,
        balance: tradeBalance,
        timestamp: new Date().toISOString(),
      });
    }

    previousPrice = currentPrice;
  } catch (error) {
    logger.error(`Error fetching stock price: ${error.message}`);
  }
};

/**
 * Generates a report summarizing all trades.
 * @returns {string} The trading summary report.
 */
const generateReport = () => {
  try {
    const report = [];
    report.push('---- Trading Summary Report ----');
    trades.forEach((trade, index) => {
      report.push(
        `${index + 1}. ${trade.timestamp} - ${trade.action.toUpperCase()}: ${trade.shares} shares at $${trade.price.toFixed(2)}. Balance: $${trade.balance.toFixed(2)}`
      );
    });
    report.push(`Final Balance: $${balance.toFixed(2)}`);
    report.push(`Total Profit/Loss: $${profitLoss.toFixed(2)}`);
    return report.join('\n');
  } catch (error) {
    logger.error(`Error generating report: ${error.message}`);
    return 'Error generating report';
  }
};

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
 * Gets the current stock price.
 * @returns {number} The current stock price.
 */
const getStockPrice = () => stockPrice;

/**
 * Starts the trading bot..
 * @returns {NodeJS.Timeout} The interval ID for the trading bot.
 */
const startTrading = () => {
  logger.info('Trading bot started.');
  const intervalId = setInterval(trade, 1000);
  return intervalId;
};

export default { getStockPrice, startTrading, generateReport };
