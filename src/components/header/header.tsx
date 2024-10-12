import type { FC } from 'react';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link } from 'react-router-dom';

import { HeaderLink } from './header-link/header-link';
import { EHeaderLink } from './header-link/types';
import { EROUTES } from '../../utils/routes';

import styles from './header.module.scss';

export const Header: FC = () => {
	return (
		<header className={styles.container}>
			<nav className={styles.nav}>
				<HeaderLink
					icon={EHeaderLink.Burger}
					text='Конструктор'
					url={EROUTES.HOME}
				/>
				<HeaderLink
					icon={EHeaderLink.List}
					text='Лента заказов'
					url={EROUTES.FEED}
				/>
			</nav>
			<div className={styles.logo}>
				<Link to={EROUTES.HOME}>
					<Logo />
				</Link>
			</div>
			<HeaderLink
				icon={EHeaderLink.Profile}
				text='Личный кабинет'
				url={EROUTES.PROFILE}
			/>
		</header>
	);
};
