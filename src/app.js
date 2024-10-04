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
  console.log("\nShutting down server...");
  const report = tradeService.generateReport();
  console.log(report);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
