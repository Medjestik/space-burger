import type { IOrderData } from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createBurgerOrder } from './actions';

const initialState = {
	orderData: null as IOrderData | null,
	loading: false,
	error: null as string | null,
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
