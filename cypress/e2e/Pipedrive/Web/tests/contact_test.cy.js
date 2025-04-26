import LoginPage from '../pages/LoginPage';

describe('Pipedrive Login Test', () => {
    let testData;

    beforeEach(() => {
        cy.fixture('contactData').then((data) => {
            testData = data;
        }).then(() => {
            LoginPage.visit();
            LoginPage.fillEmail(testData.email);
            LoginPage.fillPassword(testData.password);
            LoginPage.submit();
            
            cy.url().should('include', '1/user/everyone');
        });
    });

    it('Create contact', () => {
        cy.get('a[aria-label="Contacts"]').should('be.visible').click();
        cy.get('button[data-test="add-entity"]').should('be.visible').click();
        cy.wait(5000);
        cy.get('div.cui5-input__box input').eq(1).should('be.visible').type(testData.contactName);
        cy.wait(5000);
        // cy.get("//input[@type='text']").should('be.visible').type(testData.contactName);
        // cy.wait(5000);
     //   cy.get('div[data-test-type="varchar"] input')

        cy.get('svg.cui5-select__toggle').scrollIntoView().should('be.visible').click();
        cy.contains(testData.owner).should('be.visible').click();
        cy.get('downshift-0-input').should('be.visible').click().type(testData.address);
        cy.get('svg.cui5-select__toggle').scrollIntoView().should('be.visible').click();
        cy.contains(testData.contactType).should('be.visible').click();
        cy.get('body').type('{esc}');
        cy.contains('span', 'Save').click();
        // cy.get("//div[@class='cui5-button-group cui5-split-button']").click();
        // cy.get("#downshift-2-input").type(testData.contactperson);
        // cy.get("#downshift-3-input").type(testData.contactName);
        // cy.get('input[type="text"]').type(testData.tittle);
        // cy.get('[data-testid="compound-input"]').type(testData.value);
        





    });
});
