import {
	initialState,
	burgerConstructorSlice,
	addBun,
	addIngredient,
	removeIngredient,
	sortIngredients,
	clearConstructor,
} from './reducer';
import { mockBun, mockIngredient } from './mock';

describe('burgerConstructor reducer', () => {
	it('initializes correctly', () => {
		const state = burgerConstructorSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('addBun', () => {
		const action = { type: addBun.type, payload: mockBun };
		const state = burgerConstructorSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			bun: mockBun,
		});
	});

	it('addIngredient', () => {
		const action = { type: addIngredient.type, payload: mockIngredient };
		const state = burgerConstructorSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			ingredients: [mockIngredient],
		});
	});

	it('removeIngredient', () => {
		const previousState = {
			...initialState,
			ingredients: [mockIngredient],
		};
		const action = {
			type: removeIngredient.type,
			payload: mockIngredient.uuid,
		};
		const state = burgerConstructorSlice.reducer(previousState, action);
		expect(state).toEqual(initialState);
	});

	it('should handle sortIngredients', () => {
		const ingredient1 = { ...mockIngredient, uuid: '1' };
		const ingredient2 = { ...mockIngredient, uuid: '2' };
		const ingredient3 = { ...mockIngredient, uuid: '3' };

		const previousState = {
			...initialState,
			ingredients: [ingredient1, ingredient2, ingredient3],
		};

		const action = {
			type: sortIngredients.type,
			payload: { fromIndex: 0, toIndex: 2 },
		};

		const state = burgerConstructorSlice.reducer(previousState, action);
		expect(state.ingredients).toEqual([ingredient2, ingredient3, ingredient1]);
	});

	it('clearConstructor', () => {
		const previousState = {
			bun: mockBun,
			ingredients: [mockIngredient],
		};
		const action = { type: clearConstructor.type };
		const state = burgerConstructorSlice.reducer(previousState, action);
		expect(state).toEqual(initialState);
	});
});
