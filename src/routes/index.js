import { Router } from 'express';
import tradingController from '../controllers/tradingController.js';

const router = Router();

/**
 * Route to get the current stock price.
 * @name get/stock-price
 * @function
 * @memberof module:router
 */
router.get('/stock-price', tradingController.getStockPrice);

/**
 * Route to get the report.
 * @name get/report
 * @function
 * @memberof module:router
 */
router.get('/report', tradingController.getReport); // New endpoint for report

export default router;
