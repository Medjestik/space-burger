import { combineSlices } from '@reduxjs/toolkit';
import { ingredientListSlice } from './ingredientList/reducer';
import { burgerConstructorSlice } from './burgerConstructor/reducer';
import { burgerOrderSlice } from './burgerOrder/reducer';
import { authSlice } from './auth/reducer';

export const rootReducer = combineSlices(
	ingredientListSlice,
	burgerConstructorSlice,
	burgerOrderSlice,
	authSlice
);
