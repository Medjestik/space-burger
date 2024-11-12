import type { FC } from 'react';
import type { IIngredient } from '../../../pages/home/types';

import { useSelector } from '../../../services/store';

import { selectIngredientList } from '../../../services/ingredientList/selectors';

import { Price } from '../../price/price';

import styles from './orders-composition.module.scss';

interface IOrdersCompositionProps {
	ingredients: string[];
}

export const OrdersComposition: FC<IOrdersCompositionProps> = ({
	ingredients,
}) => {
	const ingredientList = useSelector(selectIngredientList);
	const ingredientMap = ingredientList.reduce<Record<string, IIngredient>>(
		(acc, ingredient) => {
			acc[ingredient._id] = ingredient;
			return acc;
		},
		{}
	);
	const uniqueIngredients = ingredients.reduce<
		Record<string, { count: number }>
	>((acc, id) => {
		if (acc[id]) {
			acc[id].count += 1;
		} else {
			acc[id] = { count: 1 };
		}
		return acc;
	}, {});

	return (
		<div className={`${styles.container} mt-15`}>
			<h4 className='text text_type_main-medium mb-4'>Состав:</h4>
			<ul className={`${styles.list} custom-scroll scroll`}>
				{Object.entries(uniqueIngredients).map(([id, { count }]) => {
					const ingredient = ingredientMap[id];
					if (!ingredient) return null;

					return (
						<li className={`${styles.item} mr-2`} key={id}>
							<div className={styles.img_container}>
								<img
									className={styles.img}
									src={ingredient?.image_mobile}
									alt='ingredient'></img>
							</div>
							<h6 className='text text_type_main-default'>{ingredient.name}</h6>
							<div className={styles.price}>
								<span className='text text_type_digits-default mt-1 mr-2'>
									{count} x{' '}
								</span>
								<Price count={ingredient.price} />
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
