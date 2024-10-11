import type { FC, ChangeEvent, FormEvent } from 'react';
import type { TRootState } from '../../services/store';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import {
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { PublicLayout } from '../../components/layout/public-layout/public-layout';
import { Form } from '../../components/form/form';
import { FormSubmit } from '../../components/form/form-submit/form-submit';
import { FormLinks } from '../../components/form/form-links/form-links';

import { EROUTES } from '../../utils/routes';

import { loginUser } from '../../services/auth/actions';

interface ILoginForm {
	email: string;
	password: string;
}

const links = [
	{
		text: 'Вы — новый пользователь?',
		label: 'Зарегистрироваться',
		url: EROUTES.REGISTRATION,
	},
	{
		text: 'Забыли пароль?',
		label: 'Восстановить пароль',
		url: EROUTES.FORGOT_PASSWORD,
	},
];

export const LoginPage: FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useSelector((state: TRootState) => state.auth);

	const [formData, setFormData] = useState<ILoginForm>({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser(formData));
	};

	return (
		<PublicLayout>
			<Form title='Вход' name='form-login' onSubmit={handleSubmit}>
				<EmailInput
					onChange={handleChange}
					value={formData.email}
					name={'email'}
					isIcon={false}
				/>
				<PasswordInput
					onChange={handleChange}
					value={formData.password}
					name={'password'}
				/>
				<FormSubmit text='Войти' isBlock={isLoading} />
			</Form>
			<FormLinks links={links} />
		</PublicLayout>
	);
};
