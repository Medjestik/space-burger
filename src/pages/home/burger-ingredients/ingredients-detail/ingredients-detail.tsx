import type { FC } from 'react';
import type { IIngredientDetailProps } from '../types';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { getIngredientById } from '../../../../services/ingredientList/selectors';

import styles from './ingredients-detail.module.scss';

export const IngredientDetail: FC<IIngredientDetailProps> = ({ title }) => {
	const { ingredientId } = useParams<{ ingredientId: string }>();
	const ingredient = useSelector(
		ingredientId ? getIngredientById(ingredientId) : () => null
	);

	const renderIngredientIndicator = (name: string, count: number) => {
		return (
			<li className={styles.item} key={name}>
				<p className='text text_type_main-small text_color_inactive'>{name}</p>
				<span className='text text_type_digits-default text_color_inactive'>
					{count}
				</span>
			</li>
		);
	};

	const ingredientIndicators = useMemo(() => {
		if (!ingredient) return null;

		return [
			renderIngredientIndicator('Калории, ккал', ingredient.calories),
			renderIngredientIndicator('Белки, г', ingredient.proteins),
			renderIngredientIndicator('Жиры, г', ingredient.fat),
			renderIngredientIndicator('Углеводы, г', ingredient.carbohydrates),
		];
	}, [ingredient]);

	return (
		ingredient && (
			<div className={styles.container}>
				{title && (
					<h2 className='text text_type_main-large mt-8 mb-8'>{title}</h2>
				)}
				<img
					className={styles.image}
					src={ingredient.image_large}
					alt='изображение ингредиента'
				/>
				<h4 className='text text_type_main-medium mt-4'>{ingredient.name}</h4>
				<ul className={`${styles.list} mt-8 ml-15 mr-15`}>
					{ingredientIndicators}
				</ul>
			</div>
		)
	);
};
