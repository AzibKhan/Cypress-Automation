class ContactPage {
    // Selectors
    get contactsLink() { return cy.get('a[aria-label="Contacts"]', { timeout: 10000 }); }
    get peopleLink() { return cy.get('a[data-source="fe-root"]').contains('People'); }
    get addButton() { return cy.get('button[data-test="add-entity"]'); }
    get nameInput() { return cy.get('[data-test-key="name"] input'); }
    get orgInput() { return cy.get('[data-test-key="org_id"] input'); }
    get addNewOrgButton() { return cy.get('[data-testid="entity-suggestion-add-new"]'); }
    get phoneInput() { return cy.get('[data-test-type="default_phone"] [data-testid="compound-input"]').first(); }
    get emailInput() { return cy.get('[data-test-type="email"] [data-testid="compound-input"]').first(); }
    get ownerSelect() { return cy.get('[data-test-key="owner_id"]'); }
    get ownerOption() { return cy.contains('Azib Khan (You)'); }
    get labelSelect() { return cy.get('[data-testid="labels-select"]'); }
    get saveButton() { return cy.contains('button', 'Save'); }
    
    // Delete contact selectors
    get selectAllCheckbox() { return cy.get('label[data-cy="select-all"]').find('input[type="checkbox"]'); }
    get deleteButton() { return cy.get('[data-test="bulk-edit-delete-async"]'); }
    get confirmDeleteButton() { return cy.contains('button', 'Delete'); }
   // get searchInput() { return cy.get('input[placeholder="Search Pipedrive"]'); }
    get successMessage() { return cy.contains("deleted successfully"); }

    // Actions
    visit() {
        // Wait for page to be ready
        cy.get('body').should('be.visible');
        
        // Navigate to Contacts > People
        this.contactsLink.should('be.visible').click();
        this.peopleLink.should('be.visible').click();
        
        // Wait for the page to load
        cy.get('body').should('be.visible');
    }

    clickAddButton() {
        this.addButton.should('be.visible').click();
        // Wait for form to be visible
        cy.get('[data-test-key="name"]').should('be.visible');
    }

    fillContactForm(contactName, organization, phoneNumber, emailAddress) {
        if (contactName) {
            this.nameInput.should('be.visible').clear().type(contactName);
        }
        
        if (organization) {
            this.orgInput.should('be.visible').clear().type(organization);
            this.addNewOrgButton.should('be.visible').click();
        }
        
        if (phoneNumber) {
            this.phoneInput.should('be.visible').clear().type(phoneNumber);
        }
        
        if (emailAddress) {
            this.emailInput.should('be.visible').clear().type(emailAddress);
        }
    }

    selectOwner() {
        this.ownerSelect.should('be.visible').click();
        this.ownerOption.should('be.visible').click();
    }

    addLabel() {
        this.labelSelect.should('be.visible').click();
        // Click outside to close dropdown
        cy.get('body').click(0, 0);
    }

    saveContact() {
        this.saveButton.should('be.visible').click();
        // Wait for any potential error messages
        cy.wait(1000);
    }

    verifyContactCreation(contactName) {
        cy.contains(contactName, { timeout: 10000 }).should('be.visible');
    }

    verifyValidationMessage(message) {
        cy.contains(message, { timeout: 5000 }).should('be.visible');
    }
    
    // Delete contact actions
    selectAllContacts() {
        this.selectAllCheckbox.wait(1000).check({ force: true });
    }
    
    deleteSelectedContacts() {
        this.deleteButton.should('be.visible').click();
    }
    
    confirmDeletion() {
        this.confirmDeleteButton.should('be.visible').click();
    }
    
    verifyDeletionSuccess() {
        // Wait for the success message to appear
        cy.contains('deleted successfully', { timeout: 10000 }).should('be.visible');
    }
    
    verifyContactDeleted(contactName) {
        // Verify the contact is no longer visible
        cy.contains(contactName, { timeout: 5000 }).should('not.exist');
    }
    
    // Combined method for deleting contacts
    deleteContact() {
        this.visit();
        this.selectAllContacts();
        this.deleteSelectedContacts();
        this.confirmDeletion();
        this.verifyDeletionSuccess();
    }
}

export default new ContactPage();
