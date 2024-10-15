import type { FC } from 'react';
import type { INavLink } from './types';

import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';

import styles from './header-link.module.scss';

export const HeaderLink: FC<INavLink> = ({ icon, text, url }) => {
	const iconsMap = {
		burger: BurgerIcon,
		list: ListIcon,
		profile: ProfileIcon,
	};

	const IconComponent = iconsMap[icon];
	return (
		<NavLink to={url} className={styles.link}>
			{({ isActive }) => (
				<figure className={styles.container}>
					<IconComponent type={isActive ? 'primary' : 'secondary'} />
					<figcaption
						className={`text text_type_main-default
							${isActive ? '' : 'text_color_inactive'}`}>
						{text}
					</figcaption>
				</figure>
			)}
		</NavLink>
	);
};
