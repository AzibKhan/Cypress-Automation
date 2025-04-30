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
    quiet: false,
    jsonDir: 'cypress/reports/mochawesome/.jsons'
  },
  e2e: {
    setupNodeEvents(on, config) {
      try {
        // Verify plugin installation
        const pluginPath = require.resolve('cypress-mochawesome-reporter/plugin');
        console.log('Mochawesome reporter plugin found at:', pluginPath);
        
        // Register the Mochawesome reporter plugin
        require(pluginPath)(on);

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
            console.log(`Created directory: ${dir}`);
          }
        });

        return config;
      } catch (error) {
        console.error('Error in setupNodeEvents:', error);
        // Attempt to install the plugin if missing
        if (error.code === 'MODULE_NOT_FOUND') {
          console.log('Attempting to install cypress-mochawesome-reporter...');
          const { execSync } = require('child_process');
          try {
            execSync('npm install cypress-mochawesome-reporter@3.5.0 --save-dev', { stdio: 'inherit' });
            console.log('Plugin installed successfully');
            // Retry plugin registration
            require('cypress-mochawesome-reporter/plugin')(on);
          } catch (installError) {
            console.error('Failed to install plugin:', installError);
            throw installError;
          }
        }
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