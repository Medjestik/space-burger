import type {
	IGetOrderResponse,
	IOrderData,
	ICreateOrderRequest,
} from './types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getOrder } from '../../api';

export const createBurgerOrder = createAsyncThunk<
	IOrderData,
	ICreateOrderRequest
>('burgerOrder/createOrder', async (orderData) => {
	const response = await createOrder(orderData);
	return response;
});

export const getOrderByNumber = createAsyncThunk<IGetOrderResponse, string>(
	'burgerOrder/getOrderByNumber',
	async (number) => {
		const response = await getOrder(number);
		return response;
	}
);
