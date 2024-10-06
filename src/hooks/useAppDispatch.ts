import type { TAppDispatch } from '../services/store';

import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
