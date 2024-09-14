import type { TRootState } from '../store';
import { type IIngredient, EIngredients } from '../../components/main/types';

import { createSelector } from 'reselect';

const selectIngredientList = (state: TRootState) =>
	state.ingredientList.ingredientList;

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
