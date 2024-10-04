import { Router } from 'express';
import tradingController from '../controllers/tradingController.js';

const router = Router();

router.get('/stock-price', tradingController.getStockPrice);

export default router;
