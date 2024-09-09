import type { FC } from 'react';
import { type INavLink, navLinkPropTypes } from './types';

import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './nav-link.module.scss';

const NavLink: FC<INavLink> = ({ icon, text, isActive = false }) => {
	const iconsMap = {
		burger: BurgerIcon,
		list: ListIcon,
		profile: ProfileIcon,
	};

	const IconComponent = iconsMap[icon];
	return (
		<figure className={styles.container}>
			<IconComponent type={isActive ? 'primary' : 'secondary'} />
			<figcaption
				className={`text text_type_main-default ${
					isActive ? '' : 'text_color_inactive'
				}`}>
				{text}
			</figcaption>
		</figure>
	);
};

NavLink.propTypes = navLinkPropTypes;

export default NavLink;
