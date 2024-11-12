import type { TRootState } from '../store';
import { type IIngredient, EIngredients } from '../../pages/home/types';

import { createSelector } from 'reselect';

export const selectIngredientList = (state: TRootState) =>
	state.ingredientList.ingredientList;

export const getIngredientById = (id: string) =>
	createSelector([selectIngredientList], (ingredientList: IIngredient[]) =>
		ingredientList.find((ingredient) => ingredient._id === id)
	);

export const getCategorizedIngredients = createSelector(
	[selectIngredientList],
	(ingredientList: IIngredient[]) => {
		return ingredientList.reduce(
			(acc, ingredient) => {
				if (ingredient.type === EIngredients.Bun) {
					acc.bunList.push(ingredient);
				} else if (ingredient.type === EIngredients.Sauce) {
					acc.sauceList.push(ingredient);
				} else if (ingredient.type === EIngredients.Main) {
					acc.mainList.push(ingredient);
				}
				return acc;
			},
			{
				bunList: [] as IIngredient[],
				sauceList: [] as IIngredient[],
				mainList: [] as IIngredient[],
			}
		);
	}
);

export const countTotalPrice = (ingredientIds: string[]) =>
	createSelector([selectIngredientList], (ingredientList: IIngredient[]) => {
		return ingredientIds.reduce((total, id) => {
			const ingredient = ingredientList.find(
				(ingredient) => ingredient._id === id
			);
			return ingredient ? total + ingredient.price : total;
		}, 0);
	});
