# Use the official Node.js 18 image as a base image
FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code, excluding node_modules
COPY . .

# Set environment variables
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
