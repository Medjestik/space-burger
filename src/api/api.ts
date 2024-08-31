import { API_URL } from '../utils/config';

function handleResponse(res: Response) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(res);
	}
}

export const getIngredients = () => {
	return fetch(`${API_URL}/ingredients `, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then((res) => handleResponse(res));
};
