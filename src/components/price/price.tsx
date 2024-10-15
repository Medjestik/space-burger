import type { FC } from 'react';
import type { IPrice } from './types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.scss';

export const Price: FC<IPrice> = ({ count, size = 'default' }) => {
	return (
		<div className={`mt-1 ${styles.price}`}>
			<span className={`text text_type_digits-${size} mr-1`}>{count}</span>
			<CurrencyIcon type='primary' />
		</div>
	);
};
