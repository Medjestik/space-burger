/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { selectors } from './selectors';

Cypress.Commands.add('dragIngredient', (index) => {
	cy.get(selectors.ingredient).eq(index).trigger('dragstart');
	cy.get(selectors.constructorContainer).trigger('drop');
});

Cypress.Commands.add('openModal', (index = 0) => {
	cy.get(selectors.ingredient).eq(index).click();
	cy.get(selectors.modal).should('exist');
});

Cypress.Commands.add('closeModalByButton', () => {
	cy.get(selectors.modalCloseButton).click();
	cy.get(selectors.modal).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
	cy.get(selectors.modalOverlay).click({ force: true });
	cy.get(selectors.modal).should('not.exist');
});

Cypress.Commands.add('closeModalByEsc', () => {
	cy.get('body').trigger('keydown', { key: 'Escape' });
	cy.get(selectors.modal).should('not.exist');
});
