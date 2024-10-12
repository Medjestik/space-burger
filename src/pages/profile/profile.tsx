import type { FC } from 'react';

import { Routes, Route } from 'react-router-dom';

import { ProfileNav } from './profile-nav/profile-nav';
import { ProfileForm } from './profile-form/profile-form';
import { ProfileOrders } from './profile-orders/profile-orders';

import styles from './profile.module.scss';

export const ProfilePage: FC = () => {
	return (
		<div className={styles.container}>
			<ProfileNav />
			<Routes>
				<Route path='/' element={<ProfileForm />} />
				<Route path='/orders' element={<ProfileOrders />} />
			</Routes>
		</div>
	);
};
