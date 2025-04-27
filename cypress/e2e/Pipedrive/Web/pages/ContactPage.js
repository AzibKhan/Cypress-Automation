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
    get successMessage() { return cy.contains("deleted successfully"); }

    // Actions
    visit() {
        // Wait for page to be ready
        cy.get('body').should('be.visible');
        
        // Navigate to Contacts > People with retries
        cy.get('body').then($body => {
            if ($body.find('a[aria-label="Contacts"]').length === 0) {
                cy.reload();
                cy.wait(2000);
            }
        });
        
        this.contactsLink.should('be.visible').click();
        cy.wait(1000); // Wait for submenu
        this.peopleLink.should('be.visible').click();
        
        // Wait for the page to load
        cy.get('body').should('be.visible');
        cy.wait(1000); // Additional wait for content
    }

    clickAddButton() {
        // Ensure the button is clickable
        cy.wait(1000);
        this.addButton.should('be.visible').should('not.be.disabled').click();
        // Wait for form to be visible
        cy.get('[data-test-key="name"]').should('be.visible');
    }

    fillContactForm(contactName, organization, phoneNumber, emailAddress) {
        // Fill name with retry if needed
        if (contactName) {
            this.nameInput.should('be.visible').should('be.enabled')
                .clear()
                .type(contactName, { delay: 100 });
        }
        
        // Fill organization with retry
        if (organization) {
            this.orgInput.should('be.visible').should('be.enabled')
                .clear()
                .type(organization, { delay: 100 });
            cy.wait(500); // Wait for suggestions
            this.addNewOrgButton.should('be.visible').click();
        }
        
        // Fill phone with retry
        if (phoneNumber) {
            this.phoneInput.should('be.visible').should('be.enabled')
                .clear()
                .type(phoneNumber, { delay: 100 });
        }
        
        // Fill email with retry
        if (emailAddress) {
            this.emailInput.should('be.visible').should('be.enabled')
                .clear()
                .type(emailAddress, { delay: 100 });
        }
    }

    selectOwner() {
        cy.wait(500); // Wait for dropdown to be ready
        this.ownerSelect.should('be.visible').click();
        this.ownerOption.should('be.visible').click();
    }

    addLabel() {
        cy.wait(500); // Wait for dropdown to be ready
        this.labelSelect.should('be.visible').click();
        // Click outside to close dropdown
        cy.get('body').click(0, 0);
    }

    saveContact() {
        cy.wait(500); // Wait for form to be ready
        this.saveButton.should('be.visible').should('not.be.disabled').click();
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
        cy.wait(1000); // Wait for list to load
        this.selectAllCheckbox.should('be.visible').check({ force: true });
    }
    
    deleteSelectedContacts() {
        cy.wait(500); // Wait for selection to register
        this.deleteButton.should('be.visible').should('not.be.disabled').click();
    }
    
    confirmDeletion() {
        cy.wait(500); // Wait for modal
        this.confirmDeleteButton.should('be.visible').should('not.be.disabled').click();
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
        cy.wait(1000); // Wait for page to be fully loaded
        this.selectAllContacts();
        this.deleteSelectedContacts();
        this.confirmDeletion();
        this.verifyDeletionSuccess();
    }
}

export default new ContactPage();
