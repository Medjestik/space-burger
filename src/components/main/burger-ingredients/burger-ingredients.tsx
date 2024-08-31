import type { FC } from 'react';
import { type IIngredient, EIngredients } from '../types';
import {
	type IBurgerIngredientsProps,
	burgerIngredientsPropTypes,
} from './types';

import { useState, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list';
import DetailIngredientPopup from '../../popup/detail-ingredient/detail-ingredient';

import styles from './burger-ingredients.module.scss';

const tabs = [
	{ value: EIngredients.Bun, label: 'Булки' },
	{ value: EIngredients.Sauce, label: 'Соусы' },
	{ value: EIngredients.Main, label: 'Начинки' },
];

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ ingredients }) => {
	const [currentTab, setCurrentTab] = useState<EIngredients>(EIngredients.Bun);
	const [currentIngredient, setCurrentIngredient] = useState<IIngredient>();
	const [isOpenDetailIngredientPopup, setIsOpenDetailIngredientPopup] =
		useState<boolean>(false);

	const openDetailIngredientPopup = useCallback((ingredient: IIngredient) => {
		setCurrentIngredient(ingredient);
		setIsOpenDetailIngredientPopup(true);
	}, []);

	const closeDetailIngredientPopup = useCallback(() => {
		setIsOpenDetailIngredientPopup(false);
	}, []);

	return (
		<section className={styles.section}>
			<h2 className='text text_type_main-large'>Соберите бургер</h2>
			<div className={styles.tabs}>
				{tabs.map((tab) => (
					<Tab
						key={tab.value}
						value={tab.value}
						active={currentTab === tab.value}
						onClick={() => setCurrentTab(tab.value)}>
						{tab.label}
					</Tab>
				))}
			</div>
			<ul className={`${styles.list} custom-scroll scroll`}>
				<IngredientsList
					title='Булки'
					ingredientsList={ingredients.bunList}
					onOpen={openDetailIngredientPopup}
				/>
				<IngredientsList
					title='Соусы'
					ingredientsList={ingredients.sauceList}
					onOpen={openDetailIngredientPopup}
				/>
				<IngredientsList
					title='Начинки'
					ingredientsList={ingredients.mainList}
					onOpen={openDetailIngredientPopup}
				/>
			</ul>
			{isOpenDetailIngredientPopup && (
				<DetailIngredientPopup
					isOpen={isOpenDetailIngredientPopup}
					onClose={closeDetailIngredientPopup}
					title='Детали ингредиента'
					ingredient={currentIngredient}
				/>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = burgerIngredientsPropTypes;

export default BurgerIngredients;
