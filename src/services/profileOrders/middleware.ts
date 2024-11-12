import type { IOrdersData } from '../../components/orders/types';

import { socketMiddleware } from '../middleware/socket-middleware';
import {
	wsConnect as wsConnectProfileOrders,
	wsDisconnect as wsDisconnectProfileOrders,
} from './actions';
import {
	wsConnecting as wsConnectingProfileOrders,
	wsOpen as wsOpenProfileOrders,
	wsClose as wsCloseProfileOrders,
	wsError as wsErrorProfileOrders,
	wsMessage as wsMessageProfileOrders,
} from './reducer';

export const profileOrdersMiddleware = socketMiddleware<unknown, IOrdersData>({
	connect: wsConnectProfileOrders,
	disconnect: wsDisconnectProfileOrders,
	onConnecting: wsConnectingProfileOrders,
	onOpen: wsOpenProfileOrders,
	onClose: wsCloseProfileOrders,
	onError: wsErrorProfileOrders,
	onMessage: wsMessageProfileOrders,
});
