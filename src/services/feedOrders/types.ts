import type { IOrdersData } from '../../components/orders/types';
import { WebsocketStatus } from '../middleware/types';

export interface IFeedOrdersStore {
	status: WebsocketStatus;
	ordersData: IOrdersData;
	connectionError: string | null;
}
