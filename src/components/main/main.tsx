import type { FC } from 'react';
import {
	type IMainProps,
	type IIngredient,
	EIngredients,
	mainPropTypes,
} from './types';

import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';

import styles from './main.module.scss';

const Main: FC<IMainProps> = ({ ingredients }) => {
	const categorizedIngredients = ingredients.reduce(
		(acc, ingredient) => {
			if (ingredient.type === EIngredients.Bun) {
				acc.bunList.push(ingredient);
			} else if (ingredient.type === EIngredients.Sauce) {
				acc.sauceList.push(ingredient);
			} else if (ingredient.type === EIngredients.Main) {
				acc.mainList.push(ingredient);
			}
			return acc;
		},
		{
			bunList: [] as IIngredient[],
			sauceList: [] as IIngredient[],
			mainList: [] as IIngredient[],
		}
	);

	return (
		<main className={styles.main}>
			<BurgerIngredients ingredients={categorizedIngredients} />
			<BurgerConstructor ingredients={categorizedIngredients} />
		</main>
	);
};

Main.propTypes = mainPropTypes;

export default Main;
