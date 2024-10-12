import PropTypes from 'prop-types';

export enum EHeaderLink {
	Burger = 'burger',
	List = 'list',
	Profile = 'profile',
}

export interface INavLink {
	icon: EHeaderLink.Burger | EHeaderLink.List | EHeaderLink.Profile;
	text: string;
	url: string;
}

export const navLinkPropTypes = {
	icon: PropTypes.oneOf(Object.values(EHeaderLink)).isRequired,
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};
