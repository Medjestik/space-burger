import type { TAppDispatch, TRootState } from '../services/store';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';

import {
	OnlyAuth,
	OnlyUnAuth,
} from '../components/protected-route/protected-route';
import { Preloader } from '../components/preloader/preloader';
import { Header } from '../components/header/header';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { NotFoundPage } from '../pages/not-found/not-found';
import { Modal } from '../components/modal/modal';
import { IngredientDetail } from '../pages/home/burger-ingredients/ingredients-detail/ingredients-detail';
import { OrdersDetail } from '../components/orders/orders-detail/orders-detail';

import { EROUTES } from '../utils/routes';
import { getIngredientList } from '../services/ingredientList/actions';
import { checkUserAuth } from '../services/auth/actions';
import { handleModalClose } from '../components/modal/modalHandlers';

import styles from './app.module.scss';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const dispatch: TAppDispatch = useAppDispatch();
	const { loading, error } = useSelector(
		(state: TRootState) => state.ingredientList
	);

	const fetchInitialData = async () => {
		await Promise.all([
			dispatch(checkUserAuth()),
			dispatch(getIngredientList()),
		]);
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	if (loading) {
		return <Preloader />;
	}

	if (!loading && error) {
		return <p>Ошибка: {error}</p>;
	}

	return (
		<div className={styles.page}>
			<Header />
			<Routes location={background || location}>
				<Route path={EROUTES.HOME} element={<HomePage />} />
				<Route path={EROUTES.FEED} element={<FeedPage />} />
				<Route path={`${EROUTES.FEED}/:number`} element={<OrdersDetail />} />
				<Route path={EROUTES.NOT_FOUND} element={<NotFoundPage />} />

				<Route
					path={EROUTES.LOGIN}
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					path={EROUTES.REGISTRATION}
					element={<OnlyUnAuth component={<RegisterPage />} />}
				/>
				<Route
					path={EROUTES.FORGOT_PASSWORD}
					element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
				/>
				<Route
					path={EROUTES.RESET_PASSWORD}
					element={<OnlyUnAuth component={<ResetPasswordPage />} />}
				/>

				<Route
					path={`${EROUTES.PROFILE}/*`}
					element={<OnlyAuth component={<ProfilePage />} />}
				/>

				<Route
					path={`${EROUTES.PROFILE}/orders/:number`}
					element={<OnlyAuth component={<OrdersDetail />} />}
				/>

				<Route
					path={`${EROUTES.INGREDIENTS}/:ingredientId`}
					element={<IngredientDetail title='Детали ингредиента' />}
				/>
			</Routes>

			{background && (
				<Routes>
					<Route
						path={`${EROUTES.INGREDIENTS}/:ingredientId`}
						element={
							<Modal
								isOpen={true}
								onClose={() => handleModalClose(navigate)}
								title='Детали ингредиента'>
								<IngredientDetail />
							</Modal>
						}
					/>
					<Route
						path={`${EROUTES.FEED}/:number`}
						element={
							<Modal isOpen={true} onClose={() => handleModalClose(navigate)}>
								<OrdersDetail />
							</Modal>
						}
					/>
					<Route
						path={`${EROUTES.PROFILE}/orders/:number`}
						element={
							<OnlyAuth
								component={
									<Modal
										isOpen={true}
										onClose={() => handleModalClose(navigate)}>
										<OrdersDetail />
									</Modal>
								}
							/>
						}
					/>
				</Routes>
			)}

			<div id='modal-root'></div>
		</div>
	);
};
