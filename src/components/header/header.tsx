import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import NavLink from '../nav-link/nav-link';
import { ENavLink } from '../nav-link/types';

import styles from './header.module.scss';

const Header = () => {
	return (
		<header className={styles.container}>
			<nav className={styles.nav}>
				<NavLink icon={ENavLink.Burger} text='Конструктор' isActive />
				<NavLink icon={ENavLink.List} text='Лента заказов' />
			</nav>
			<div className={styles.logo}>
				<Logo />
			</div>
			<NavLink icon={ENavLink.Profile} text='Личный кабинет' />
		</header>
	);
};

export default Header;
