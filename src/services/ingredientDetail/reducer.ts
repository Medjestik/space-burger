import type { IIngredient } from '../../components/main/types';
import type { IIngredientDetail } from './types';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IIngredientDetail = {
	ingredient: null,
};

export const ingredientDetailSlice = createSlice({
	name: 'ingredientDetail',
	initialState,
	reducers: {
		openIngredientDetailModal(state, action: PayloadAction<IIngredient>) {
			state.ingredient = action.payload;
		},
		closeIngredientDetailModal(state) {
			state.ingredient = null;
		},
	},
});

export const { openIngredientDetailModal, closeIngredientDetailModal } =
	ingredientDetailSlice.actions;
