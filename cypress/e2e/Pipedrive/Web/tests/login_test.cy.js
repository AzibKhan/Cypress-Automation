import LoginPage from '../pages/LoginPage';

describe('Pipedrive Login Test', () => {
    beforeEach(() => {
        LoginPage.visit();
    });

    it('should login successfully', () => {
        LoginPage.fillEmail('azib.pipedrive@gmail.com');
        LoginPage.fillPassword('pipedrive1234');
        LoginPage.submit();

        cy.url().should('include', '1/user/everyone');
    });
});
