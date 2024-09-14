import type { IIngredient } from '../../components/main/types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../api';

export const getIngredientList = createAsyncThunk<IIngredient[]>(
	'ingredientList/getIngredients',
	async () => {
		const response = await getIngredients();
		return response.data;
	}
);
