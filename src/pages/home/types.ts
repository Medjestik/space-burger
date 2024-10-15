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
