#!/bin/bash

# Clean previous reports
echo "Cleaning previous reports..."
npm run clean:reports

# Run tests in all browsers
echo "Running tests in all browsers..."
npm run test:all-browsers

# Merge reports
echo "Merging reports..."
npm run merge:reports

# Generate final HTML report
echo "Generating HTML report..."
npm run generate:report

echo "Test execution completed! Open cypress/reports/output.html to view the report." 