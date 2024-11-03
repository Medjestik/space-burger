import type { IOrdersData } from '../../components/orders/types';
import { WebsocketStatus } from '../middleware/types';

export interface IProfileOrdersStore {
	status: WebsocketStatus;
	ordersData: IOrdersData;
	connectionError: string | null;
}
