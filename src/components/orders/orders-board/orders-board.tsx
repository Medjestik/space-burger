import type { FC } from 'react';
import { type IOrder, type IOrdersBoardProps, EOrderStatus } from '../types';

import styles from './orders-board.module.scss';

export const OrdersBoard: FC<IOrdersBoardProps> = ({ orders }) => {
	const { doneOrders, createdOrders } = orders.reduce(
		(acc, order) => {
			if (order.status === EOrderStatus.DONE) {
				acc.doneOrders.push(order);
			} else if (
				order.status === EOrderStatus.PENDING ||
				order.status === EOrderStatus.CREATED
			) {
				acc.createdOrders.push(order);
			}
			return acc;
		},
		{ doneOrders: [] as IOrder[], createdOrders: [] as IOrder[] }
	);

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				<h4 className='text text_type_main-medium mb-6'>Готовы:</h4>
				<ul className={styles.list}>
					{doneOrders.slice(0, 10).map((order) => (
						<li className={styles.item} key={order._id}>
							<span
								className={`text text_type_digits-default ${styles.text_color_done}`}>
								{order.number}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.column}>
				<h4 className='text text_type_main-medium mb-6'>В работе:</h4>
				<ul className={styles.list}>
					{createdOrders.slice(0, 10).map((order) => (
						<li className={styles.item} key={order._id}>
							<span className='text text_type_digits-default'>
								{order.number}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
