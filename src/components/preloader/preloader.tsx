import type { FC } from 'react';

import styles from './preloader.module.scss';

export const Preloader: FC = () => {
	return (
		<figure className={styles.preloader}>
			<i className={styles.circle}></i>
			<figcaption
				className={`text text_type_main-default text_color_inactive ${styles.caption}`}>
				Идёт загрузка...
			</figcaption>
		</figure>
	);
};
