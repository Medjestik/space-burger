import type { TAppDispatch, TRootState } from '../services/store';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';

import Preloader from '../components/preloader/preloader';
import Main from '../components/main/main';
import Header from '../components/header/header';

import { getIngredientList } from '../services/ingredientList/actions';

import styles from './app.module.scss';

export const App = () => {
	const dispatch: TAppDispatch = useAppDispatch();
	const { loading, error } = useSelector(
		(state: TRootState) => state.ingredientList
	);

	useEffect(() => {
		dispatch(getIngredientList());
	}, [dispatch]);

	if (loading) {
		return <Preloader />;
	}

	if (!loading && error) {
		return <p>Ошибка: {error}</p>;
	}

	return (
		<div className={styles.page}>
			<Header />
			<Main />
			<div id='modal-root'></div>
		</div>
	);
};
