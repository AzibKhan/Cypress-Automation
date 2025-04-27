Cypress.Commands.add('login', () => {
    cy.fixture('contactData').then((data) => {
        cy.session([data.email, data.password], () => {
            cy.visit('/auth/login');
            
            // Wait for the login form and fill credentials
            cy.get('#login').should('be.visible').type(data.email);
            cy.get('#password').should('be.visible').type(data.password);
            
            // Click login button and wait for navigation
            cy.get('button[type="submit"]').should('be.visible').click();
            
            // Verify successful login
            cy.url().should('include', '/pipeline');
        });
    });
});
