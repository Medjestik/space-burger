import type { FC } from 'react';

import img from '../../images/not-found.svg';

import { PublicLayout } from '../../components/layout/public-layout/public-layout';
import { FormLinks } from '../../components/form/form-links/form-links';

import { EROUTES } from '../../utils/routes';

const links = [
	{
		text: 'Опять потерялись?',
		label: 'Вернуться',
		url: EROUTES.HOME,
	},
];

export const NotFoundPage: FC = () => {
	return (
		<PublicLayout>
			<img src={img} alt='Изображение 404'></img>
			<FormLinks links={links} />
		</PublicLayout>
	);
};
