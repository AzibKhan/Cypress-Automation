// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
require('cypress-xpath')
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// Ignore ResizeObserver errors globally
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('ResizeObserver')) {
      return false; // Prevent Cypress from failing the test
    }
  });