import type { RefObject } from 'react';

import PropTypes from 'prop-types';

import { type IIngredient, ingredientPropTypes, EIngredients } from '../types';

export interface IIngredientsListProps {
	title: string;
	ingredientsList: IIngredient[];
	ref?: RefObject<HTMLUListElement>;
}

export interface IIngredientCardProps {
	ingredient: IIngredient;
}

export interface IIngredientDetailProps {
	title?: string;
}

export interface IIngredientTabsProps {
	currentTab: EIngredients;
	onClick: (tab: EIngredients) => void;
}

export const ingredientsListPropTypes = {
	title: PropTypes.string.isRequired,
	ingredientsList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export const ingredientDetailPropTypes = {
	title: PropTypes.string,
};

export const ingredientCardPropTypes = {
	ingredient: ingredientPropTypes,
};

export const ingredientTabsPropTypes = {
	currentTab: PropTypes.oneOf(Object.values(EIngredients)).isRequired,
	onClick: PropTypes.func.isRequired,
};
