import express, { Router } from 'express';
import tradingController from '../controllers/tradingController.js';
import stockPrices from './stockPrices.js'; // New stock prices API

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
router.get('/report', tradingController.getReport);

/**
 * Route to get the current stock price from the stock prices API.
 * @name get/stock-prices/current-price
 * @function
 * @memberof module:router
 */
router.use('/stock-prices', stockPrices);

export default router;
