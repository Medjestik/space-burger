import {
	type IIngredient,
	type IIngredientList,
	ingredientsCategoryPropTypes,
	ingredientTypes,
	ingredientPropTypes,
} from '../types';

import PropTypes from 'prop-types';

export enum EConstructorStubType {
	BUN_TOP = 'bun-top',
	BUN_BOT = 'bun-bot',
	INGREDIENT = 'ingredient',
}

export enum EConstructorElementBunPosition {
	TOP = 'bun-top',
	BOT = 'bun-bot',
}

export interface IIngredientConstructor extends IIngredient {
	uuid: string;
}

export interface IBurgerConstructor {
	bun: IIngredient | null;
	ingredients: IIngredientConstructor[];
}

export interface IBurgerConstructorProps {
	ingredients: IIngredientList;
}

export interface IConstructorStubProps {
	type?: EConstructorStubType;
	isHover?: boolean;
}

export interface IConstructorElementBun {
	bun: IIngredient;
	position: EConstructorElementBunPosition;
}

export interface IConstructorElementIngredient {
	ingredient: IIngredientConstructor;
	index: number;
}

export const burgerConstructorPropTypes = {
	ingredients: ingredientsCategoryPropTypes,
};

export const constructorStubPropTypes = {
	type: PropTypes.oneOf(Object.values(EConstructorStubType)),
	isHover: PropTypes.bool,
};

export const constructorElementBunPropTypes = {
	bun: ingredientPropTypes,
	position: PropTypes.oneOf([
		EConstructorElementBunPosition.TOP,
		EConstructorElementBunPosition.BOT,
	]).isRequired,
};

export const ingredientConstructorTypes = {
	...ingredientTypes,
	uuid: PropTypes.string.isRequired,
};

export const constructorElementIngredientPropTypes = {
	ingredient: PropTypes.shape(ingredientConstructorTypes).isRequired,
	index: PropTypes.number.isRequired,
};
