import tradeService from '../src/services/tradeService.js';

describe('Trade Service', () => {
  let intervalId;

  beforeAll(() => {
    intervalId = tradeService.startTrading(); // Store the interval ID
  });

  afterAll(() => {
    clearInterval(intervalId); // Clear the interval after tests
  });

  test('should fetch stock price', () => {
    const stockPrice = tradeService.getStockPrice();
    expect(typeof stockPrice).toBe('number');
  });

  test('should generate a summary report', () => {
    const report = tradeService.generateReport();
    expect(report).toContain('---- Trading Summary Report ----');
  });
});
