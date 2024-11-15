import { selectors } from '../support/selectors';

describe('Burger constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
			'getUser'
		);
		cy.intercept('GET', 'api/ingredients', {
			fixture: 'ingredients.json',
		}).as('getIngredients');
		cy.intercept('POST', 'api/orders', { fixture: 'orderData.json' }).as(
			'createOrder'
		);

		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		);

		cy.visit('/');
	});

	it('should open a modal with ingredient details', function () {
		cy.openModal(0);
		cy.get(selectors.ingredientDetail)
			.contains('Краторная булка N-200i')
			.should('exist');
	});

	it('should open a modal and close by button', function () {
		cy.openModal(0);
		cy.closeModalByButton();
	});

	it('should open a modal and close by overlay', function () {
		cy.openModal(0);
		cy.closeModalByOverlay();
	});

	it('should open a modal and close by Esc', function () {
		cy.openModal(0);
		cy.closeModalByEsc();
	});

	it('should add bun to the constructor', () => {
		cy.dragIngredient(0);
		cy.get(
			selectors.constructorBunTop.replace('{id}', '643d69a5c3f7b9001cfa093c')
		).should('exist');
		cy.get(
			selectors.constructorBunBottom.replace('{id}', '643d69a5c3f7b9001cfa093c')
		).should('exist');
	});

	it('should add ingredient to the constructor', () => {
		cy.dragIngredient(2);
		cy.get(selectors.constructorIngredient)
			.contains('Соус Spicy-X')
			.should('exist');
	});

	it('should create order', () => {
		cy.dragIngredient(0);
		cy.dragIngredient(2);

		cy.get(selectors.orderButton).click({ force: true });

		cy.wait('@createOrder')
			.its('request.body')
			.should((body) => {
				expect(body).to.have.property('ingredients').and.to.be.an('array');
				expect(body.ingredients).to.include('643d69a5c3f7b9001cfa093c');
				expect(body.ingredients).to.include('643d69a5c3f7b9001cfa0942');
			});

		cy.get(selectors.modal).should('exist');
		cy.get(selectors.orderNumber).contains('1').should('exist');
	});
});
