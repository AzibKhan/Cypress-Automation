import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/contactPage';

describe('Pipedrive Contact Management', () => {
    let testData;

    before(() => {
        // Load test data from fixture before all tests
        cy.fixture('contactData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Ensure testData is loaded before proceeding
        cy.wrap(testData).should('exist').then(() => {
            // Login process
            LoginPage.visit();
            LoginPage.fillEmail(testData.email);
            LoginPage.fillPassword(testData.password);
            LoginPage.submit();
            
            // Wait for successful login
            cy.url().should('not.include', '/auth/login', { timeout: 20000 });
            cy.get('body').should('be.visible');
            
            // Additional wait to ensure dashboard is fully loaded
            cy.wait(2000);
        });
    });

    afterEach(() => {
        // Wait for any pending operations to complete
        cy.wait(1000);
    });

    it('Should create a new contact with adding data in all fields successfully', () => {
        // Ensure we're starting fresh
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            ContactPage.visit();

            // Use POM to click add button
            ContactPage.clickAddButton();

            // Use POM to fill the contact form
            ContactPage.fillContactForm(testData.contactName, testData.organization, testData.phoneNumber, testData.emailaddress);

            // Use POM to select owner
            ContactPage.selectOwner();

            // Use POM to add label (if needed)
            ContactPage.addLabel();

            // Use POM to save contact
            ContactPage.saveContact();

            // Verify successful creation with retry
            cy.contains(testData.contactName, { timeout: 10000 }).should('be.visible');
        });
    });

    it('Should show an error if the name field is empty', () => {
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            ContactPage.visit();

            // Use POM to click add button
            ContactPage.clickAddButton();

            // Fill form without name
            ContactPage.fillContactForm('', testData.organization, testData.phoneNumber, testData.emailaddress);

            // Submit the form
            ContactPage.saveContact();

            // Verify error message with retry
            cy.contains('Name is required', { timeout: 5000 }).should('be.visible');
        });
    });

    it('Should show an error if the email format is invalid', () => {
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            ContactPage.visit();

            // Use POM to click add button
            ContactPage.clickAddButton();

            // Fill form with invalid email
            ContactPage.fillContactForm('John Doe', testData.organization, testData.phoneNumber, 'invalid-email');

            // Submit the form
            ContactPage.saveContact();

            // Verify error message with retry
            cy.contains("Email is not valid", { timeout: 5000 }).should('be.visible');
        });
    });

    it('Should show an error of the first field if all fields are empty', () => {
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            ContactPage.visit();

            // Use POM to click add button
            ContactPage.clickAddButton();

            // Submit empty form
            ContactPage.saveContact();

            // Verify error messages with retry
            cy.contains('Name is required', { timeout: 5000 }).should('be.visible');
        });
    });

    it('Should delete the contact created', () => {
        cy.wrap(null).then(() => {
            // Use the Page Object Model to delete the contact
            ContactPage.deleteContact();
        });
    });
});
