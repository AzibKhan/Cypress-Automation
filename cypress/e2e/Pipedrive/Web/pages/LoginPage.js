class LoginPage {
    visit() {
        // Visit the login page
        cy.visit("/auth/login");
    }
    // Fill the email field
    fillEmail(email) {
        cy.get("#login").type(email);
    }
    // Fill the password field
    fillPassword(password) {
        cy.get("#password").type(password);
    }
    // Click the login button
    submit() {
        cy.get('.login > .puco-button > span').click();
    }
}

export default new LoginPage();
