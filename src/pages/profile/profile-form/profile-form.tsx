import type { FC, ChangeEvent, FormEvent } from 'react';
import type { TRootState } from '../../../services/store';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

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
	const dispatch = useAppDispatch();
	const { user } = useSelector((state: TRootState) => state.auth);
	const [formData, setFormData] = useState<IProfileForm>({
		name: user?.name || '',
		email: user?.email || '',
		password: '',
	});
	const [isBlockNameInput, setIsBlockNameInput] = useState<boolean>(true);
	const [isShowFormButtons, setIsShowFormButtons] = useState<boolean>(false);

	const nameInputRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const onIconNameClick = () => {
		setIsBlockNameInput(false);
		setTimeout(() => nameInputRef.current?.focus(), 0);
	};

	const onNameInputBlur = () => {
		setIsBlockNameInput(true);
	};

	const handleClearForm = () => {
		setFormData({
			name: user?.name || '',
			email: user?.email || '',
			password: '',
		});
		setIsShowFormButtons(false);
	};

	useEffect(() => {
		const isFormChange =
			formData.name !== user?.name ||
			formData.email !== user?.email ||
			formData.password !== '';
		setIsShowFormButtons(isFormChange);
	}, [formData, user?.name, user?.email]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUserData(formData));
	};

	return (
		<div className={styles.container}>
			<Form name='form-profile' onSubmit={handleSubmit}>
				<Input
					onChange={handleChange}
					value={formData.name}
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
					value={formData.email}
					name={'email'}
					isIcon={true}
					placeholder={'Логин'}
				/>
				<PasswordInput
					onChange={handleChange}
					value={formData.password}
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
