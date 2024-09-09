import type { FC } from 'react';

import image from '../../../../images/order-done.svg';

import styles from './constructor-order.module.scss';

const ConstructorOrder: FC = () => {
	return (
		<>
			<h4 className='text text_type_digits-large'>034536</h4>
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<img className={`${styles.image} mt-15`} src={image} alt='иконка'></img>
			<p className='text text_type_main-small mt-15'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small text_color_inactive mt-2'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};

export default ConstructorOrder;
