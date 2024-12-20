import type { FC, ReactElement } from 'react';
import type { IProtectedProps } from './types';

import { useSelector } from '../../services/store';
import { getIsAuthChecked, getUser } from '../../services/auth/reducer';
import { Navigate, useLocation } from 'react-router-dom';

import { Preloader } from '../preloader/preloader';

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
	<Protected onlyUnAuth={true} component={component} />
);
