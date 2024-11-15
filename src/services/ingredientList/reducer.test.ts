import { initialState, ingredientListSlice } from './reducer';
import { getIngredientList } from './actions';
import { mockIngredient } from './mock';

describe('ingredientList reducer', () => {
	it('initializes correctly', () => {
		const state = ingredientListSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('getIngredientList fulfilled', () => {
		const action = {
			type: getIngredientList.fulfilled.type,
			payload: [mockIngredient, mockIngredient],
		};
		const state = ingredientListSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			ingredientList: [mockIngredient, mockIngredient],
			loading: false,
		});
	});

	it('getIngredientList pending', () => {
		const action = { type: getIngredientList.pending.type };
		const state = ingredientListSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('getIngredientList rejected', () => {
		const action = {
			type: getIngredientList.rejected.type,
			error: { message: 'Произошла ошибка' },
		};
		const state = ingredientListSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: false,
			error: 'Произошла ошибка',
		});
	});
});
