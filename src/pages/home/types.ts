import PropTypes from 'prop-types';

export enum EIngredients {
	Bun = 'bun',
	Sauce = 'sauce',
	Main = 'main',
}

export interface IIngredient {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: EIngredients.Bun | EIngredients.Sauce | EIngredients.Main;
	_id: string;
}

export interface IIngredientList {
	bunList: IIngredient[];
	sauceList: IIngredient[];
	mainList: IIngredient[];
}

export const ingredientTypes = {
	calories: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	proteins: PropTypes.number.isRequired,
	type: PropTypes.oneOf(Object.values(EIngredients)).isRequired,
	_id: PropTypes.string.isRequired,
};

export const ingredientPropTypes = PropTypes.shape(ingredientTypes).isRequired;

export const ingredientsCategoryPropTypes = PropTypes.shape({
	bunList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
	sauceList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
	mainList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}).isRequired;
