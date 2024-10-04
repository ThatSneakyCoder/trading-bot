import axios from 'axios';
import logger from '../utils/logger.js'; // Ensure logger is imported

let initialBalance = 10000;
let balance = initialBalance;
let shares = 0;
let previousPrice = 100;
let profitLoss = 0;

const buyThreshold = 0.98;
const sellThreshold = 1.03;

const trade = async () => {
  try {
    console.log('Fetching stock price...');
    const response = await axios.get('http://localhost:3000/api/stock-price', {
      headers: {
        'Connection': 'keep-alive'
      }
    });
    const currentPrice = response.data.price;
    console.log(`Current price: ${currentPrice}`);
    
    if (shares === 0 && currentPrice <= previousPrice * buyThreshold) {
      shares = Math.floor(balance / currentPrice);
      balance -= shares * currentPrice;
      logger.info(`Bought ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
    } else if (shares > 0 && currentPrice >= previousPrice * sellThreshold) {
      balance += shares * currentPrice;
      profitLoss = balance - initialBalance;
      logger.info(`Sold ${shares} shares at $${currentPrice.toFixed(2)}. Balance: $${balance.toFixed(2)}, P/L: $${profitLoss.toFixed(2)}`);
      shares = 0;
    }

    previousPrice = currentPrice;
  } catch (error) {
    logger.error('Error fetching stock price:', error.message);
  }
};

let stockPrice = 100;

setInterval(() => {
  const priceChange = (Math.random() - 0.5) * 4; 
  stockPrice += priceChange;
}, 1000);

const getStockPrice = () => stockPrice;

const startTrading = () => {
  console.log("Trading bot started.");
  setInterval(trade, 5000);
};

export default { getStockPrice, startTrading }; // Exporting both functions
