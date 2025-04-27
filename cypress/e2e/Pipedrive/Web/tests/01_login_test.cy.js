import LoginPage from '../pages/LoginPage';

describe('Pipedrive Login Test', () => {
    let userData;

    beforeEach(() => {
        cy.fixture('ContactDAta').then((data) => {
            userData = data;
            LoginPage.visit();
        });
    });

    it('should show error for invalid email format', () => {
        LoginPage.fillEmail('invalid-email');
        LoginPage.fillPassword(userData.password);
        LoginPage.submit();
        cy.contains('Please add a valid email address').should('be.visible');
    });

    it('should show error for empty email', () => {
        LoginPage.fillPassword(userData.password);
        LoginPage.submit();
        cy.contains('Please add your email').should('be.visible');
    });

    it('should show error for empty password', () => {
        LoginPage.fillEmail(userData.email);
        LoginPage.submit();
        cy.contains('Please add your password').should('be.visible');
    });

    it('should show error for incorrect credentials', () => {
        LoginPage.fillEmail(userData.email);
        LoginPage.fillPassword('wrongpassword');
        LoginPage.submit();
        cy.contains('Incorrect email or password').should('be.visible');
    });

    it('should show error when both fields are empty', () => {
        LoginPage.submit();
        cy.contains('Please add your email').should('be.visible');
        cy.contains('Please add your password').should('be.visible');
    });

    it('User should login successfully', () => {
        LoginPage.fillEmail(userData.email);
        LoginPage.fillPassword(userData.password);
        LoginPage.submit();
        cy.url().should('include', '1/user/everyone');
    });
});
