import type { FC } from 'react';
import {
	type IBurgerConstructorProps,
	burgerConstructorPropTypes,
} from './types';

import { useState, useCallback } from 'react';

import {
	DragIcon,
	Button,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../../price/price';
import CreateOrderPopup from '../../popup/create-order/create-order';

import styles from './burger-constructor.module.scss';

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ ingredients }) => {
	const [isOpenCreateOrderPopup, setIsOpenCreateOrderPopup] =
		useState<boolean>(false);

	const toggleCreateOrderPopup = useCallback(() => {
		setIsOpenCreateOrderPopup((prevState) => !prevState);
	}, []);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<ConstructorElement
					text={ingredients.bunList[0].name}
					price={ingredients.bunList[0].price}
					thumbnail={ingredients.bunList[0].image}
					type='top'
					isLocked={true}
					extraClass='ml-8 mb-4'
				/>
				<ul className={`${styles.list} custom-scroll scroll`}>
					{[
						ingredients.mainList[0],
						ingredients.sauceList[0],
						ingredients.mainList[1],
					].map((item, i) => (
						<li className={styles.item} key={i}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
								extraClass='ml-2'
							/>
						</li>
					))}
				</ul>
				<ConstructorElement
					text={ingredients.bunList[0].name}
					price={ingredients.bunList[0].price}
					thumbnail={ingredients.bunList[0].image}
					type='bottom'
					isLocked={true}
					extraClass='ml-8 mt-4'
				/>
				<div className={`mt-10 ${styles.order}`}>
					<Price count={600} size='medium' />
					<Button
						onClick={toggleCreateOrderPopup}
						htmlType='button'
						type='primary'
						size='large'
						extraClass='ml-10'>
						Оформить заказ
					</Button>
				</div>
			</div>
			{isOpenCreateOrderPopup && (
				<CreateOrderPopup
					isOpen={isOpenCreateOrderPopup}
					onClose={toggleCreateOrderPopup}
				/>
			)}
		</section>
	);
};

BurgerConstructor.propTypes = burgerConstructorPropTypes;

export default BurgerConstructor;
