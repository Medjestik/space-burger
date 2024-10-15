import type { FC } from 'react';
import type { IIngredientTabsProps } from '../types';

import { EIngredients } from '../../types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-tabs.module.scss';

const tabs = [
	{ value: EIngredients.Bun, label: 'Булки' },
	{ value: EIngredients.Sauce, label: 'Соусы' },
	{ value: EIngredients.Main, label: 'Начинки' },
];

export const IngredientsTabs: FC<IIngredientTabsProps> = ({
	currentTab,
	onClick,
}) => {
	return (
		<div className={styles.tabs}>
			{tabs.map((tab) => (
				<Tab
					key={tab.value}
					value={tab.value}
					active={currentTab === tab.value}
					onClick={() => onClick(tab.value)}>
					{tab.label}
				</Tab>
			))}
		</div>
	);
};
