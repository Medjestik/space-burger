import { type IIngredient, EIngredients } from '../../pages/home/types';
import type { IIngredientConstructor } from '../../pages/home/burger-constructor/types';

export const mockBun: IIngredient = {
	_id: 'bun1',
	name: 'Test Bun',
	type: EIngredients.Bun,
	price: 100,
	image: 'test-bun-image',
	image_large: 'test-bun-image-large',
	image_mobile: 'test-bun-image-mobile',
	calories: 200,
	proteins: 10,
	fat: 5,
	carbohydrates: 20,
};

export const mockIngredient: IIngredientConstructor = {
	uuid: 'ingredient1',
	_id: 'ingredient1',
	name: 'Test Ingredient',
	type: EIngredients.Main,
	price: 50,
	image: 'test-ingredient-image',
	image_large: 'test-ingredient-image-large',
	image_mobile: 'test-ingredient-image-mobile',
	calories: 100,
	proteins: 8,
	fat: 4,
	carbohydrates: 15,
};
