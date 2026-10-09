FROM node:18-alpine

WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Container healthcheck
HEALTHCHECK --interval=20s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-3000}/api/health || exit 1

# Start the application directly with node for proper signal handling
CMD ["node", "server.js"]