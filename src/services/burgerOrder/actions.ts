import type { IOrderData, ICreateOrderRequest } from './types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from '../../api';

export const createBurgerOrder = createAsyncThunk<
	IOrderData,
	ICreateOrderRequest
>('burgerOrder/createOrder', async (orderData) => {
	const response = await createOrder(orderData);
	return response;
});
