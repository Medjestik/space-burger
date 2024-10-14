import type { FC } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './burger-constructor/burger-constructor';

import styles from './home.module.scss';

export const HomePage: FC = () => {
	return (
		<main className={styles.main}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor />
			</DndProvider>
		</main>
	);
};
