import type { IIngredient, IIngredientList } from '../types';

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
