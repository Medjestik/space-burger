import type { IIngredient } from '../../pages/home/types';

export interface IIngredientListStore {
	ingredientList: IIngredient[];
	loading: boolean;
	error: string | null;
}
