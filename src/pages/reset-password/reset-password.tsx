import type { FC, ChangeEvent, FormEvent } from 'react';
import type { TRootState } from '../../services/store';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { PublicLayout } from '../../components/layout/public-layout/public-layout';
import { Form } from '../../components/form/form';
import { FormSubmit } from '../../components/form/form-submit/form-submit';
import { FormLinks } from '../../components/form/form-links/form-links';

import { EROUTES } from '../../utils/routes';

import { resetPasswordUser } from '../../services/auth/actions';

interface IResetPasswordForm {
	password: string;
	token: string;
}

const links = [
	{
		text: 'Вспомнили пароль?',
		label: 'Войти',
		url: EROUTES.LOGIN,
	},
];

export const ResetPasswordPage: FC = () => {
	const navigate = useNavigate();
	const { isLoading } = useSelector((state: TRootState) => state.auth);

	const [formData, setFormData] = useState<IResetPasswordForm>({
		password: '',
		token: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			resetPasswordUser(formData).then(() =>
				localStorage.removeItem('fromForgotPassword')
			);
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	useEffect(() => {
		const fromForgotPassword = localStorage.getItem('fromForgotPassword');
		if (!fromForgotPassword || fromForgotPassword !== 'true') {
			navigate(EROUTES.FORGOT_PASSWORD);
		}
	}, [navigate]);

	return (
		<PublicLayout>
			<Form
				title='Восстановление пароля'
				name='form-reset-password'
				onSubmit={handleSubmit}>
				<PasswordInput
					onChange={handleChange}
					value={formData.password}
					name={'password'}
					placeholder={'Введите новый пароль'}
				/>
				<Input
					onChange={handleChange}
					value={formData.token}
					name={'token'}
					placeholder={'Введите код из письма'}
				/>
				<FormSubmit text='Сохранить' isBlock={isLoading} />
			</Form>
			<FormLinks links={links} />
		</PublicLayout>
	);
};
