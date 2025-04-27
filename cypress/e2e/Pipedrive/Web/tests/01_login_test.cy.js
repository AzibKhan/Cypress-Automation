import LoginPage from '../pages/LoginPage';

describe('Pipedrive Login Test', () => {
    let userData;
    // Load user data before each test
    beforeEach(() => {
        cy.fixture('contactData').then((data) => {
            userData = data;
            LoginPage.visit();
        });
    });

    // Test for invalid email format
    it('should show error for invalid email format', () => {
        LoginPage.fillEmail('invalid-email');
        LoginPage.fillPassword(userData.password);
        LoginPage.submit();
        cy.contains('Please add a valid email address').should('be.visible');
    });

        // Test for empty email field
    it('should show error for empty email', () => {
        LoginPage.fillPassword(userData.password);
        LoginPage.submit();
        cy.contains('Please add your email').should('be.visible');
    });

    // Test for empty password field    
    it('should show error for empty password', () => {
        LoginPage.fillEmail(userData.email);
        LoginPage.submit();
        cy.contains('Please add your password').should('be.visible');
    });
    // Test for incorrect credentials
    it('should show error for incorrect credentials', () => {
        LoginPage.fillEmail(userData.email);
        LoginPage.fillPassword('wrongpassword');
        LoginPage.submit();
        cy.contains('Incorrect email or password').should('be.visible');
    });
    // Test for both fields empty
    it('should show error when both fields are empty', () => {
        LoginPage.submit();
        cy.contains('Please add your email').should('be.visible');
        cy.contains('Please add your password').should('be.visible');
    });
    // Test for successful login    
    it('User should login successfully', () => {
        LoginPage.fillEmail(userData.email);
        LoginPage.fillPassword(userData.password);
        LoginPage.submit();
        cy.url().should('include', '1/user/everyone');
    });
});
