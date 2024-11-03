import type { IOrdersData } from '../../components/orders/types';
import type { IFeedOrdersStore } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WebsocketStatus } from '../middleware/types';

const initialState: IFeedOrdersStore = {
	status: WebsocketStatus.OFFLINE,
	ordersData: { orders: [], total: 0, totalToday: 0 },
	connectionError: null,
};

export const feedOrdersSlice = createSlice({
	name: 'feedOrders',
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
		getFeedOrders: (state) => state.ordersData,
	},
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
	feedOrdersSlice.actions;
export const { getWebsocketStatus, getFeedOrders } = feedOrdersSlice.selectors;
