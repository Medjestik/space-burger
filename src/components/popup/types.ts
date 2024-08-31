import type { PropsWithChildren } from 'react';
import type { IIngredient } from '../main/types';

import PropTypes from 'prop-types';

export interface IPopupProps extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	closeByClickOutside?: boolean;
	closeByPressEsc?: boolean;
}

export interface IDetailIngredientPopupProps extends IPopupProps {
	ingredient?: IIngredient;
}

export const popupPropTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	closeByClickOutside: PropTypes.bool,
	closeByPressEsc: PropTypes.bool,
	children: PropTypes.node,
};
