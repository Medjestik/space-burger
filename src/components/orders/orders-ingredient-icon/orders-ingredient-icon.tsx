import type { FC } from 'react';
import type { IOrdersIngredientProps } from '../types';

import { useSelector } from '../../../services/store';

import { getIngredientById } from '../../../services/ingredientList/selectors';

import styles from './orders-ingredient-icon.module.scss';

export const OrdersIngredientIcon: FC<IOrdersIngredientProps> = ({
	id,
	isLast,
	hideIngredientsCount,
}) => {
	const ingredient = useSelector(getIngredientById(id));

	return (
		<li className={styles.item}>
			<img
				className={styles.img}
				src={ingredient?.image_mobile}
				alt='ingredient'></img>
			{isLast && hideIngredientsCount > 0 && (
				<div className={`text text_type_digits-default ${styles.count}`}>
					+{hideIngredientsCount}
				</div>
			)}
		</li>
	);
};
