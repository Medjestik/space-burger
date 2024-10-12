import type { FC, FormEvent } from 'react';
import type { TRootState } from '../../services/store';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { PublicLayout } from '../../components/layout/public-layout/public-layout';
import { Form } from '../../components/form/form';
import { FormSubmit } from '../../components/form/form-submit/form-submit';
import { FormLinks } from '../../components/form/form-links/form-links';

import { EROUTES } from '../../utils/routes';

import { forgotPasswordUser } from '../../services/auth/actions';

interface IForgotPasswordForm {
	email: string;
}

const links = [
	{
		text: 'Вспомнили пароль?',
		label: 'Войти',
		url: EROUTES.LOGIN,
	},
];

export const ForgotPasswordPage: FC = () => {
	const navigate = useNavigate();
	const { isLoading } = useSelector((state: TRootState) => state.auth);

	const { values, handleChange } = useForm<IForgotPasswordForm>({
		email: '',
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			forgotPasswordUser(values).then(() => {
				localStorage.setItem('fromForgotPassword', 'true');
				navigate(EROUTES.RESET_PASSWORD);
			});
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	return (
		<PublicLayout>
			<Form
				title='Восстановление пароля'
				name='form-forgot-password'
				onSubmit={handleSubmit}>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					placeholder='Укажите e-mail'
					isIcon={false}
				/>
				<FormSubmit text='Восстановить' isBlock={isLoading} />
			</Form>
			<FormLinks links={links} />
		</PublicLayout>
	);
};
