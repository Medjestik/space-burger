import type { FC } from 'react';
import type { IIngredient } from '../../types';
import { type IIngredientsListProps, ingredientsListPropTypes } from '../types';

import IngredientsCard from '../ingredients-card/ingredients-card';

import styles from './ingredients-list.module.scss';

const IngredientsList: FC<IIngredientsListProps> = ({
	title,
	ingredientsList,
	onOpen,
}) => {
	return (
		<li className={styles.container}>
			<h4 className='text text_type_main-medium'>{title}</h4>
			<ul className={styles.list}>
				{ingredientsList.map((item: IIngredient) => (
					<IngredientsCard key={item._id} ingredient={item} onOpen={onOpen} />
				))}
			</ul>
		</li>
	);
};

IngredientsList.propTypes = ingredientsListPropTypes;

export default IngredientsList;
