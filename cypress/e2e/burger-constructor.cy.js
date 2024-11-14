describe('Burger constructor', () => {
	beforeEach(() => {
		cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as(
			"getUser",
		);
		cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as(
			"getIngredients",
		);
		cy.intercept("POST", "api/orders", { fixture: "orderData.json" }).as(
			"createOrder",
		);

		window.localStorage.setItem(
			"refreshToken",
			JSON.stringify("test-refreshToken"),
		);
		window.localStorage.setItem(
			"accessToken",
			JSON.stringify("test-accessToken"),
		);

		cy.visit('http://localhost:8080')
	});

	it('should open a modal with ingredient details', function () {
		cy.get('[data-testid=ingredient]').first().click();
    cy.get('[data-testid=ingredient-detail]').contains('Краторная булка N-200i').should('exist');
	})

	it('should open a modal and close by button', function () {
		cy.get('[data-testid=ingredient]').first().click();
		cy.get('[data-testid=modal]').should('exist');
		cy.get('[data-testid=modal-close-button]').click();
		cy.get('[data-testid=modal]').should('not.exist');
	})

	it('should open a modal and close by overlay', function () {
		cy.get('[data-testid=ingredient]').first().click();
		cy.get('[data-testid=modal]').should('exist');
		cy.get('[data-testid=modal-overlay]').click({ force: true });;
		cy.get('[data-testid=modal]').should('not.exist');
	})

	it('should open a modal and close by Esc', function () {
		cy.get('[data-testid=ingredient]').first().click();
		cy.get('[data-testid=modal]').should('exist');
		cy.get('body').trigger('keydown', { key: 'Escape' });
		cy.get('[data-testid=modal]').should('not.exist');
	})

	it("should add bun to the constructor", () => {
		cy.get('[data-testid=ingredient]').first().trigger('dragstart');
		cy.get('[data-testid=constructor-container]').trigger('drop');
		cy.get(`[data-testid=constructor-bun-top-643d69a5c3f7b9001cfa093c]`).should('exist');
		cy.get(`[data-testid=constructor-bun-bottom-643d69a5c3f7b9001cfa093c]`).should('exist');
  });

	it("should add ingredient to the constructor", () => {
		cy.get('[data-testid=ingredient]').eq(2).trigger('dragstart');
		cy.get('[data-testid=constructor-container]').trigger('drop');
		cy.get(`[data-testid=constructor-ingredient]`).contains('Соус Spicy-X').should('exist');
  });

	it("should create order", () => {
		cy.get('[data-testid=ingredient]').first().trigger('dragstart');
		cy.get('[data-testid=constructor-container]').trigger('drop');
		cy.get('[data-testid=ingredient]').eq(2).trigger('dragstart');
		cy.get('[data-testid=constructor-container]').trigger('drop');
		cy.get('[data-testid=order-button]').click({ force: true });
		cy.get('[data-testid=modal]').should('exist');
		cy.get('[data-testid=order-number]').contains('1').should('exist');
  });
})
