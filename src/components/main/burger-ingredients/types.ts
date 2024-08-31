import PropTypes from 'prop-types';

import {
	ingredientPropTypes,
	ingredientsCategoryPropTypes,
	type IIngredient,
	type IIngredientList,
} from '../types';

export interface IBurgerIngredientsProps {
	ingredients: IIngredientList;
}

export interface IIngredientsListProps {
	title: string;
	ingredientsList: IIngredient[];
	onOpen: (ingredient: IIngredient) => void;
}

export interface IIngredientCardProps {
	ingredient: IIngredient;
	onOpen: (ingredient: IIngredient) => void;
}

export const burgerIngredientsPropTypes = {
	ingredients: ingredientsCategoryPropTypes,
};

export const ingredientsListPropTypes = {
	title: PropTypes.string.isRequired,
	ingredientsList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
	onOpen: PropTypes.func.isRequired,
};

export const ingredientCardPropTypes = {
	ingredient: ingredientPropTypes,
	onOpen: PropTypes.func.isRequired,
};
