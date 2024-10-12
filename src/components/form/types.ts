import type { ReactNode, FormEventHandler } from 'react';

import PropTypes from 'prop-types';

export interface IFormProps {
	title?: string;
	name: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
	children: ReactNode;
}

export interface IFormSubmitProps {
	text: string;
	isBlock?: boolean;
}

export interface IFormLink {
	text: string;
	label: string;
	url: string;
}

export interface IFormLinksProps {
	links: IFormLink[];
}

export const formPropTypes = {
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export const formSubmitPropTypes = {
	text: PropTypes.string.isRequired,
	isBlock: PropTypes.bool,
};

export const linkTypes = {
	text: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export const linkPropTypes = PropTypes.shape(linkTypes).isRequired;

export const formLinksPropTypes = {
	links: PropTypes.arrayOf(linkPropTypes).isRequired,
};
