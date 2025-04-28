FROM cypress/included:14.3.2

# Set working directory
WORKDIR /e2e

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Set environment variables
ENV CYPRESS_BASE_URL=https://app.pipedrive.com
ENV CYPRESS_EMAIL=${CYPRESS_EMAIL}
ENV CYPRESS_PASSWORD=${CYPRESS_PASSWORD}

# Command to run Cypress tests
CMD ["npx", "cypress", "run"] 