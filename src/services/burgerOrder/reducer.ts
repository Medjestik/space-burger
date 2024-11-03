import type { IBurgerOrderStore, IGetOrderResponse, IOrderData } from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumber, createBurgerOrder } from './actions';

const initialState: IBurgerOrderStore = {
	orderData: null,
	currentOrder: null,
	loading: false,
	error: null,
};

export const burgerOrderSlice = createSlice({
	name: 'burgerOrder',
	initialState,
	reducers: {
		closeCreateOrderModal(state) {
			state.orderData = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getOrderByNumber.fulfilled,
				(state, action: PayloadAction<IGetOrderResponse>) => {
					state.currentOrder = action.payload.orders[0];
				}
			)
			.addCase(
				createBurgerOrder.fulfilled,
				(state, action: PayloadAction<IOrderData>) => {
					state.orderData = action.payload;
					state.loading = false;
				}
			)
			.addCase(createBurgerOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createBurgerOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			});
	},
});

export const { closeCreateOrderModal } = burgerOrderSlice.actions;
