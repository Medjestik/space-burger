import type { FC } from 'react';
import type { IFormSubmitProps } from '../types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const FormSubmit: FC<IFormSubmitProps> = ({ text, isBlock }) => {
	return (
		<Button
			disabled={isBlock}
			htmlType='submit'
			type='primary'
			size='medium'
			width='max-content'>
			{text}
		</Button>
	);
};
