import express from 'express';
import request from 'supertest';
import routes from '../src/routes/index.js';

const app = express();
app.use('/api', routes);

describe('Trading Controller', () => {
  test('should get stock price', async () => {
    const response = await request(app).get('/api/stock-price');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('price');
  });

  test('should get summary report', async () => {
    const response = await request(app).get('/api/report');
    expect(response.statusCode).toBe(200);
    expect(response.body.report).toContain('---- Trading Summary Report ----');
  });
});
