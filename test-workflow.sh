#!/bin/bash

# Test the GitHub Actions workflow locally
echo "Testing GitHub Actions Workflow"
echo "=============================="

# Build the Docker image
echo "Building Docker image..."
docker build -t cypress-workflow-test .

# Run the test
echo "Running workflow test..."
docker run --rm cypress-workflow-test npx cypress run --spec "cypress/e2e/Pipedrive/Web/tests/workflow-test.cy.js"

# Check the exit code
if [ $? -eq 0 ]; then
  echo "✅ Workflow test passed!"
  echo "You can now push these changes to GitHub to trigger the workflow."
else
  echo "❌ Workflow test failed. Please check the logs above."
  exit 1
fi 