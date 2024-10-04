
# Trader Bot

Trader Bot is a stock trading simulation tool built in Node.js. It automates the buying and selling of stocks based on real-time data and trading strategies, providing a comprehensive report on performance.

### Key Features:
- **Automated Trading**: Executes trades using moving average strategy.
- **Real-time Stock Price Simulation**: Generates random price changes for stock market simulation.
- **Trading Report**: Generates detailed summaries of trades.

### Target Users:
- Traders and developers interested in market simulations.

## Tech Stack:
- **Backend**: Node.js, Express.js
- **Logging**: Winston
- **Testing**: Jest, Supertest
- **Libraries**: Axios, dotenv, ESLint, JSDoc
- **Dependency Management**: pnpm
- **Development Tools**: Babel
- **Containerization**: Docker


# Installation

Follow these steps to set up Trader Bot locally. This guide assumes no prior installations of required software.

## Prerequisites

Ensure you have the following software installed:

1. **Node.js and npm**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Verify the installation by running `node -v` and `npm -v` in your terminal.

2. **pnpm** (Package Manager):
   - Install pnpm globally using npm:
     ```sh
     npm install -g pnpm
     ```

3. **Docker** (optional, for containerization):
   - Download and install Docker from [docker.com](https://www.docker.com/).
   - Verify the installation by running `docker -v` in your terminal.

## Steps

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/trader-bot.git
   cd trader-bot
   ```

2. **Install Dependencies**:
   ```
   pnpm install
   ```

3. **Set Up Environment Variables**:
   - Create a .env file in the project root and add your environment variables:
      ```
      PORT=3000
      ```

4. **Run the Application**:
      ```
      pnpm start
      ```

4. **Run Tests (optional)**:
      ```
      pnpm test
      ```

## Additional Steps (For Docker Users)
