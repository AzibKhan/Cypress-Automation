# Pipedrive Cypress Automation Framework

This project contains automated tests for the Pipedrive application using Cypress.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- A Pipedrive account with valid credentials
- Git

## Detailed Project Structure

```
├── cypress/
│   ├── e2e/                    # Test files
│   │   └── Pipedrive/
│   │       └── Web/           # Web application tests
│   │           ├── pages/     # Page Object Models
│   │           │   ├── contactPage.js
│   │           │   └── loginPage.js
│   │           └── tests/     # Test Specifications
│   │               └── contact.cy.js
│   ├── fixtures/              # Test data
│   │   └── contactData.json
│   ├── support/               # Support files and custom commands
│   │   ├── commands.js       # Custom Cypress commands
│   │   └── e2e.js           # Support file for e2e tests
│   ├── reports/              # Test reports
│   │   └── mochawesome/     # Mochawesome reports
│   ├── screenshots/         # Test failure screenshots
│   └── videos/             # Test execution recordings
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       └── cypress-tests.yml
├── node_modules/          # Project dependencies
├── cypress.config.js      # Cypress configuration
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

## GitHub Actions Setup

### Required Secrets
Add these secrets to your GitHub repository:
- `CYPRESS_BASE_URL`: Pipedrive application URL
- `CYPRESS_EMAIL`: Pipedrive login email
- `CYPRESS_PASSWORD`: Pipedrive login password

### Workflow Configuration
The workflow (`cypress-tests.yml`) includes:
- Node.js v18 setup
- Dependency installation
- Test execution
- Report generation
- Artifact upload

### Dependencies
Key dependencies in `package.json`:
```json
{
  "dependencies": {
    "cypress": "^14.3.2",
    "cypress-mochawesome-reporter": "^3.0.0"
  },
  "devDependencies": {
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
npx cypress run --spec "cypress/e2e/Pipedrive/Web/contact.cy.js"

# Open Cypress Test Runner
npx cypress open
```

### CI/CD Pipeline
Tests run automatically on:
- Push to main/master branches
- Pull requests to main/master branches
- Manual workflow dispatch

## Test Reports

### Report Generation
```bash
# Generate reports
npm run generate:report

# Merge multiple reports
npm run merge:reports
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
rm -rf cypress/reports/*
rm -rf cypress/screenshots/*
rm -rf cypress/videos/*
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