import type { IAuthState } from './types';

import { createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: IAuthState = {
	user: null,
	isAuthChecked: false,
	isLoading: false,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(actions.setUser, (state, action) => {
				state.user = action.payload?.user || null;
			})
			.addCase(actions.updateUserData.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.updateUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(actions.updateUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(actions.loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(actions.loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(actions.registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(actions.registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(actions.logoutUser.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { setIsAuthChecked } = authSlice.actions;
export const { getIsAuthChecked, getUser } = authSlice.selectors;
