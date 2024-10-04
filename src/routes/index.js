import { Router } from 'express';
import tradingController from '../controllers/tradingController.js';

const router = Router();

router.get('/stock-price', tradingController.getStockPrice);
router.get('/report', tradingController.getReport); // New endpoint for report

export default router;
