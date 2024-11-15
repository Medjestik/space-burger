import { initialState, feedOrdersSlice } from './reducer';
import { WebsocketStatus } from '../middleware/types';
import { mockFeedOrdersData } from './mock';

describe('feedOrders reducer', () => {
	it('initializes correctly', () => {
		const state = feedOrdersSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('wsConnecting status', () => {
		const action = { type: feedOrdersSlice.actions.wsConnecting.type };
		const state = feedOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('wsOpen status', () => {
		const action = { type: feedOrdersSlice.actions.wsOpen.type };
		const state = feedOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('wsClose status', () => {
		const action = { type: feedOrdersSlice.actions.wsClose.type };
		const state = feedOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
		});
	});

	it('wsError connectionError message', () => {
		const action = {
			type: feedOrdersSlice.actions.wsError.type,
			payload: 'Connection failed',
		};
		const state = feedOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			connectionError: 'Connection failed',
		});
	});

	it('wsMessage updates ordersData', () => {
		const action = {
			type: feedOrdersSlice.actions.wsMessage.type,
			payload: mockFeedOrdersData,
		};
		const state = feedOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			ordersData: mockFeedOrdersData,
		});
	});
});
