import type { FC } from 'react';
import {
	type IConstructorElementBun,
	EConstructorElementBunPosition,
} from '../types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const ConstructorElementBun: FC<IConstructorElementBun> = ({
	bun,
	position,
}) => {
	return (
		<ConstructorElement
			text={`${bun.name} ${
				position === EConstructorElementBunPosition.TOP ? ' (верх)' : ' (низ)'
			}`}
			price={bun.price}
			thumbnail={bun.image}
			type={position === EConstructorElementBunPosition.TOP ? 'top' : 'bottom'}
			isLocked={true}
			extraClass='ml-8'
		/>
	);
};
