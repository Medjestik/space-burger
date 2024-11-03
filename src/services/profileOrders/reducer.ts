import type { IOrdersData } from '../../components/orders/types';
import type { IProfileOrdersStore } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WebsocketStatus } from '../middleware/types';

const initialState: IProfileOrdersStore = {
	status: WebsocketStatus.OFFLINE,
	ordersData: { orders: [], total: 0, totalToday: 0 },
	connectionError: null,
};

export const profileOrdersSlice = createSlice({
	name: 'profileOrders',
	initialState,
	reducers: {
		wsConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		wsOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
		},
		wsClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
		},
		wsError: (state, action: PayloadAction<string>) => {
			state.connectionError = action.payload;
		},
		wsMessage: (state, action: PayloadAction<IOrdersData>) => {
			state.ordersData = action.payload;
		},
	},
	selectors: {
		getWebsocketStatus: (state) => state.status,
		getProfileOrders: (state) => state.ordersData,
	},
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
	profileOrdersSlice.actions;
export const { getWebsocketStatus, getProfileOrders } =
	profileOrdersSlice.selectors;
