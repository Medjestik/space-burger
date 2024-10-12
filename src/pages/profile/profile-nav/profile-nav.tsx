import type { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';

import { NavLink } from 'react-router-dom';

import { logoutUser } from '../../../services/auth/actions';

import { EROUTES } from '../../../utils/routes';

import styles from './profile-nav.module.scss';

export const ProfileNav: FC = () => {
	const dispatch = useAppDispatch();
	const refreshToken = localStorage.getItem('refreshToken');

	const handleLogout = async () => {
		dispatch(logoutUser({ token: refreshToken || '' }));
	};

	return (
		<nav className={`${styles.nav} mr-15`}>
			<NavLink
				to={EROUTES.PROFILE}
				end
				className={({ isActive }) =>
					`text text_type_main-medium pt-4 pb-4 ${styles.link} ${
						isActive ? styles.link_active : 'text_color_inactive'
					}`
				}>
				Профиль
			</NavLink>
			<NavLink
				to={`${EROUTES.PROFILE}/orders`}
				className={({ isActive }) =>
					`text text_type_main-medium pt-4 pb-4 ${styles.link} ${
						isActive ? styles.link_active : 'text_color_inactive'
					}`
				}>
				История заказов
			</NavLink>
			<button
				onClick={handleLogout}
				className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
				type='button'>
				Выход
			</button>
		</nav>
	);
};
