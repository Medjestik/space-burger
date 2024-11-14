import { initialState, authSlice } from './reducer';
import * as actions from './actions';
import { mockUser } from './mock';

describe('auth reducer', () => {
	it('initializes correctly', () => {
		const state = authSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('setIsAuthChecked updates isAuthChecked', () => {
		const action = {
			type: authSlice.actions.setIsAuthChecked.type,
			payload: true,
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('loginUser pending', () => {
		const action = { type: actions.loginUser.pending.type };
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isLoading: true,
			error: null,
		});
	});

	it('loginUser fulfilled', () => {
		const action = {
			type: actions.loginUser.fulfilled.type,
			payload: {
				user: mockUser,
				accessToken: 'token',
				refreshToken: 'refreshToken',
			},
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
			isLoading: false,
		});
	});

	it('loginUser rejected', () => {
		const action = {
			type: actions.loginUser.rejected.type,
			error: { message: 'Invalid credentials' },
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isLoading: false,
			error: 'Invalid credentials',
		});
	});

	it('registerUser pending', () => {
		const action = { type: actions.registerUser.pending.type };
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isLoading: true,
			error: null,
		});
	});

	it('registerUser fulfilled', () => {
		const action = {
			type: actions.registerUser.fulfilled.type,
			payload: {
				user: mockUser,
				accessToken: 'token',
				refreshToken: 'refreshToken',
			},
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
			isLoading: false,
		});
	});

	it('registerUser rejected', () => {
		const action = {
			type: actions.registerUser.rejected.type,
			error: { message: 'Email already in use' },
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isLoading: false,
			error: 'Email already in use',
		});
	});

	it('updateUserData pending', () => {
		const action = { type: actions.updateUserData.pending.type };
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isLoading: true,
			error: null,
		});
	});

	it('updateUserData', () => {
		const action = {
			type: actions.updateUserData.fulfilled.type,
			payload: { user: mockUser },
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isLoading: false,
		});
	});

	it('updateUserData rejected', () => {
		const action = {
			type: actions.updateUserData.rejected.type,
			error: { message: 'Failed to update user data' },
		};
		const state = authSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isLoading: false,
			error: 'Failed to update user data',
		});
	});

	it('logoutUser fulfilled', () => {
		const action = { type: actions.logoutUser.fulfilled.type };
		const state = authSlice.reducer(
			{ ...initialState, user: mockUser },
			action
		);
		expect(state).toEqual({
			...initialState,
			user: null,
		});
	});
});
