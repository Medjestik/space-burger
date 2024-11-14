import {
	initialState,
	closeCreateOrderModal,
	burgerOrderSlice,
} from './reducer';
import { createBurgerOrder, getOrderByNumber } from './actions';
import { mockOrderData, mockOrderByNumberResponse } from './mock';

describe('burgerOrder reducer', () => {
	it('initializes correctly', () => {
		const state = burgerOrderSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('createOrderModal close', () => {
		const previousState = { ...initialState, orderData: mockOrderData };
		expect(
			burgerOrderSlice.reducer(previousState, closeCreateOrderModal())
		).toEqual({
			...initialState,
			orderData: null,
		});
	});

	it('createBurgerOrder fulfilled', () => {
		const action = {
			type: createBurgerOrder.fulfilled.type,
			payload: mockOrderData,
		};
		const state = burgerOrderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			orderData: mockOrderData,
		});
	});

	it('createBurgerOrder pending', () => {
		const action = { type: createBurgerOrder.pending.type };
		const state = burgerOrderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('createBurgerOrder rejected', () => {
		const action = {
			type: createBurgerOrder.rejected.type,
			error: { message: 'Произошла ошибка' },
		};
		const state = burgerOrderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: false,
			error: 'Произошла ошибка',
		});
	});

	it('getOrderByNumber fulfilled', () => {
		const action = {
			type: getOrderByNumber.fulfilled.type,
			payload: mockOrderByNumberResponse,
		};
		const state = burgerOrderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			currentOrder: mockOrderByNumberResponse.orders[0],
		});
	});
});
