import type { FC } from 'react';
import type { IFormLinksProps, IFormLink } from '../types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';

import styles from './form-links.module.scss';

export const FormLinks: FC<IFormLinksProps> = ({ links }) => {
	const navigate = useNavigate();

	return (
		<nav className={`${styles.container} mt-20`}>
			{links.map((elem: IFormLink, i: number) => (
				<p className='text text_type_main-default text_color_inactive ' key={i}>
					{elem.text}
					<Button
						onClick={() => navigate(elem.url)}
						htmlType='button'
						type='secondary'
						size='medium'
						extraClass={`${styles.link} ml-2`}>
						{elem.label}
					</Button>
				</p>
			))}
		</nav>
	);
};
