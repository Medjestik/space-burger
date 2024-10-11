import { NavigateFunction } from 'react-router-dom';

export const handleModalClose = (navigate: NavigateFunction) => {
	navigate(-1);
};
