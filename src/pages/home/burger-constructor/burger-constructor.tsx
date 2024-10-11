import type { FC } from 'react';
import type { TRootState } from '../../../services/store';
import type { IIngredient } from '../types';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../../../components/price/price';
import Modal from '../../../components/modal/modal';
import ConstructorElementBun from './constructor-element-bun/constructor-element-bun';
import ConstructorElementIngredient from './constructor-element-ingredient/constructor-element-ingredient';
import ConstructorStub from './constructor-stub/constructor-stub';
import ConstructorOrder from './constructor-order/constructor-order';
import { Preloader } from '../../../components/preloader/preloader';

import { EROUTES } from '../../../utils/routes';

import {
	addBun,
	addIngredient,
} from '../../../services/burgerConstructor/reducer';
import { createBurgerOrder } from '../../../services/burgerOrder/actions';
import { closeCreateOrderModal } from '../../../services/burgerOrder/reducer';
import {
	getTotalPrice,
	getIngredientsId,
} from '../../../services/burgerConstructor/selectors';
import { EIngredients } from '../types';
import { EConstructorStubType, EConstructorElementBunPosition } from './types';

import styles from './burger-constructor.module.scss';

const BurgerConstructor: FC = () => {
	const dispatch = useAppDispatch();
	const { bun, ingredients } = useSelector(
		(state: TRootState) => state.burgerConstructor
	);
	const { orderData, loading, error } = useSelector(
		(state: TRootState) => state.burgerOrder
	);
	const { user } = useSelector((state: TRootState) => state.auth);
	const totalPrice = useSelector(getTotalPrice);
	const ingredientsId = useSelector(getIngredientsId);
	const navigate = useNavigate();

	const [{ isHover, dragItem }, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient: IIngredient) {
			handleDropIngredient(ingredient);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			dragItem: monitor.getItem(),
		}),
	});

	const handleDropIngredient = (ingredient: IIngredient) => {
		dispatch(
			ingredient.type === EIngredients.Bun
				? addBun(ingredient)
				: addIngredient({ ...ingredient, uuid: uuidv4() })
		);
	};

	const handleCreateOrder = () => {
		if (!user) {
			navigate(EROUTES.LOGIN);
			localStorage.setItem(
				'constructor',
				JSON.stringify({ savedBun: bun, savedIngredients: ingredients })
			);
			return;
		}
		if (ingredientsId && ingredientsId.length > 0) {
			dispatch(createBurgerOrder({ ingredients: ingredientsId }));
			localStorage.removeItem('constructor');
		}
	};

	const handleCloseCreateOrderModal = () => {
		dispatch(closeCreateOrderModal());
	};

	useEffect(() => {
		const savedBurger = localStorage.getItem('constructor');
		if (savedBurger) {
			const { savedBun, savedIngredients } = JSON.parse(savedBurger);
			if (!bun) {
				dispatch(addBun(savedBun));
			}
			if (
				Array.isArray(savedIngredients) &&
				savedIngredients.length > 0 &&
				ingredients.length === 0
			) {
				savedIngredients.forEach((item: IIngredient) =>
					dispatch(addIngredient({ ...item, uuid: uuidv4() }))
				);
			}
		}
	}, [dispatch]);

	return (
		<section className={styles.section}>
			{loading ? (
				<Preloader />
			) : (
				<>
					<div className={styles.container} ref={dropTarget}>
						{bun ? (
							<ConstructorElementBun
								bun={bun}
								position={EConstructorElementBunPosition.TOP}
							/>
						) : (
							<ConstructorStub
								type={EConstructorStubType.BUN_TOP}
								isHover={isHover && dragItem.type === EIngredients.Bun}
							/>
						)}

						{ingredients.length > 0 ? (
							<ul className={`${styles.list} custom-scroll scroll`}>
								{ingredients.map((item, index) => (
									<ConstructorElementIngredient
										ingredient={item}
										key={item.uuid}
										index={index}
									/>
								))}
							</ul>
						) : (
							<ConstructorStub
								isHover={isHover && dragItem.type !== EIngredients.Bun}
							/>
						)}

						{bun ? (
							<ConstructorElementBun
								bun={bun}
								position={EConstructorElementBunPosition.BOT}
							/>
						) : (
							<ConstructorStub
								type={EConstructorStubType.BUN_BOT}
								isHover={isHover && dragItem.type === EIngredients.Bun}
							/>
						)}
					</div>
					<div className={`mt-10 mr-4 ml-4 ${styles.order}`}>
						<Price count={totalPrice} size='medium' />
						<Button
							onClick={handleCreateOrder}
							htmlType='button'
							type='primary'
							size='large'
							extraClass='ml-10'
							disabled={loading}>
							{loading ? 'Оформление ...' : 'Оформить заказ'}
						</Button>
					</div>
				</>
			)}
			{error && (
				<div className='mt-4 mr-4 ml-4'>
					Ошибка при оформелние заказа, попробуйте позже
				</div>
			)}
			{orderData && (
				<Modal
					isOpen={orderData ? true : false}
					onClose={handleCloseCreateOrderModal}>
					<ConstructorOrder />
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;