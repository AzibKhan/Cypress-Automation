const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.join('cypress', 'config', `${file}.json`);

  if(!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

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
    saveAllAttempts: false
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      const file = config.env.configFile || '';
      const fileConfig = getConfigurationByFile(file);
    
      return { ...config, ...fileConfig };
    },
    specPattern: "cypress/e2e/**/*.{cy.js,cy.ts}",
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://app.pipedrive.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: true,
    viewportHeight: 720,
    viewportWidth: 1280,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      webdriveruni_homepage: "https://app.pipedrive.com/",
      email: "azib.pipedrive@gmail.com",
      password: "pipedrive1234",
    }
  },
});