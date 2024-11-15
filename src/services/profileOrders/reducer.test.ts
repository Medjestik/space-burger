import { initialState, profileOrdersSlice } from './reducer';
import { WebsocketStatus } from '../middleware/types';
import { mockProfileOrdersData } from './mock';

describe('feedOrders reducer', () => {
	it('initializes correctly', () => {
		const state = profileOrdersSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('wsConnecting status', () => {
		const action = { type: profileOrdersSlice.actions.wsConnecting.type };
		const state = profileOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('wsOpen status', () => {
		const action = { type: profileOrdersSlice.actions.wsOpen.type };
		const state = profileOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('wsClose status', () => {
		const action = { type: profileOrdersSlice.actions.wsClose.type };
		const state = profileOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
		});
	});

	it('wsError connectionError message', () => {
		const action = {
			type: profileOrdersSlice.actions.wsError.type,
			payload: 'Connection failed',
		};
		const state = profileOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			connectionError: 'Connection failed',
		});
	});

	it('wsMessage updates ordersData', () => {
		const action = {
			type: profileOrdersSlice.actions.wsMessage.type,
			payload: mockProfileOrdersData,
		};
		const state = profileOrdersSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			ordersData: mockProfileOrdersData,
		});
	});
});
