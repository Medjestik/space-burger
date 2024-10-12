import type { ReactNode } from 'react';

import PropTypes from 'prop-types';

export interface IPublicLayoutProps {
	children: ReactNode;
}

export const publicLayoutPropTypes = {
	children: PropTypes.node,
};
