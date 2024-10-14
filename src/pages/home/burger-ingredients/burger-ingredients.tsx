import type { FC } from 'react';
import { EIngredients } from '../types';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IngredientsTabs } from './ingredients-tabs/ingredients-tabs';
import { IngredientsList } from './ingredients-list/ingredients-list';

import { getCategorizedIngredients } from '../../../services/ingredientList/selectors';

import styles from './burger-ingredients.module.scss';

export const BurgerIngredients: FC = () => {
	const categorizedIngredients = useSelector(getCategorizedIngredients);
	const [currentTab, setCurrentTab] = useState<EIngredients>(EIngredients.Bun);

	const bunRef = useRef<HTMLUListElement>(null);
	const sauceRef = useRef<HTMLUListElement>(null);
	const mainRef = useRef<HTMLUListElement>(null);
	const containerRef = useRef<HTMLUListElement>(null);

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
		</section>
	);
};
