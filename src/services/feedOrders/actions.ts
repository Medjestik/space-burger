import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'FEED_ORDERS_CONNECT'>(
	'FEED_ORDERS_CONNECT'
);
export const wsDisconnect = createAction('FEED_ORDERS_DISCONNECT');
