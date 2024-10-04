import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import logger from './utils/logger.js';
import tradeService from './services/tradeService.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  tradeService.startTrading(); 
});

// Handle shutdown gracefully to generate the report
const shutdown = () => {
  logger.info('Shutting down server...');
  const report = tradeService.generateReport();
  logger.info(report);
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
