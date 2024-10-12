import type { FC } from 'react';
import { type IFormProps, formPropTypes } from './types';

import styles from './form.module.scss';

export const Form: FC<IFormProps> = ({ title, name, onSubmit, children }) => {
	return (
		<form className={styles.form} name={name} onSubmit={onSubmit} noValidate>
			{title && (
				<h2 className={`${styles.title} text text_type_main-medium`}>
					{title}
				</h2>
			)}
			{children}
		</form>
	);
};

Form.propTypes = formPropTypes;
