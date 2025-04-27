#!/bin/bash

# Build and run Cypress tests in Docker
echo "Building and running Cypress tests in Docker..."

# Build the Docker image
docker-compose build

# Run the tests
docker-compose run --rm cypress

# Optional: Open Cypress UI in Docker
if [ "$1" == "--open" ]; then
  echo "Opening Cypress UI in Docker..."
  docker-compose run --rm -p 3000:3000 cypress npx cypress open
fi 