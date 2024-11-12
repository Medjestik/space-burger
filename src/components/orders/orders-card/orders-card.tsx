import type { FC } from 'react';
import type { IOrdersCardProps } from '../types';

import { useMemo } from 'react';
import { useSelector } from '../../../services/store';
import { Link, useLocation } from 'react-router-dom';

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrdersIngredientIcon } from '../orders-ingredient-icon/orders-ingredient-icon';
import { OrdersStatus } from '../orders-status/orders-status';
import { Price } from '../../price/price';

import { countTotalPrice } from '../../../services/ingredientList/selectors';

import styles from './orders-card.module.scss';

export const OrdersCard: FC<IOrdersCardProps> = ({
	order,
	isShowStatus = false,
}) => {
	const location = useLocation();
	const displayedIngredients = useMemo(
		() => order.ingredients.slice(0, 6),
		[order.ingredients]
	);

	const hideIngredientsCount = useMemo(
		() => order.ingredients.length - displayedIngredients.length,
		[order.ingredients, displayedIngredients]
	);

	const totalPrice = useSelector(countTotalPrice(order.ingredients));

	return (
		<Link
			key={order._id}
			to={`${location.pathname}/${order.number}`}
			state={{ background: location }}
			className={styles.link}>
			<li className={styles.card}>
				<div className={styles.header}>
					<p className='text text_type_digits-default'>#{order.number}</p>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(order.createdAt)}
					/>
				</div>
				<h4 className='text text_type_main-medium mt-4'>{order.name}</h4>
				{isShowStatus && <OrdersStatus status={order.status} />}
				<div className={`mt-6 ${styles.footer}`}>
					<ul className={styles.ingredients}>
						{displayedIngredients.map((elem, i) => (
							<OrdersIngredientIcon
								id={elem}
								key={i}
								isLast={i === displayedIngredients.length - 1}
								hideIngredientsCount={hideIngredientsCount}
							/>
						))}
					</ul>
					<Price count={totalPrice} />
				</div>
			</li>
		</Link>
	);
};
