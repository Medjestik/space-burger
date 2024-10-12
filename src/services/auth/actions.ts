import type {
	ILoginRequest,
	IRegisterRequest,
	ITokenRequest,
	IUpdateUserRequest,
	IForgotPasswordRequest,
	IResetPasswordRequest,
	IUserResponse,
	IAuthResponse,
	IMessageResponse,
} from './types';

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

import { setIsAuthChecked } from './reducer';

export const loginUser = createAsyncThunk<IAuthResponse, ILoginRequest>(
	'auth/login',
	api.login
);

export const registerUser = createAsyncThunk<IAuthResponse, IRegisterRequest>(
	'auth/register',
	api.register
);

export const logoutUser = createAsyncThunk<IMessageResponse, ITokenRequest>(
	'auth/logout',
	api.logout
);

export const forgotPasswordUser = async (
	data: IForgotPasswordRequest
): Promise<IMessageResponse> => {
	const response = await api.forgotPassword(data);
	return response;
};

export const resetPasswordUser = async (
	data: IResetPasswordRequest
): Promise<IMessageResponse> => {
	const response = await api.resetPassword(data);
	return response;
};

export const setUser = createAction<IUserResponse | null>('auth/setUser');

export const updateUserData = createAsyncThunk<
	IUserResponse,
	IUpdateUserRequest
>('auth/updateUser', async (data) => {
	const response = await api.updateUser(data);
	return response;
});

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			try {
				const user = await api.getUser();
				dispatch(setUser(user || null));
			} catch (error) {
				dispatch(setUser(null));
			} finally {
				dispatch(setIsAuthChecked(true));
			}
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
