import type { FC } from 'react';
import { type IIngredient, EIngredients } from '../types';
import {
	type IBurgerIngredientsProps,
	burgerIngredientsPropTypes,
} from './types';

import { useState, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list/ingredients-list';
import DetailIngredientModal from '../../modal/detail-ingredient/detail-ingredient';

import styles from './burger-ingredients.module.scss';

const tabs = [
	{ value: EIngredients.Bun, label: 'Булки' },
	{ value: EIngredients.Sauce, label: 'Соусы' },
	{ value: EIngredients.Main, label: 'Начинки' },
];

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ ingredients }) => {
	const [currentTab, setCurrentTab] = useState<EIngredients>(EIngredients.Bun);
	const [currentIngredient, setCurrentIngredient] = useState<IIngredient>();
	const [isOpenDetailIngredientModal, setIsOpenDetailIngredientModal] =
		useState<boolean>(false);

	const openDetailIngredientModal = useCallback((ingredient: IIngredient) => {
		setCurrentIngredient(ingredient);
		setIsOpenDetailIngredientModal(true);
	}, []);

	const closeDetailIngredientModal = useCallback(() => {
		setIsOpenDetailIngredientModal(false);
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
					onOpen={openDetailIngredientModal}
				/>
				<IngredientsList
					title='Соусы'
					ingredientsList={ingredients.sauceList}
					onOpen={openDetailIngredientModal}
				/>
				<IngredientsList
					title='Начинки'
					ingredientsList={ingredients.mainList}
					onOpen={openDetailIngredientModal}
				/>
			</ul>
			{isOpenDetailIngredientModal && (
				<DetailIngredientModal
					isOpen={isOpenDetailIngredientModal}
					onClose={closeDetailIngredientModal}
					title='Детали ингредиента'
					ingredient={currentIngredient}
				/>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = burgerIngredientsPropTypes;

export default BurgerIngredients;
