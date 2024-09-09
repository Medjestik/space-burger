import type { FC } from 'react';
import { type IIngredientCardProps, ingredientCardPropTypes } from '../types';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../../price/price';

import styles from './ingredients-card.module.scss';

const IngredientsCard: FC<IIngredientCardProps> = ({ ingredient, onOpen }) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<li className={styles.card} onClick={() => onOpen(ingredient)}>
			<Counter count={1} size='default' />
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
