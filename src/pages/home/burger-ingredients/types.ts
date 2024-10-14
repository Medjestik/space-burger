import type { RefObject } from 'react';

import { type IIngredient, EIngredients } from '../types';

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
