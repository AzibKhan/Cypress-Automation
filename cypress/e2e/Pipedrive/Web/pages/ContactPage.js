class ContactPage {
    constructor() {
        this.TIMEOUTS = {
            DEFAULT: 10000,
            SHORT: 2000,
            LONG: 15000
        };
    }

    // Navigation Selectors
    get contactsLink() { return cy.get('a[aria-label="Contacts"]', { timeout: this.TIMEOUTS.DEFAULT }); }
    get peopleLink() { return cy.get('a[data-source="fe-root"]').contains('People'); }

    // Form Selectors
    get addButton() { return cy.get('button[data-test="add-entity"]'); }
    get nameInput() { return cy.get('[data-test-key="name"] input'); }
    get orgInput() { return cy.get('[data-test-key="org_id"] input'); }
    get addNewOrgButton() { return cy.get('[data-testid="entity-suggestion-add-new"]'); }
    get phoneInput() { return cy.get('[data-test-type="default_phone"] [data-testid="compound-input"]').first(); }
    get emailInput() { return cy.get('[data-test-type="email"] [data-testid="compound-input"]').first(); }
    get ownerSelect() { return cy.get('[data-test-key="owner_id"]'); }
    get ownerOption() { return cy.contains('Azib Khan (You)'); }
    get labelSelect() { return cy.get('[data-testid="labels-select"]'); }
    get customerLabel() { return cy.get(':nth-child(1) > :nth-child(1) > [data-testid="labels-option-badge"]'); }
    get hotLabel() { return cy.get(':nth-child(2) > :nth-child(1) > [data-testid="labels-option-badge"] > .ff_v11321__LabelsSelect-option__content__Kro > .cui5-label') }
    get warmLabel() { return cy.get(':nth-child(3) > :nth-child(1) > [data-testid="labels-option-badge"]'); }
    get coldLabel() { return cy.get(':nth-child(4) > :nth-child(1) > [data-testid="labels-option-badge"]'); }
    get addNewLabel() { return cy.get('[data-testid="labels-add-new-button"]'); }
    get newLabelName() { return cy.get('[data-testid="labels-edit-input"]'); }
    get selectNewLabel() { return cy.get(':nth-child(5) > :nth-child(1) > [data-testid="labels-option-badge"]'); }
    get newLabelSaveButton() { return cy.get('[data-testid="labels-save-button"] > .cui5-button__label'); }
    get saveButton() { return cy.contains('button', 'Save'); }
    
    // Delete Contact Selectors
    get selectAllCheckbox() { return cy.get('[data-cy="select-all"]'); }
    get deleteButton() { return cy.get('button#delete'); }
    get confirmDeleteButton() { return cy.contains('button', 'Delete') }
    get successMessage() { return cy.contains('deleted successfully'); }

    // Navigation Methods
    visit() {
        // Wait for page to be ready
        cy.get('body').should('be.visible');
        
        // Navigate to Contacts > People with retries
        cy.get('body').then($body => {
            if ($body.find('a[aria-label="Contacts"]').length === 0) {
                cy.reload();
                cy.wait(this.TIMEOUTS.SHORT);
            }
        });
        
        this.contactsLink.should('be.visible').click();
        cy.wait(1000); // Wait for submenu
        this.peopleLink.should('be.visible').click();
        
        // Wait for the page to load
        cy.get('body').should('be.visible');
        cy.wait(1000); // Additional wait for content
    }

    // Contact Creation Methods
    clickAddButton() {
        cy.wait(1000);
        this.addButton
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        this.nameInput.should('be.visible');
    }

    fillContactDetails(contactName, organization, phoneNumber, emailAddress) {
        this.fillNameField(contactName);
        this.fillOrganizationField(organization);
        this.fillPhoneField(phoneNumber);
        this.fillEmailField(emailAddress);
    }

    fillNameField(contactName) {
        if (!contactName) return;
        this.typeIntoField(this.nameInput, contactName);
    }

    fillOrganizationField(organization) {
        if (!organization) return;
        this.typeIntoField(this.orgInput, organization);
        cy.wait(500);
        this.addNewOrgButton.should('be.visible').click();
    }

    fillPhoneField(phoneNumber) {
        if (!phoneNumber) return;
        this.typeIntoField(this.phoneInput, phoneNumber);
    }

    fillEmailField(emailAddress) {
        if (!emailAddress) return;
        this.typeIntoField(this.emailInput, emailAddress);
    }

    typeIntoField(field, value) {
        field
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(value, { delay: 100 });
    }

    selectOwner() {
        cy.wait(500);
        this.ownerSelect.should('be.visible').click();
        this.ownerOption.should('be.visible').click();
    }

    // Label Methods
    addCustomerLabel() {
        cy.wait(500);
        this.labelSelect.should('be.visible').click();
        this.customerLabel.should('be.visible').click();
    }

    addHotLabel() {
        cy.wait(500);
        this.labelSelect.should('be.visible').click();
        this.hotLabel.should('be.visible').click();
    }

    addWarmLabel() {
        cy.wait(500);
        this.labelSelect.should('be.visible').click();
        this.warmLabel.should('be.visible').click();
    }

    addColdLabel() {
        cy.wait(500);
        this.labelSelect.should('be.visible').click();
        this.coldLabel.should('be.visible').click();
    }

    // Method for creating and adding a custom label
    addCustomLabel(labelName) {
        cy.wait(500);
        this.labelSelect.should('be.visible').click();
        this.addNewLabel.should('be.visible').click();
        this.newLabelName.should('be.visible').type(labelName);
        this.newLabelSaveButton.should('be.visible').click();
        // Wait for the new label to be added
        cy.wait(500);
        // Select the newly created label
        this.selectNewLabel.should('be.visible').click();
    }


    saveContact() {
        cy.wait(500);
        this.saveButton
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        cy.wait(1000);
    }

    // Contact Deletion Methods
    selectAllContacts() {
        // Wait for the page to be ready
        cy.wait(this.TIMEOUTS.SHORT);
        
        // Ensure checkbox is visible and clickable
        this.selectAllCheckbox
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        
        // Wait for selection to take effect
        cy.wait(1000);
    }

    clickDeleteAndConfirm() {
        // Click initial delete button
        this.deleteButton
            .should('be.visible')
            .should('not.be.disabled')
            .click();
            
        // Try to click the delete button in the dialog
        cy.get('body').then(() => {
            // Try different approaches to find and click the delete button
            cy.get('.cui5-dialog__actions button, button.cui5-button--variant-negative, button:contains("Delete")')
                .filter(':visible')
                .eq(1)
                .click({ force: true });
        });
    }

    deleteContact() {
        // Visit contacts page
        this.visit();

        // Select all contacts
        this.selectAllContacts();
    
        // Click delete and confirm
        this.clickDeleteAndConfirm();

        cy.wait(1000);
    
        // Verify success message
        cy.contains('deleted successfully', { timeout: 5000 }).should('be.visible');
    }

    // Verification Methods
    verifyContactCreation(contactName) {
        cy.contains(contactName, { timeout: this.TIMEOUTS.DEFAULT }).should('be.visible');
    }

    verifyValidationMessage(message) {
        cy.contains(message, { timeout: 5000 }).should('be.visible');
    }

    // Complete Workflows
    createContact(contactName, organization, phoneNumber, emailAddress) {
        this.clickAddButton();
        this.fillContactDetails(contactName, organization, phoneNumber, emailAddress);
        this.selectOwner();
        this.saveContact();
        this.verifyContactCreation(contactName);
    }
}

export default ContactPage;
