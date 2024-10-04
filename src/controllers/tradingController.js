import tradeService from '../services/tradeService.js';
import logger from '../utils/logger.js';  // Import logger

/**
 * Fetches the current stock price.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getStockPrice = async (req, res) => {
  try {
    const price = await tradeService.getStockPrice();
    res.status(200).json({ price });
  } catch (error) {
    logger.error('Error fetching stock price:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Generates a report.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The generated report.
 */
const getReport = async (req, res) => {
  try {
    const report = await tradeService.generateReport();
    res.status(200).json({ report });
  } catch (error) {
    logger.error('Error generating report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default { getStockPrice, getReport };
