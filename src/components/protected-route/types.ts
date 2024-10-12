import { ReactElement } from 'react';

export interface IProtectedProps {
	onlyUnAuth?: boolean;
	component: ReactElement;
}
