# Use the official Node.js image as the base image
FROM node:20-slim

ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml (or yarn.lock), and package.json dependencies
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --prod

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["pnpm", "start"]
