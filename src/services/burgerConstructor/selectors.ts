import type { TRootState } from '../store';
import type { IIngredient } from '../../pages/home/types';

import { createSelector } from 'reselect';

const selectBun = (state: TRootState) => state.burgerConstructor.bun;
const selectIngredients = (state: TRootState) =>
	state.burgerConstructor.ingredients;

export const getTotalPrice = createSelector(
	[selectBun, selectIngredients],
	(bun: IIngredient | null, ingredients: IIngredient[]) => {
		const bunPrice = bun ? bun.price * 2 : 0;
		const ingredientsPrice = ingredients.reduce(
			(acc, ingredient) => acc + ingredient.price,
			0
		);
		return bunPrice + ingredientsPrice;
	}
);

export const getIngredientCount = createSelector(
	[
		selectBun,
		selectIngredients,
		(state: TRootState, ingredientId: string) => ingredientId,
	],
	(bun, ingredients, ingredientId) => {
		if (bun && bun._id === ingredientId) {
			return 2;
		}

		return ingredients.filter((ingredient) => ingredient._id === ingredientId)
			.length;
	}
);

export const getIngredientsId = createSelector(
	[selectBun, selectIngredients],
	(bun: IIngredient | null, ingredients: IIngredient[]) => {
		if (bun) {
			const ingredientsId = ingredients.map((ingredient) => ingredient._id);
			return [bun._id, ...ingredientsId, bun._id];
		}
		return [];
	}
);
