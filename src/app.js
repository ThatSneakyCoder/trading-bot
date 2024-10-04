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

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  tradeService.startTrading(); 
});

export default app;
