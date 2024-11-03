import type { FC } from 'react';

import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../../services/store';
import {
	wsConnect,
	wsDisconnect,
} from '../../../services/profileOrders/actions';
import { getProfileOrders } from '../../../services/profileOrders/reducer';
import { WEB_SOCKET_URL } from '../../../utils/config';

import { Orders } from '../../../components/orders/orders';

import styles from './profile-orders.module.scss';

export const ProfileOrders: FC = () => {
	const dispatch = useDispatch();
	const ordersData = useSelector(getProfileOrders);

	useEffect(() => {
		const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
		dispatch(wsConnect(`${WEB_SOCKET_URL}orders?token=${token}`));

		return () => {
			dispatch(wsDisconnect());
		};
	}, [dispatch]);

	return (
		<section className={styles.section}>
			<Orders
				orders={ordersData.orders.slice().reverse()}
				isShowStatus={true}
			/>
		</section>
	);
};
