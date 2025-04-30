const { defineConfig } = require("cypress");
const mochawesome = require('cypress-mochawesome-reporter/plugin');

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
    quiet: false,
    jsonDir: 'cypress/reports/mochawesome/.jsons'
  },
  e2e: {
    setupNodeEvents(on, config) {
      try {
        // Register the Mochawesome reporter plugin
        mochawesome(on);

        // Add task for logging
        on('task', {
          log(message) {
            console.log(message);
            return null;
          }
        });

        // Add task for handling errors
        on('task', {
          error(message) {
            console.error(message);
            return null;
          }
        });

        // Ensure required directories exist
        const fs = require('fs');
        const path = require('path');
        
        const dirs = [
          'cypress/reports/mochawesome',
          'cypress/reports/mochawesome/.jsons',
          'cypress/screenshots',
          'cypress/videos'
        ];

        dirs.forEach(dir => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
        });

        // Verify plugin installation
        try {
          require.resolve('cypress-mochawesome-reporter/plugin');
          console.log('Mochawesome reporter plugin found');
        } catch (error) {
          console.error('Mochawesome reporter plugin not found. Installing...');
          const { execSync } = require('child_process');
          execSync('npm install cypress-mochawesome-reporter --save-dev', { stdio: 'inherit' });
        }

        return config;
      } catch (error) {
        console.error('Error in setupNodeEvents:', error);
        throw error;
      }
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
    videosFolder: 'cypress/videos',
    env: {
      reporterEnabled: true,
      screenshotsFolder: 'cypress/screenshots',
      videosFolder: 'cypress/videos'
    }
  },
  browserLaunchOptions: {
    args: [
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--enable-unsafe-swiftshader',
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ],
  }
});