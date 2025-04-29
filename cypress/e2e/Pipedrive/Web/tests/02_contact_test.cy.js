import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/ContactPage';

describe('Pipedrive Contact Management', () => {
    let testData;
    const contactPage = new ContactPage();
    
    beforeEach(() => {
        // Handle uncaught exceptions
        Cypress.on('uncaught:exception', (err) => {
            // returning false here prevents Cypress from failing the test
            return false;
        });

        cy.fixture('contactData').then((data) => {
            testData = data;
            // Ensure testData is loaded before proceeding
            cy.wrap(testData).should('exist').then(() => {
                // Login process
                LoginPage.visit();
                LoginPage.fillEmail(testData.email);
                LoginPage.fillPassword(testData.password);
                LoginPage.submit();
                
                // Wait for successful login
                cy.url({ timeout: 30000 })
                    .should('include', '1/user/everyone')
                    .should('not.include', '/auth/login');
            });
        });
    });
    
    it('Should create a new contact with adding data in all fields successfully', () => {
        // Ensure we're starting fresh
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            contactPage.visit();
            
            // Use POM to click add button
            contactPage.clickAddButton();
            
            // Use POM to fill the contact form
            contactPage.fillContactDetails(testData.contactName, testData.organization, testData.phoneNumber, testData.emailaddress);
            
            // Use POM to select owner
            contactPage.selectOwner();
            
            // Use POM to add label (if needed)
            contactPage.addLabel();
            
            // Use POM to save contact
            contactPage.saveContact();
            
            // Verify successful creation with retry
            cy.contains(testData.contactName, { timeout: 10000 }).should('be.visible');
        });
    });
    
    it('Should show an error if the name field is empty', () => {
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            contactPage.visit();
            
            // Use POM to click add button
            contactPage.clickAddButton();
            
            // Fill form without name
            contactPage.fillContactDetails('', testData.organization, testData.phoneNumber, testData.emailaddress);
            
            // Submit the form
            contactPage.saveContact();
            
            // Verify error message with retry
            cy.contains('Name is required', { timeout: 5000 }).should('be.visible');
        });
    });
    
    it('Should show an error if the email format is invalid', () => {
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            contactPage.visit();
            
            // Use POM to click add button
            contactPage.clickAddButton();
            
            // Fill invalid email first
            contactPage.fillEmailField('invalid-email');
            
            // Fill other fields
            contactPage.fillNameField('John Doe');
            contactPage.fillOrganizationField(testData.organization);
            contactPage.fillPhoneField(testData.phoneNumber);
            
            // Click outside the email field to trigger validation
            cy.get('body').click(0, 0);
            
            // Verify error message
            cy.contains("Email is not valid").should('be.visible');
        });
    });
    
    it('Should show an error of the name field if all fields are empty', () => {
        cy.wrap(null).then(() => {
            // Use POM to navigate to Contacts > People
            contactPage.visit();
            
            // Use POM to click add button
            contactPage.clickAddButton();
            
            // Submit empty form
            contactPage.saveContact();
            
            // Verify error messages with retry
            cy.contains('Name is required', { timeout: 5000 }).should('be.visible');
        });
    });
    
    it('Should delete all the contacts', () => {
        cy.wrap(null).then(() => {
            // Use the Page Object Model to delete the contact
            contactPage.deleteContact();
        });
    });
    
    afterEach(() => {
        // Add a small delay and handle any potential errors
        cy.wait(1000).then(() => {
            // Clear any uncaught exceptions
            cy.on('uncaught:exception', () => false);
        });
    });
});