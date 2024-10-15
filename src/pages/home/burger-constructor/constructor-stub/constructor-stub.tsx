import type { FC } from 'react';
import { type IConstructorStubProps, EConstructorStubType } from '../types';

import styles from './constructor-stub.module.scss';

export const ConstructorStub: FC<IConstructorStubProps> = ({
	type = 'ingredient',
	isHover = false,
}) => {
	return (
		<div
			className={`text text_type_main-default ${styles.stub} ${
				type === EConstructorStubType.BUN_TOP
					? styles.stub_bun_top
					: type === EConstructorStubType.BUN_BOT
					? styles.stub_bun_bot
					: styles.stub_ingredient
			} ${isHover ? styles.stub_drag_hover : ''}`}>
			{type === EConstructorStubType.INGREDIENT
				? 'Выберите начинку'
				: 'Выберите булку'}
		</div>
	);
};
