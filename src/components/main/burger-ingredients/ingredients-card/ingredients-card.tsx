import type { FC } from 'react';
import { type IIngredientCardProps, ingredientCardPropTypes } from '../types';
import type { IIngredient } from '../../types';
import type { TRootState } from '../../../../services/store';

import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';

import { getIngredientCount } from '../../../../services/burgerConstructor/selectors';
import { openIngredientDetailModal } from '../../../../services/ingredientDetail/reducer';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../../price/price';

import styles from './ingredients-card.module.scss';

const IngredientsCard: FC<IIngredientCardProps> = ({ ingredient }) => {
	const dispatch = useAppDispatch();
	const countIngredient = useSelector((state: TRootState) =>
		getIngredientCount(state, ingredient._id)
	);

	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const handleClick = (ingredient: IIngredient) => {
		dispatch(openIngredientDetailModal(ingredient));
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<li
			className={`${styles.card} ${isDragging ? styles.card_dragging : ''}`}
			ref={dragRef}
			onClick={() => handleClick(ingredient)}>
			{countIngredient > 0 && (
				<Counter count={countIngredient} size='default' />
			)}
			<img
				className='ml-4 mr-4'
				src={ingredient.image}
				alt='изоражение ингридиента'
			/>
			<Price count={ingredient.price} />
			<h6 className={`${styles.name} text text_type_main-default mt-1`}>
				{ingredient.name}
			</h6>
		</li>
	);
};

IngredientsCard.propTypes = ingredientCardPropTypes;

export default IngredientsCard;
