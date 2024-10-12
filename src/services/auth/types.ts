export interface IUser {
	email: string;
	name: string;
}

export interface IAuthState {
	user: IUser | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface IUpdateUserRequest {
	email: string;
	password: string;
	name: string;
}

export interface ITokenRequest {
	token: string;
}

export interface IForgotPasswordRequest {
	email: string;
}

export interface IResetPasswordRequest {
	password: string;
	token: string;
}

export interface IAuthResponse {
	success: boolean;
	user: IUser;
	accessToken: string;
	refreshToken: string;
}

export interface IUserResponse {
	success: boolean;
	user: IUser;
}

export interface ITokenResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

export interface IMessageResponse {
	success: boolean;
	message: string;
}
