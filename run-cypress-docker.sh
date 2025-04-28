#!/bin/bash

# Build and run Cypress tests in Docker
echo "Cypress Docker Runner"
echo "====================="

# Function to display help
show_help() {
  echo "Usage: ./run-cypress-docker.sh [options]"
  echo ""
  echo "Options:"
  echo "  --open       Open Cypress UI in Docker"
  echo "  --spec       Run a specific test file"
  echo "  --help       Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./run-cypress-docker.sh                     # Run all tests in headless mode"
  echo "  ./run-cypress-docker.sh --open              # Open Cypress UI in Docker"
  echo "  ./run-cypress-docker.sh --spec login        # Run tests matching 'login'"
}

# Parse command line arguments
SPEC=""
OPEN=false

for arg in "$@"; do
  case $arg in
    --open)
      OPEN=true
      ;;
    --spec=*)
      SPEC="${arg#*=}"
      ;;
    --spec)
      shift
      SPEC="$1"
      ;;
    --help)
      show_help
      exit 0
      ;;
  esac
done

# Build the Docker image
echo "Building Docker image..."
docker-compose build

# Run the tests
if [ "$OPEN" = true ]; then
  echo "Opening Cypress UI in Docker..."
  docker-compose run --rm -p 3000:3000 cypress npx cypress open
elif [ -n "$SPEC" ]; then
  echo "Running tests matching '$SPEC'..."
  docker-compose run --rm cypress npx cypress run --spec "cypress/e2e/**/*$SPEC*.cy.js"
else
  echo "Running all tests in headless mode..."
  docker-compose run --rm cypress
fi 