import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'PROFILE_ORDERS_CONNECT'>(
	'PROFILE_ORDERS_CONNECT'
);
export const wsDisconnect = createAction('PROFILE_ORDERS_DISCONNECT');
