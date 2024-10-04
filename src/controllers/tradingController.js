import tradeService from '../services/tradeService.js';

const getStockPrice = async (req, res) => {
  try {
    const price = await tradeService.getStockPrice();
    res.status(200).json({ price });
  } catch (error) {
    console.error('Error fetching stock price:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getReport = async (req, res) => {
  try {
    const report = await tradeService.generateReport(); // Generate and send the report
    res.status(200).json({ report });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default { getStockPrice, getReport };
