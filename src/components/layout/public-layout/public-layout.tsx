import type { FC } from 'react';
import { type IPublicLayoutProps, publicLayoutPropTypes } from '../types';

import styles from './public-layout.module.scss';

export const PublicLayout: FC<IPublicLayoutProps> = ({ children }) => {
	return <section className={styles.container}>{children}</section>;
};

PublicLayout.propTypes = publicLayoutPropTypes;
