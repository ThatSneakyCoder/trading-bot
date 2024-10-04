import tradeService from '../services/tradeService.js';
import logger from '../utils/logger.js';  // Import logger

const getStockPrice = async (req, res) => {
  try {
    const price = await tradeService.getStockPrice();
    res.status(200).json({ price });
  } catch (error) {
    logger.error('Error fetching stock price:', error);  // Replaced console.error with logger
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getReport = async (req, res) => {
  try {
    const report = await tradeService.generateReport();
    res.status(200).json({ report });
  } catch (error) {
    logger.error('Error generating report:', error);  // Replaced console.error with logger
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default { getStockPrice, getReport };
