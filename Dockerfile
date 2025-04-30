# Use the official Cypress image as base
FROM cypress/included:14.3.2

# Set working directory
WORKDIR /e2e

# Install system dependencies
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
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -u 1001 cypress

# Copy package files
COPY package*.json ./

# Install dependencies and global tools
RUN npm ci && \
    npm install -g mochawesome-merge mochawesome-report-generator && \
    npm cache clean --force

# Create necessary directories
RUN mkdir -p /e2e/cypress/reports/mochawesome/.jsons \
    /e2e/cypress/screenshots \
    /e2e/cypress/videos \
    && chown -R cypress:cypress /e2e

# Copy the rest of the project files
COPY --chown=cypress:cypress . .

# Set environment variables
ENV CYPRESS_BASE_URL=https://app.pipedrive.com
ENV CYPRESS_VIDEO=true
ENV CYPRESS_SCREENSHOTS=true
ENV CYPRESS_REPORTS=true
ENV PATH="/e2e/node_modules/.bin:${PATH}"

# Switch to non-root user
USER cypress

# Run Cypress
CMD npx cypress run --config video=true,screenshotOnRunFailure=true,trashAssetsBeforeRuns=false 