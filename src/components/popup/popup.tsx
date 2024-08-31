import type { FC } from 'react';
import { type IPopupProps, popupPropTypes } from './types';

import ReactDOM from 'react-dom';

import { createRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useOnPressEsc from '../../hooks/useOnPressEsc';

import styles from './popup.module.scss';

const Popup: FC<IPopupProps> = ({
	isOpen,
	onClose,
	title,
	closeByClickOutside = true,
	closeByPressEsc = true,
	children,
}) => {
	const containerRef = createRef<HTMLDivElement>();
	const popupRoot = document.getElementById('popup-root');

	useOnClickOutside(containerRef, closeByClickOutside ? onClose : undefined);
	useOnPressEsc(closeByPressEsc ? onClose : undefined);

	const popupContent = (
		<div className={`${styles.popup} ${isOpen ? styles.popup_opened : ''}`}>
			<div ref={containerRef} className={styles.container}>
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

	return ReactDOM.createPortal(popupContent, popupRoot || document.body);
};

Popup.propTypes = popupPropTypes;

export default Popup;
