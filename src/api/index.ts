import type { ICreateOrderRequest } from '../services/burgerOrder/types';

import { API_URL } from '../utils/config';

function handleResponse(res: Response) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(res);
	}
}

function request(endpoint: string, options: RequestInit) {
	return fetch(`${API_URL}${endpoint}`, options).then(handleResponse);
}

export const getIngredients = () => {
	return request('/ingredients', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};

export const createOrder = (data: ICreateOrderRequest) => {
	return request('/orders', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};
