import type { IIngredient } from '../../pages/home/types';
import type {
	IIngredientConstructor,
	IBurgerConstructor,
} from '../../pages/home/burger-constructor/types';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IBurgerConstructor = {
	bun: null,
	ingredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addBun(state, action: PayloadAction<IIngredient>) {
			state.bun = action.payload;
		},
		addIngredient(state, action: PayloadAction<IIngredientConstructor>) {
			state.ingredients = [...state.ingredients, action.payload];
		},
		removeIngredient(state, action: PayloadAction<string>) {
			state.ingredients = state.ingredients.filter(
				(elem) => elem.uuid !== action.payload
			);
		},
		sortIngredients(
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) {
			const { fromIndex, toIndex } = action.payload;
			const ingredients = [...state.ingredients];
			ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
			state.ingredients = ingredients;
		},
	},
});

export const { addBun, addIngredient, removeIngredient, sortIngredients } =
	burgerConstructorSlice.actions;
