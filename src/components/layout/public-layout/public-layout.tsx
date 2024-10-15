import type { FC } from 'react';
import type { IPublicLayoutProps } from '../types';

import styles from './public-layout.module.scss';

export const PublicLayout: FC<IPublicLayoutProps> = ({ children }) => {
	return <section className={styles.container}>{children}</section>;
};
