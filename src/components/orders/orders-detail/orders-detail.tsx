import type { FC } from 'react';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	useDispatch,
	useSelector as useSelectorStore,
} from '../../../services/store';

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrdersStatus } from '../orders-status/orders-status';
import { OrdersComposition } from '../orders-composition/orders-composition';
import { Price } from '../../price/price';
import { Preloader } from '../../preloader/preloader';

import { countTotalPrice } from '../../../services/ingredientList/selectors';
import { getOrderByNumber } from '../../../services/burgerOrder/actions';

import styles from './orders-detail.module.scss';

export const OrdersDetail: FC = () => {
	const { number } = useParams();
	const dispatch = useDispatch();

	const order = useSelectorStore((state) => {
		if (number) {
			let order = state.feedOrders.ordersData.orders.find(
				(o) => o.number === +number
			);
			if (order) {
				return order;
			}

			order = state.profileOrders.ordersData.orders.find(
				(o) => o.number === +number
			);
			if (order) {
				return order;
			}

			return state.burgerOrder.currentOrder;
		}
	});

	useEffect(() => {
		if (!order) {
			if (number) {
				dispatch(getOrderByNumber(number.toString()));
			}
		}
	});

	const totalPrice = useSelector(countTotalPrice(order?.ingredients || []));

	if (!order) {
		return <Preloader />;
	}

	return (
		<div className={styles.container}>
			<p className={`text text_type_digits-default ${styles.number}`}>
				#{order.number}
			</p>
			<h4 className='text text_type_main-medium mt-10'>{order.name}</h4>
			<OrdersStatus status={order.status} />
			<OrdersComposition ingredients={order.ingredients} />
			<div className={`${styles.footer} mt-10`}>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(order.createdAt)}
				/>
				<Price count={totalPrice} />
			</div>
		</div>
	);
};
