import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';

import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

import { feedOrdersMiddleware } from './feedOrders/middleware';
import { profileOrdersMiddleware } from './profileOrders/middleware';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(feedOrdersMiddleware)
			.concat(profileOrdersMiddleware);
	},
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<TAppDispatch>();
export const useSelector = selectorHook.withTypes<TRootState>();

export default store;
