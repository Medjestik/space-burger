import type { FC } from 'react';
import type { IModalProps } from './types';

import ReactDOM from 'react-dom';

import { ModalOverlay } from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useOnPressEsc from '../../hooks/useOnPressEsc';

import styles from './modal.module.scss';

export const Modal: FC<IModalProps> = ({
	isOpen,
	onClose,
	title,
	closeByClickOutside = true,
	closeByPressEsc = true,
	children,
}) => {
	const modalRoot = document.getElementById('modal-root');

	useOnPressEsc(closeByPressEsc ? onClose : undefined);

	const handleOverlayClick = () => {
		if (closeByClickOutside) {
			onClose();
		}
	};

	const modalContent = (
		<div className={`${styles.modal} ${isOpen ? styles.modal_opened : ''}`}>
			{isOpen && <ModalOverlay onClick={handleOverlayClick} />}
			<div className={styles.container}>
				<div className={`${styles.header} mb-4`}>
					<h2 className='text text_type_main-medium'>{title || ''}</h2>
					<button
						className={`${styles.close} ml-8`}
						type='button'
						onClick={onClose}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</div>
	);

	return ReactDOM.createPortal(modalContent, modalRoot || document.body);
};
