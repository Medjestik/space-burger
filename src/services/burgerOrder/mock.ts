import type { IOrderData, IGetOrderResponse } from './types';
import { EOrderStatus } from '../../components/orders/types';

export const mockOrderData: IOrderData = {
	name: 'test',
	order: {
		number: 1,
	},
	success: true,
};

export const mockOrderByNumberResponse: IGetOrderResponse = {
	status: true,
	orders: [
		{
			name: 'testOrder',
			ingredients: [],
			_id: 'id1',
			status: EOrderStatus.CREATED,
			number: 1,
			createdAt: '2024-11-01T10:00:00Z',
			updatedAt: '2024-11-01T12:00:00Z',
		},
	],
};
