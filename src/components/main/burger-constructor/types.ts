import { type IIngredientList, ingredientsCategoryPropTypes } from '../types';

export interface IBurgerConstructorProps {
	ingredients: IIngredientList;
}

export const burgerConstructorPropTypes = {
	ingredients: ingredientsCategoryPropTypes,
};
