FROM cypress/included:14.3.2

# Set working directory
WORKDIR /e2e

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

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

# Command to run Cypress tests with explicit configuration
CMD ["npx", "cypress", "run", "--config", "video=true,screenshotOnRunFailure=true,trashAssetsBeforeRuns=false"] 