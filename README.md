# Pipedrive Cypress Automation

This repository contains Cypress automation tests for the Pipedrive application.

## Project Structure

```
cypress/
├── e2e/
│   └── Pipedrive/
│       └── Web/
│           ├── pages/           # Page Objects
│           │   ├── LoginPage.js
│           │   └── ContactPage.js
│           └── tests/           # Test Files
│               ├── 01_login_test.cy.js
│               └── 02_contact_test.cy.js
├── fixtures/
│   ├── contactData.json       # Test Data for Contacts
│   └── example.json          # Example Fixture Template
├── reports/
│   └── mochawesome/         # Test Reports Directory
├── screenshots/             # Failure Screenshots
├── videos/                  # Test Execution Recordings
└── support/
    └── e2e.js              # Support File
```

## Naming Conventions

- **Test Files**: Numbered prefix for execution order (e.g., `01_login_test.cy.js`)
- **Page Objects**: PascalCase (e.g., `LoginPage.js`, `ContactPage.js`)
- **Fixture Files**: camelCase (e.g., `contactData.json`)
- **Test Cases**: Descriptive names using camelCase
- **Selectors**: Meaningful names that describe the element's purpose

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome, Firefox, or Edge browser
- Jenkins (for CI/CD) or GitHub (for GitHub Actions)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pipedrive-cypress-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   CYPRESS_BASE_URL=https://app.pipedrive.com
   CYPRESS_EMAIL=your-email@example.com
   CYPRESS_PASSWORD=your-password
   ```

## Running Tests

### Test Execution Options

1. **Run All Tests in Order**:
   ```bash
   npm run test:all-ordered
   ```
   This will run login tests first, followed by other tests.

2. **Run Login Tests Only**:
   ```bash
   npm run test:login
   ```

3. **Run in Different Browsers**:
   ```bash
   npm run test:chrome     # Run in Chrome (headless)
   npm run test:firefox    # Run in Firefox (headless)
   npm run test:electron   # Run in Electron (headless)
   ```

4. **Open Cypress Test Runner**:
   ```bash
  npm run cypress:open
  ```

### Additional Scripts

- **Generate Test Reports**:
  ```bash
  npm run generate:all-reports
  ```

- **Clean Reports and Screenshots**:
  ```bash
  npm run clean:reports
  ```

## Test Reports

After running the tests, reports can be found in:
- `cypress/reports/mochawesome/` - HTML reports
- `cypress/videos/` - Test execution videos
- `cypress/screenshots/` - Failure screenshots

## CI/CD Integration

### GitHub Actions
Workflow defined in `.github/workflows/cypress-tests.yml`

Required secrets:
- `CYPRESS_BASE_URL`
- `CYPRESS_EMAIL`
- `CYPRESS_PASSWORD`

### Jenkins Pipeline
Pipeline configuration in `Jenkinsfile`

## Best Practices

1. **Test Organization**:
   - Tests are organized by feature
   - Numbered prefixes ensure correct execution order
   - Page Object Model pattern for better maintenance
   - Each test file focuses on a specific feature

2. **Data Management**:
   - Test data stored in fixture files
   - Sensitive data managed through environment variables
   - No hardcoded credentials in tests
   - Fixtures follow camelCase naming convention

3. **Error Handling**:
   - Proper error messages and assertions
   - Screenshots on failure
   - Video recordings of test runs
   - Detailed error reporting in Mochawesome reports

4. **Code Quality**:
   - Consistent naming conventions
   - Proper code formatting
   - Modular and reusable code
   - Clear and meaningful comments

## Maintenance

1. **Regular Updates**:
   - Keep dependencies up to date
   - Review and update test cases
   - Maintain documentation
   - Clean old reports and screenshots

2. **Version Control**:
   - Follow Git best practices
   - Meaningful commit messages
   - Regular backups
   - Branch management

## Troubleshooting

- If tests fail in CI but pass locally:
  - Check environment variables
  - Verify browser versions
  - Check network connectivity
  - Review test recordings and screenshots
  - Check Mochawesome reports for detailed error logs

## Contributing

1. Follow the established naming conventions
2. Use the Page Object Model pattern
3. Add appropriate test data to fixtures
4. Update documentation as needed
5. Run tests locally before pushing
6. Follow the Git workflow

## Support

For any issues or questions:
1. Check the troubleshooting guide
2. Review test reports and logs
3. Check CI/CD pipeline logs
4. Raise an issue in the repository 