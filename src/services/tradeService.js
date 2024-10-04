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

    let shortTermMA, longTermMA;

    try {
      shortTermMA = calculateMovingAverage(stockPrices, shortTermPeriod);
      longTermMA = calculateMovingAverage(stockPrices, longTermPeriod);
    } catch (error) {
      logger.error('Error calculating moving averages:', error.message);
      return; // Exit if moving average calculation fails
    }

    console.log(`Current price: ${currentPrice}`);
    console.log(`Short Term MA: ${shortTermMA}`);
    console.log(`Long Term MA: ${longTermMA}`);

    let action = null;
    let tradeShares = 0;
    let tradeBalance = 0;

    if (shares === 0 && currentPrice <= previousPrice * buyThreshold) {
      try {
        shares = Math.floor(balance / currentPrice);
        balance -= shares * currentPrice;
        action = 'buy';
        tradeShares = shares;
        tradeBalance = balance;
        logger.info(`Bought ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
      } catch (error) {
        logger.error('Error executing buy trade:', error.message);
      }
    } else if (shares > 0 && currentPrice >= previousPrice * sellThreshold) {
      try {
        balance += shares * currentPrice;
        profitLoss = balance - initialBalance;
        action = 'sell';
        tradeShares = shares;
        tradeBalance = balance;
        logger.info(`Sold ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}, P/L: $${profitLoss.toFixed(2)}`);
        shares = 0;
      } catch (error) {
        logger.error('Error executing sell trade:', error.message);
      }
    }

    if (shortTermMA && longTermMA) {
      try {
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
      } catch (error) {
        logger.error('Error during MA crossover trade execution:', error.message);
      }
    }

    if (action) {
      try {
        trades.push({
          action,
          price: currentPrice,
          shares: tradeShares,
          balance: tradeBalance,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        logger.error('Error recording trade:', error.message);
      }
    }

    previousPrice = currentPrice;
  } catch (error) {
    logger.error('Error fetching stock price:', error.message);
  }
};

const generateReport = () => {
  try {
    const report = [];
    report.push("---- Trading Summary Report ----");
    trades.forEach((trade, index) => {
      report.push(`${index + 1}. ${trade.timestamp} - ${trade.action.toUpperCase()}: ${trade.shares} shares at $${trade.price.toFixed(2)}. Balance: $${trade.balance.toFixed(2)}`);
    });
    report.push(`Final Balance: $${balance.toFixed(2)}`);
    report.push(`Total Profit/Loss: $${profitLoss.toFixed(2)}`);
    return report.join('\n');
  } catch (error) {
    logger.error('Error generating report:', error.message);
    return 'Error generating report';
  }
};

let stockPrice = 100;

const generateRandomPriceChange = (currentPrice) => {
    // Simulate market volatility with a normal distribution
    const volatility = 0.02; // 2% volatility
    const drift = 0.01; // 1% upward drift
    const randomShock = Math.random() * 2 - 1; // Random value between -1 and 1
    const priceChange = (drift + volatility * randomShock) * currentPrice;
    return priceChange;
  };
  
setInterval(() => {
    const priceChange = generateRandomPriceChange(stockPrice);
    stockPrice += priceChange;
}, 1000);
  

const getStockPrice = () => stockPrice;

const startTrading = () => {
  console.log("Trading bot started.");
  const intervalId = setInterval(trade, 1000); // Store the interval ID
  return intervalId; // Return the interval ID
};

export default { getStockPrice, startTrading, generateReport };
