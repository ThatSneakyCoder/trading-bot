import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import logger from './utils/logger.js';
import tradeService from './services/tradeService.js';

dotenv.config();

/**
 * Express application instance.
 * @const {object}
 */
const app = express();

/**
 * Server port.
 * @const {number|string}
 */
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

/**
 * Starts the server and the trading service.
 * @function
 */
const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  tradeService.startTrading();
});

/**
 * Handles server shutdown and generates the trading report.
 * @function
 */
const shutdown = () => {
  logger.info('Shutting down server...');
  const report = tradeService.generateReport();
  logger.info('\n' + report); // Ensure report is properly formatted with a newline
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
};

// Set up signal handlers for graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
