import type { PropsWithChildren } from 'react';

import PropTypes from 'prop-types';

export interface IModalProps extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	closeByClickOutside?: boolean;
	closeByPressEsc?: boolean;
}

export interface IModalOverlayProps {
	onClick: () => void;
}

export const modalPropTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	closeByClickOutside: PropTypes.bool,
	closeByPressEsc: PropTypes.bool,
	children: PropTypes.node,
};

export const modalOverlayPropTypes = {
	onClick: PropTypes.func.isRequired,
};
