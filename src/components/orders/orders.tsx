import type { FC } from 'react';
import type { IOrdersProps } from './types';

import { OrdersCard } from './orders-card/orders-card';

import styles from './orders.module.scss';

export const Orders: FC<IOrdersProps> = ({ orders, isShowStatus = false }) => {
	return (
		<ul className={`${styles.list} custom-scroll scroll`}>
			{orders.map((elem) => (
				<OrdersCard key={elem._id} order={elem} isShowStatus={isShowStatus} />
			))}
		</ul>
	);
};
