import type { FC } from 'react';
import { type IIngredientCardProps, ingredientCardPropTypes } from '../types';
import type { TRootState } from '../../../../services/store';

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { getIngredientCount } from '../../../../services/burgerConstructor/selectors';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../../../components/price/price';

import styles from './ingredients-card.module.scss';

const IngredientsCard: FC<IIngredientCardProps> = ({ ingredient }) => {
	const location = useLocation();
	const ingredientId = ingredient['_id'];
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

	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
			className={styles.link}>
			<li
				className={`${styles.card} ${isDragging ? styles.card_dragging : ''}`}
				ref={dragRef}>
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
		</Link>
	);
};

IngredientsCard.propTypes = ingredientCardPropTypes;

export default IngredientsCard;
