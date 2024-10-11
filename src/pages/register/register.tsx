import type { FC, ChangeEvent, FormEvent } from 'react';
import type { TRootState } from '../../services/store';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import {
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { PublicLayout } from '../../components/layout/public-layout/public-layout';
import { Form } from '../../components/form/form';
import { FormSubmit } from '../../components/form/form-submit/form-submit';
import { FormLinks } from '../../components/form/form-links/form-links';

import { EROUTES } from '../../utils/routes';

import { registerUser } from '../../services/auth/actions';

interface IRegisterForm {
	name: string;
	email: string;
	password: string;
}

const links = [
	{
		text: 'Уже зарегистрированы?',
		label: 'Войти',
		url: EROUTES.LOGIN,
	},
];

export const RegisterPage: FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useSelector((state: TRootState) => state.auth);

	const [formData, setFormData] = useState<IRegisterForm>({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser(formData));
	};

	return (
		<PublicLayout>
			<Form title='Регистрация' name='form-register' onSubmit={handleSubmit}>
				<Input
					onChange={handleChange}
					value={formData.name}
					name={'name'}
					type={'text'}
					placeholder={'Имя'}
				/>
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
				<FormSubmit text='Зарегистрироваться' isBlock={isLoading} />
			</Form>
			<FormLinks links={links} />
		</PublicLayout>
	);
};
