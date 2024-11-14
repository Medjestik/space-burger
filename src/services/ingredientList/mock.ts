import { type IIngredient, EIngredients } from '../../pages/home/types';

export const mockIngredient: IIngredient = {
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
