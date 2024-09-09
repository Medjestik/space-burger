import type { IIngredient } from '../components/main/types';

import * as api from '../api/api';

import Preloader from '../components/preloader/preloader';
import Header from '../components/header/header';
import Main from '../components/main/main';
import { useEffect, useState } from 'react';

import styles from './app.module.scss';

export const App = () => {
	const [ingredients, setIngredients] = useState<IIngredient[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getIngredients = () => {
		setIsLoading(true);
		api
			.getIngredients()
			.then((res: { data: IIngredient[] }) => {
				setIngredients(res.data);
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		getIngredients();
	}, []);

	return (
		<div className={styles.page}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<Header />
					<Main ingredients={ingredients} />
					<div id='modal-root'></div>
				</>
			)}
		</div>
	);
};
