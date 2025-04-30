FROM cypress/included:14.3.2

# Set working directory
WORKDIR /e2e

# Install additional system dependencies
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libxkbcommon0 \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && \
    npm cache clean --force

# Create necessary directories with proper permissions
RUN mkdir -p /e2e/cypress/reports/mochawesome \
    && mkdir -p /e2e/cypress/reports/mochawesome/.jsons \
    && mkdir -p /e2e/cypress/screenshots \
    && mkdir -p /e2e/cypress/videos \
    && chmod -R 777 /e2e/cypress

# Copy the rest of the project files
COPY . .

# Set environment variables
ENV CYPRESS_BASE_URL=https://app.pipedrive.com
ENV CYPRESS_EMAIL=${CYPRESS_EMAIL}
ENV CYPRESS_PASSWORD=${CYPRESS_PASSWORD}
ENV CYPRESS_VIDEO=true
ENV CYPRESS_SCREENSHOTS=true
ENV CYPRESS_REPORTS=true
ENV DISPLAY=:99

# Create a non-root user
RUN useradd -m -u 1001 cypress && \
    chown -R cypress:cypress /e2e

# Switch to non-root user
USER cypress

# Command to run Cypress tests with explicit configuration
CMD ["npx", "cypress", "run", "--config", "video=true,screenshotOnRunFailure=true,trashAssetsBeforeRuns=false"] 