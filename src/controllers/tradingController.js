import tradeService from '../services/tradeService.js'; // Add .js extension

const getStockPrice = (req, res) => {
  const price = tradeService.getStockPrice();
  res.status(200).json({ price });
};

export default { getStockPrice };
