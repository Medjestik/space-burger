import type { FC, FormEvent } from 'react';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../../services/store';
import { useForm } from '../../../hooks/useForm';

import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { Form } from '../../../components/form/form';
import { FormSubmit } from '../../../components/form/form-submit/form-submit';

import { updateUserData } from '../../../services/auth/actions';

import styles from './profile-form.module.scss';

interface IProfileForm {
	name: string;
	email: string;
	password: string;
}

export const ProfileForm: FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { values, handleChange, setValues } = useForm<IProfileForm>({
		name: user?.name || '',
		email: user?.email || '',
		password: '',
	});

	const [isBlockNameInput, setIsBlockNameInput] = useState<boolean>(true);
	const [isShowFormButtons, setIsShowFormButtons] = useState<boolean>(false);

	const nameInputRef = useRef<HTMLInputElement | null>(null);

	const onIconNameClick = () => {
		setIsBlockNameInput(false);
		setTimeout(() => nameInputRef.current?.focus(), 0);
	};

	const onNameInputBlur = () => {
		setIsBlockNameInput(true);
	};

	const handleClearForm = () => {
		setValues({
			name: user?.name || '',
			email: user?.email || '',
			password: '',
		});
		setIsShowFormButtons(false);
	};

	useEffect(() => {
		const isFormChange =
			values.name !== user?.name ||
			values.email !== user?.email ||
			values.password !== '';
		setIsShowFormButtons(isFormChange);
	}, [values, user?.name, user?.email]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUserData(values));
	};

	return (
		<div className={styles.container}>
			<Form name='form-profile' onSubmit={handleSubmit}>
				<Input
					onChange={handleChange}
					value={values.name}
					name={'name'}
					type={'text'}
					icon={'EditIcon'}
					ref={nameInputRef}
					onIconClick={onIconNameClick}
					onBlur={onNameInputBlur}
					disabled={isBlockNameInput}
					placeholder={'Имя'}
				/>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					isIcon={true}
					placeholder={'Логин'}
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					icon={'EditIcon'}
				/>
				{isShowFormButtons && (
					<div className={styles.buttons}>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={handleClearForm}>
							Отмена
						</Button>
						<FormSubmit text='Сохранить' />
					</div>
				)}
			</Form>
		</div>
	);
};
