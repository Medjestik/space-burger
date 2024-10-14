import type { FC } from 'react';
import type { IConstructorElementIngredient } from '../types';

import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';

import {
	removeIngredient,
	sortIngredients,
} from '../../../../services/burgerConstructor/reducer';

import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../burger-constructor.module.scss';

export const ConstructorElementIngredient: FC<
	IConstructorElementIngredient
> = ({ ingredient, index }) => {
	const dispatch = useAppDispatch();

	const handleRemoveIngredient = (ingredientId: string) => {
		dispatch(removeIngredient(ingredientId));
	};

	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient-sort',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: 'ingredient-sort',
		hover(item: { index: number }) {
			const dragIndex = item.index;
			if (dragIndex !== index) {
				dispatch(sortIngredients({ fromIndex: dragIndex, toIndex: index }));
				item.index = index;
			}
		},
	});

	return (
		<li
			className={`${styles.item} ${isDragging ? styles.item_dragging : ''}`}
			ref={(node) => dragRef(dropRef(node))}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				extraClass='ml-2 mr-2'
				handleClose={() => handleRemoveIngredient(ingredient.uuid)}
			/>
		</li>
	);
};
