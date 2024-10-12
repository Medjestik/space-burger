import type { IIngredient } from '../../pages/home/types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getIngredientList } from './actions';

const initialState = {
	ingredientList: [] as IIngredient[],
	loading: true,
	error: null as string | null,
};

export const ingredientListSlice = createSlice({
	name: 'ingredientList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				getIngredientList.fulfilled,
				(state, action: PayloadAction<IIngredient[]>) => {
					state.ingredientList = action.payload;
					state.loading = false;
				}
			)
			.addCase(getIngredientList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getIngredientList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			});
	},
});
