describe('Pokemon Search Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Application Loading', () => {
    it('should load the application successfully', () => {
      cy.contains('pokedemo').should('be.visible');
    });

    it('should display the search form with all inputs', () => {
      cy.get('mat-form-field').should('have.length.at.least', 4);
      cy.get('mat-label').contains('Pokemon ID').should('be.visible');
      cy.get('mat-label').contains('Filter').should('be.visible');
      cy.get('mat-label').contains('Choisir un pokemon').should('be.visible');
    });

    it('should display the Go button', () => {
      cy.get('button[mat-mini-fab]').should('be.visible');
    });
  });

  describe('Search Pokemon by ID', () => {
    it('should search for a pokemon by ID (Pikachu - ID 25)', () => {
      // Enter Pokemon ID in the first input field
      cy.get('.pokemons-id-input input').type('25', { delay: 100 });
      
      // Click the Go button
      cy.get('button[mat-mini-fab]').click();
      
      // Wait for the API response and verify the pokemon card appears
      cy.contains('Pikachu', { timeout: 5000 }).should('be.visible');
      cy.contains('ID: 25').should('be.visible');
      
      // Verify pokemon details are displayed
      cy.contains('Taille').should('be.visible');
      cy.contains('Poids').should('be.visible');
    });

    it('should search for another pokemon (Charizard - ID 6)', () => {
      cy.get('.pokemons-id-input input').type('6', { delay: 100 });
      cy.get('button[mat-mini-fab]').click();
      
      cy.contains('Charizard', { timeout: 5000 }).should('be.visible');
      cy.contains('ID: 6').should('be.visible');
    });

    it('should display pokemon image when search is successful', () => {
      cy.get('.pokemons-id-input input').type('4', { delay: 100 });
      cy.get('button[mat-mini-fab]').click();
      
      // Wait for the image to be displayed
      cy.get('img[mat-card-image]', { timeout: 5000 }).should('be.visible');
      cy.get('img[mat-card-image]').should('have.attr', 'src').and('not.be.empty');
    });

    it('should search using Enter key', () => {
      cy.get('.pokemons-id-input input').type('1{enter}', { delay: 100 });
      
      // Wait for the result
      cy.contains('Bulbasaur', { timeout: 5000 }).should('be.visible');
      cy.contains('ID: 1').should('be.visible');
    });
  });

  describe('Filter Pokemon by Name', () => {
    it('should filter pokemons by name', () => {
      // Type in the filter field
      cy.get('.pokemons-Filter-input input').type('bulba', { delay: 50 });
      
      // Open the dropdown
      cy.get('mat-select').click();
      
      // Should show bulbasaur in the options
      cy.contains('1 - Bulbasaur').should('be.visible');
    });

    it('should filter multiple pokemons', () => {
      cy.get('.pokemons-Filter-input input').type('char', { delay: 50 });
      cy.get('mat-select').click();
      
      // Should find options containing 'char'
      cy.get('mat-option').should('have.length.greaterThan', 0);
    });
  });

  describe('Select Pokemon from Dropdown', () => {
    it('should select a pokemon from the dropdown and display it', () => {
      // Open the dropdown
      cy.get('mat-select').click();
      
      // Click on a pokemon option (skip the first empty option)
      cy.get('mat-option').eq(1).click({ force: true });
      
      // Click Go button to fetch pokemon info
      cy.get('button[mat-mini-fab]').click();
      
      // Verify that a pokemon card is displayed with content
      cy.get('mat-card-title', { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Readonly ID Field', () => {
    it('should update readonly field when selecting from dropdown', () => {
      cy.get('mat-select').click();
      cy.get('mat-option').eq(1).click({ force: true });
      
      // Wait for the selection to update and close the dropdown
      cy.get('mat-select').should('not.have.class', 'mat-focused');
      
      // The readonly field should have a numeric value
      cy.get('.pokemons-id-readonly input').invoke('val').should('match', /^\d+$/);
    });
  });

  describe('Complete User Journey', () => {
    it('should allow user to search, filter, and view pokemon details', () => {
      // Step 1: Use filter to find a specific pokemon
      cy.get('.pokemons-Filter-input input').type('pikachu', { delay: 50 });
      
      // Step 2: Open dropdown and select
      cy.get('mat-select').click();
      cy.contains('25 - Pikachu').click({ force: true });
      
      // Step 3: Click search
      cy.get('button[mat-mini-fab]').click();
      
      // Step 4: Verify all details are displayed
      cy.get('mat-card-title', { timeout: 5000 }).should('be.visible');
      cy.contains('Pikachu').should('be.visible');
      cy.contains('Taille').should('be.visible');
      cy.get('img[mat-card-image]').should('be.visible');
    });

    it('should clear search and show empty state', () => {
      // Search for a pokemon
      cy.get('.pokemons-id-input input').type('25', { delay: 100 });
      cy.get('button[mat-mini-fab]').click();
      
      // Wait for result to appear
      cy.contains('Pikachu', { timeout: 5000 }).should('be.visible');
      
      // Click close button
      cy.contains('button', 'Fermer').click();
      
      // Verify the empty state message appears
      cy.contains('Aucun Pokémon sélectionné').should('be.visible');
    });
  });
});
