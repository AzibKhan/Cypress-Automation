# Pipedrive Cypress Automation Framework

This project contains automated tests for the Pipedrive application using Cypress.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- A Pipedrive account with valid credentials
- Git
- Docker (for Docker-based testing)

## Detailed Project Structure

```
├── cypress/
│   ├── e2e/                    # Test files
│   │   └── Pipedrive/
│   │       └── Web/           # Web application tests
│   │           ├── pages/     # Page Object Models
│   │           │   ├── ContactPage.js
│   │           │   └── LoginPage.js
│   │           └── tests/     # Test Specifications
│   │               ├── 01_login_test.cy.js
│   │               └── 02_contact_test.cy.js
│   ├── fixtures/              # Test data
│   ├── support/               # Support files and custom commands
│   ├── reports/              # Test reports
│   │   └── mochawesome/     # Mochawesome reports
│   ├── screenshots/         # Test failure screenshots
│   └── videos/             # Test execution recordings
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       └── consolidated-workflow.yml  # Consolidated workflow for Docker-based testing
├── node_modules/          # Project dependencies
├── cypress.config.js      # Cypress configuration
├── cypress.env.json       # Cypress environment variables
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── .dockerignore         # Docker ignore file
├── run-cypress-docker.sh # Docker helper script
├── package.json          # Project metadata and scripts
├── package-lock.json     # Dependency lock file
└── README.md            # Project documentation
```

## Detailed Setup Instructions

1. **Clone the Repository**:
```bash
git clone <repository-url>
cd Cypress-Automation
```

2. **Install Dependencies**:
```bash
# Install all dependencies
npm ci

# Verify Cypress installation
npx cypress verify
```

3. **Environment Setup**:
Create a `cypress.env.json` file in the root directory:
```json
{
    "email": "your-pipedrive-email",
    "password": "your-pipedrive-password",
    "BASE_URL": "https://app.pipedrive.com"
}
```

4. **Verify Installation**:
```bash
# Open Cypress Test Runner
npx cypress open

# Run a test in headless mode
npx cypress run
```

## Docker Setup

### Prerequisites
- Docker Desktop installed and running
- Docker Compose installed

### Running Tests with Docker

1. **Using the Helper Script**:
```bash
# Run all tests in headless mode
./run-cypress-docker.sh

# Open Cypress UI in Docker
./run-cypress-docker.sh --open

# Run tests matching a specific pattern
./run-cypress-docker.sh --spec login

# Show help
./run-cypress-docker.sh --help
```

2. **Using Docker Compose Directly**:
```bash
# Build the Docker image
docker-compose build

# Run tests
docker-compose run --rm cypress

# Run a specific test file
docker-compose run --rm cypress npx cypress run --spec "cypress/e2e/Pipedrive/Web/tests/01_login_test.cy.js"
```

3. **Using npm Scripts**:
```bash
# Build Docker image
npm run docker:build

# Run tests in Docker
npm run docker:run

# Open Cypress UI in Docker
npm run docker:open

# Run tests using the helper script
npm run docker:test

# Run login tests only
npm run docker:test:login
```

4. **Viewing Test Results**:
Test results, screenshots, and videos will be available in your local project directory as they are mounted as volumes.

### Docker Configuration
- `Dockerfile`: Defines the Cypress environment
- `docker-compose.yml`: Configures the service and volumes
- `.dockerignore`: Excludes unnecessary files from the build
- `run-cypress-docker.sh`: Helper script for running tests with Docker

### Docker CI/CD Integration
The project includes a GitHub Actions workflow (`consolidated-workflow.yml`) that uses Docker to run tests in CI/CD:
- Builds the Docker image with caching
- Runs the tests
- Generates and uploads test reports and artifacts
- Includes a quick test job for manual verification

## GitHub Actions Setup

### Required Secrets
Add these secrets to your GitHub repository:
- `CYPRESS_BASE_URL`: Pipedrive application URL
- `CYPRESS_EMAIL`: Pipedrive login email
- `CYPRESS_PASSWORD`: Pipedrive login password

### Workflow Configuration
The consolidated workflow (`consolidated-workflow.yml`) includes:
- Docker Buildx setup with caching
- Docker image building
- Test execution in Docker
- Report generation
- Artifact upload
- Quick test job for manual verification

### Dependencies
Key dependencies in `package.json`:
```json
{
  "devDependencies": {
    "cypress": "^v14.3.2",
    "cypress-mochawesome-reporter": "^3.5.1",
    "cypress-xpath": "^2.0.1",
    "mochawesome": "^7.1.3",
    "mochawesome-merge": "^4.3.0",
    "mochawesome-report-generator": "^6.2.0"
  }
}
```

## Running Tests

### Local Development
```bash
# Run all tests in Chrome
npm run test:chrome

# Run specific test file
npx cypress run --spec "cypress/e2e/Pipedrive/Web/tests/01_login_test.cy.js"

# Open Cypress Test Runner
npx cypress open
```

### CI/CD Pipeline
Tests run automatically on:
- Push to main/master/test branches
- Pull requests to main/master/test branches
- Manual workflow dispatch

## Test Reports

### Report Generation
```bash
# Generate reports
npm run generate:report

# Merge multiple reports
npm run merge:reports

# Generate all reports
npm run generate:all-reports
```

### Report Location
- HTML reports: `cypress/reports/mochawesome/`
- Screenshots: `cypress/screenshots/`
- Videos: `cypress/videos/`

## Best Practices

1. **Test Organization**:
   - Tests are organized by feature
   - Page Object Model pattern for better maintenance
   - Each test file focuses on a specific feature

2. **Data Management**:
   - Test data stored in fixture files
   - Sensitive data managed through environment variables
   - No hardcoded credentials in tests

3. **Error Handling**:
   - Proper error messages and assertions
   - Screenshots on failure
   - Video recordings of test runs
   - Detailed error reporting

## Troubleshooting

### Common Issues
1. **Login Failures**:
   - Verify environment variables
   - Check network connectivity
   - Ensure correct credentials

2. **Test Failures**:
   - Check test reports
   - Review screenshots
   - Verify selectors
   - Check application state

3. **CI/CD Issues**:
   - Verify GitHub secrets
   - Check workflow logs
   - Ensure proper permissions

### Debug Tools
- Cypress Debug Logs: `DEBUG=cypress:*`
- Network Logs: Chrome DevTools
- Test Reports: Mochawesome
- Screenshots: `cypress/screenshots`

## Maintenance

### Regular Tasks
1. Update dependencies:
```bash
npm update
```

2. Clean reports:
```bash
npm run clean:reports
```

3. Verify tests:
```bash
npx cypress verify
```

### Version Control
- Follow Git flow branching model
- Use meaningful commit messages
- Keep feature branches updated
- Regular merges to main branch

## Support

For issues or questions:
1. Check troubleshooting guide
2. Review test reports
3. Check CI/CD logs
4. Create GitHub issue

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 