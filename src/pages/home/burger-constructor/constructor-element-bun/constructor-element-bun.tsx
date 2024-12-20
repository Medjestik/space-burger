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
		<div data-testid={position === EConstructorElementBunPosition.TOP ? `constructor-bun-top-${bun._id}` : `constructor-bun-bottom-${bun._id}`}>
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
		</div>
	);
};
