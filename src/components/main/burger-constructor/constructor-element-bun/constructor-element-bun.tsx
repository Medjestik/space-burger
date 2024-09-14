import type { FC } from 'react';
import {
	type IConstructorElementBun,
	EConstructorElementBunPosition,
	constructorElementBunPropTypes,
} from '../types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorElementBun: FC<IConstructorElementBun> = ({
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

ConstructorElementBun.propTypes = constructorElementBunPropTypes;

export default ConstructorElementBun;
