import { EOrderStatus } from '../../components/orders/types';

export const mockFeedOrdersData = {
	orders: [
		{
			name: 'testOrder1',
			ingredients: [],
			_id: 'id1',
			status: EOrderStatus.CREATED,
			number: 1,
			createdAt: '2024-12-01T10:00:00Z',
			updatedAt: '2024-12-01T12:00:00Z',
		},
		{
			name: 'testOrder2',
			ingredients: [],
			_id: 'id2',
			status: EOrderStatus.DONE,
			number: 2,
			createdAt: '2024-11-01T10:00:00Z',
			updatedAt: '2024-11-01T12:00:00Z',
		},
	],
	total: 2,
	totalToday: 1,
};
