import type { FC } from 'react';
import type { IOrdersStatusProps } from '../types';
import { EOrderStatus } from '../types';

import styles from './orders-status.module.scss';

const renderStatus = (status: string) => {
	switch (status) {
		case EOrderStatus.CREATED:
			return 'Создан';
		case EOrderStatus.PENDING:
			return 'Готовится';
		case EOrderStatus.DONE:
			return 'Выполнен';
		default:
			return 'Неизвестный статус';
	}
};

export const OrdersStatus: FC<IOrdersStatusProps> = ({ status }) => {
	return (
		<span
			className={`text text_type_main-small mt-2 ${
				status === EOrderStatus.DONE ? styles.status_color : ''
			}`}>
			{renderStatus(status)}
		</span>
	);
};
