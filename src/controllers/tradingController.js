import tradeService from '../services/tradeService.js';

const getStockPrice = (req, res) => {
  const price = tradeService.getStockPrice();
  res.status(200).json({ price });
};

const getReport = (req, res) => {
  const report = tradeService.generateReport(); // Generate and send the report
  res.status(200).json({ report });
};

export default { getStockPrice, getReport };
