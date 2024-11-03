import type { IOrder } from '../../components/orders/types';

export interface IOrderData {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export interface ICreateOrderRequest {
	ingredients: string[];
}

export interface IGetOrderResponse {
	status: boolean;
	orders: IOrder[];
}

export interface IBurgerOrderStore {
	orderData: IOrderData | null;
	currentOrder: IOrder | null;
	loading: boolean;
	error: string | null;
}
