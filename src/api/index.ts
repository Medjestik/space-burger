import type { ICreateOrderRequest } from '../services/burgerOrder/types';
import type {
	ILoginRequest,
	IRegisterRequest,
	IUpdateUserRequest,
	ITokenRequest,
	IForgotPasswordRequest,
	IResetPasswordRequest,
} from '../services/auth/types';

import { API_URL } from '../utils/config';

const checkResponse = (res: Response) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = (endpoint: string, options: RequestInit) => {
	return fetch(`${API_URL}${endpoint}`, options).then(checkResponse);
};

const setTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const removeTokens = (tokens: string[]) => {
	tokens.forEach((token) => {
		if (localStorage.getItem(token)) {
			localStorage.removeItem(token);
		}
	});
};

export const login = (data: ILoginRequest) => {
	return request('/auth/login', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res) => {
		if (res.accessToken && res.refreshToken) {
			setTokens(res.accessToken, res.refreshToken);
		}
		return res;
	});
};

export const register = (data: IRegisterRequest) => {
	return request('/auth/register', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res) => {
		if (res.accessToken && res.refreshToken) {
			setTokens(res.accessToken, res.refreshToken);
		}
		return res;
	});
};

export const logout = (data: ITokenRequest) => {
	return request('/auth/logout', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res) => {
		removeTokens(['accessToken', 'refreshToken']);
		return res;
	});
};

export const refreshToken = () => {
	return request('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			setTokens(refreshData.accessToken, refreshData.refreshToken);
			return refreshData;
		});
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
	try {
		const res = await request(url, options);
		return res;
	} catch (err) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			if (options.headers && typeof options.headers === 'object') {
				(options.headers as Record<string, string>).authorization =
					refreshData.accessToken;
			} else {
				options.headers = {
					authorization: refreshData.accessToken,
				};
			}
			return await request(url, options);
		} else {
			return Promise.reject(err);
		}
	}
};

export const getUser = () => {
	return fetchWithRefresh('/auth/user', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('accessToken') || '',
		},
	});
};

export const updateUser = (data: IUpdateUserRequest) => {
	return fetchWithRefresh('/auth/user', {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify(data),
	});
};

export const forgotPassword = (data: IForgotPasswordRequest) => {
	return request('/password-reset', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};

export const resetPassword = (data: IResetPasswordRequest) => {
	return request('/password-reset/reset', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};

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
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify(data),
	});
};
