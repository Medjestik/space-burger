import type { FC } from 'react';

import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/feedOrders/actions';
import { getFeedOrders } from '../../services/feedOrders/reducer';
import { WEB_SOCKET_URL } from '../../utils/config';

import { Orders } from '../../components/orders/orders';
import { OrdersBoard } from '../../components/orders/orders-board/orders-board';

import styles from './feed.module.scss';

export const FeedPage: FC = () => {
	const dispatch = useDispatch();
	const ordersData = useSelector(getFeedOrders);

	useEffect(() => {
		dispatch(wsConnect(WEB_SOCKET_URL + 'orders/all'));

		return () => {
			dispatch(wsDisconnect());
		};
	}, [dispatch]);

	return (
		<div className={styles.feed}>
			<h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
			{ordersData.orders.length > 0 && (
				<div className={styles.container}>
					<Orders orders={ordersData.orders} />
					<section className={styles.section}>
						<OrdersBoard orders={ordersData.orders} />
						<div className={styles.description}>
							<h4 className='text text_type_main-medium'>
								Выполнено за все время:
							</h4>
							<span className={`text text_type_digits-large ${styles.count}`}>
								{ordersData.total}
							</span>
						</div>
						<div className={styles.description}>
							<h4 className='text text_type_main-medium'>
								Выполнено за сегодня:
							</h4>
							<span className={`text text_type_digits-large ${styles.count}`}>
								{ordersData.totalToday}
							</span>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};
