const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

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
  e2e: {
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
    
      const file = config.env.configFile || '';
      const fileConfig = await getConfigurationByFile(file);
    
      return { ...config, ...fileConfig };
    },
    specPattern: "cypress/e2e/**/*.{cy.js,cy.ts}",
    //excludeSpecPattern: "cypress/e2e/other/*.js",
    baseUrl: "https://app.pipedrive.com/",
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: false,
    videoUploadOnPasses: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json'
    },
    retries: {
      runMode: 0,
      openMode: 0
    },
    env: {
      webdriveruni_homepage: "https://app.pipedrive.com/",
    }
  },
});