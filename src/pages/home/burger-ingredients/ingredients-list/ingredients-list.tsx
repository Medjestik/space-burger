import type { ForwardedRef } from 'react';
import type { IIngredient } from '../../types';
import type { IIngredientsListProps } from '../types';

import { forwardRef } from 'react';

import { IngredientsCard } from '../ingredients-card/ingredients-card';

import styles from './ingredients-list.module.scss';

export const IngredientsList = forwardRef(
	(
		{ title, ingredientsList }: IIngredientsListProps,
		ref: ForwardedRef<HTMLUListElement>
	) => {
		return (
			<li className={styles.container}>
				<h4 className='text text_type_main-medium'>{title}</h4>
				<ul ref={ref} className={styles.list}>
					{ingredientsList.map((item: IIngredient) => (
						<IngredientsCard key={item._id} ingredient={item} />
					))}
				</ul>
			</li>
		);
	}
);

IngredientsList.displayName = 'IngredientsList';
