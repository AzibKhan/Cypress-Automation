FROM cypress/included:13.6.1

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

# Command to run Cypress tests
CMD ["npx", "cypress", "run"] 