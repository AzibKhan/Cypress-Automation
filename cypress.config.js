const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'mevvq9',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: 'cypress/reports/mochawesome',
    reportFilename: '[name]-[status]-[datetime]',
    timestamp: 'yyyy-mm-dd-HH-MM-ss',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    toConsole: true,
    quiet: false
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    specPattern: 'cypress/e2e/Pipedrive/Web/tests/[0-9]*_*.cy.js',
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://app.pipedrive.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    video: true,
    viewportHeight: 720,
    viewportWidth: 1280,
    retries: {
      runMode: 2,
      openMode: 0
    },
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos'
  },
});