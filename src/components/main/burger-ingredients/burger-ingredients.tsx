import type { FC } from 'react';
import type { TRootState } from '../../../services/store';
import { EIngredients } from '../types';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import IngredientDetail from './ingredients-detail/ingredients-detail';
import Modal from '../../modal/modal';

import { getCategorizedIngredients } from '../../../services/ingredientList/selectors';
import { closeIngredientDetailModal } from '../../../services/ingredientDetail/reducer';

import styles from './burger-ingredients.module.scss';

const BurgerIngredients: FC = () => {
	const dispatch = useAppDispatch();
	const categorizedIngredients = useSelector(getCategorizedIngredients);
	const { ingredient } = useSelector(
		(state: TRootState) => state.ingredientDetail
	);
	const [currentTab, setCurrentTab] = useState<EIngredients>(EIngredients.Bun);

	const bunRef = useRef<HTMLUListElement>(null);
	const sauceRef = useRef<HTMLUListElement>(null);
	const mainRef = useRef<HTMLUListElement>(null);
	const containerRef = useRef<HTMLUListElement>(null);

	const closeDetailIngredientModal = useCallback(() => {
		dispatch(closeIngredientDetailModal());
	}, [dispatch]);

	const handleTabClick = useCallback(
		(tab: EIngredients) => {
			setCurrentTab(tab);
			const refMap = {
				[EIngredients.Bun]: bunRef,
				[EIngredients.Sauce]: sauceRef,
				[EIngredients.Main]: mainRef,
			};
			refMap[tab]?.current?.scrollIntoView({ behavior: 'smooth' });
		},
		[bunRef, sauceRef, mainRef]
	);

	const handleScroll = useCallback(() => {
		const bunPos = bunRef.current?.getBoundingClientRect().top ?? 0;
		const saucePos = sauceRef.current?.getBoundingClientRect().top ?? 0;
		const mainPos = mainRef.current?.getBoundingClientRect().top ?? 0;
		const containerPos = containerRef.current?.getBoundingClientRect().top ?? 0;

		const findBunPos = Math.abs(bunPos - containerPos);
		const findSaucePos = Math.abs(saucePos - containerPos);
		const findMainPos = Math.abs(mainPos - containerPos);

		if (findBunPos < findSaucePos && findBunPos < findMainPos) {
			setCurrentTab(EIngredients.Bun);
		} else if (findSaucePos < findMainPos) {
			setCurrentTab(EIngredients.Sauce);
		} else {
			setCurrentTab(EIngredients.Main);
		}
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<section className={styles.section}>
			<h2 className='text text_type_main-large'>Соберите бургер</h2>
			<IngredientsTabs currentTab={currentTab} onClick={handleTabClick} />
			<ul ref={containerRef} className={`${styles.list} custom-scroll scroll`}>
				<IngredientsList
					ref={bunRef}
					title='Булки'
					ingredientsList={categorizedIngredients.bunList}
				/>
				<IngredientsList
					ref={sauceRef}
					title='Соусы'
					ingredientsList={categorizedIngredients.sauceList}
				/>
				<IngredientsList
					ref={mainRef}
					title='Начинки'
					ingredientsList={categorizedIngredients.mainList}
				/>
			</ul>
			{ingredient && (
				<Modal
					isOpen={ingredient ? true : false}
					onClose={closeDetailIngredientModal}
					title='Детали ингредиента'>
					<IngredientDetail ingredient={ingredient} />
				</Modal>
			)}
		</section>
	);
};

export default BurgerIngredients;
