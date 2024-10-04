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

const calculateMovingAverage = (prices, period) => {
  if (prices.length < period) return null;
  const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
  return sum / period;
};

const trade = async () => {
  try {
    console.log('Fetching stock price...');
    const response = await axios.get('http://localhost:3000/api/stock-price', {
      headers: {
        'Connection': 'keep-alive'
      }
    });
    const currentPrice = response.data.price;
    console.log(`API Response:`, response.data);

    if (typeof currentPrice !== 'number' || isNaN(currentPrice)) {
      throw new Error('Invalid stock price received from API');
    }

    stockPrices.push(currentPrice);

    const shortTermMA = calculateMovingAverage(stockPrices, shortTermPeriod);
    const longTermMA = calculateMovingAverage(stockPrices, longTermPeriod);
    
    console.log(`Current price: ${currentPrice}`);
    console.log(`Short Term MA: ${shortTermMA}`);
    console.log(`Long Term MA: ${longTermMA}`);

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
      if (shortTermMA > longTermMA) {
        if (shares === 0) {
          shares = Math.floor(balance / currentPrice);
          balance -= shares * currentPrice;
          action = 'buy';
          tradeShares = shares;
          tradeBalance = balance;
          logger.info(`MA Crossover - Bought ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
        }
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
        timestamp: new Date().toISOString()
      });
    }

    previousPrice = currentPrice;
  } catch (error) {
    logger.error('Error fetching stock price:', error.message);
  }
};

const generateReport = () => {
  const report = [];
  report.push("---- Trading Summary Report ----");
  trades.forEach((trade, index) => {
    report.push(`${index + 1}. ${trade.timestamp} - ${trade.action.toUpperCase()}: ${trade.shares} shares at $${trade.price.toFixed(2)}. Balance: $${trade.balance.toFixed(2)}`);
  });
  report.push(`Final Balance: $${balance.toFixed(2)}`);
  report.push(`Total Profit/Loss: $${profitLoss.toFixed(2)}`);
  return report.join('\n');
};

let stockPrice = 100;

setInterval(() => {
  const priceChange = (Math.random() - 0.5) * 4;
  stockPrice += priceChange;
}, 1000);

const getStockPrice = () => stockPrice;

const startTrading = () => {
  console.log("Trading bot started.");
  const intervalId = setInterval(trade, 1000); // Store the interval ID
  return intervalId; // Return the interval ID
};

export default { getStockPrice, startTrading, generateReport };
