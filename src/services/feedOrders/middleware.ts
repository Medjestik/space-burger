import type { IOrdersData } from '../../components/orders/types';

import { socketMiddleware } from '../middleware/socket-middleware';
import {
	wsConnect as wsConnectFeedOrders,
	wsDisconnect as wsDisconnectFeedOrders,
} from './actions';
import {
	wsConnecting as wsConnectingFeedOrders,
	wsOpen as wsOpenFeedOrders,
	wsClose as wsCloseFeedOrders,
	wsError as wsErrorFeedOrders,
	wsMessage as wsMessageFeedOrders,
} from './reducer';

export const feedOrdersMiddleware = socketMiddleware<unknown, IOrdersData>({
	connect: wsConnectFeedOrders,
	disconnect: wsDisconnectFeedOrders,
	onConnecting: wsConnectingFeedOrders,
	onOpen: wsOpenFeedOrders,
	onClose: wsCloseFeedOrders,
	onError: wsErrorFeedOrders,
	onMessage: wsMessageFeedOrders,
});
