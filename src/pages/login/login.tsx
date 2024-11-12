import type { FC, FormEvent } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';

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
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);

	const { values, handleChange } = useForm<ILoginForm>({
		email: '',
		password: '',
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser(values));
	};

	return (
		<PublicLayout>
			<Form title='Вход' name='form-login' onSubmit={handleSubmit}>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					isIcon={false}
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
				/>
				<FormSubmit text='Войти' isBlock={isLoading} />
			</Form>
			<FormLinks links={links} />
		</PublicLayout>
	);
};
