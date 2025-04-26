class LoginPage {
    visit() {
        cy.visit("/auth/login");
    }

    fillEmail(email) {
        cy.get("#login").type(email);
    }

    fillPassword(password) {
        cy.get("#password").type(password);
    }

    submit() {
        cy.get('.login > .puco-button > span').click();
    }
}

export default new LoginPage();
