import { combineSlices } from '@reduxjs/toolkit';
import { ingredientListSlice } from './ingredientList/reducer';
import { ingredientDetailSlice } from './ingredientDetail/reducer';
import { burgerConstructorSlice } from './burgerConstructor/reducer';
import { burgerOrderSlice } from './burgerOrder/reducer';

export const rootReducer = combineSlices(
	ingredientListSlice,
	ingredientDetailSlice,
	burgerConstructorSlice,
	burgerOrderSlice
);
