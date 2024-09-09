import PropTypes from 'prop-types';

export enum ENavLink {
	Burger = 'burger',
	List = 'list',
	Profile = 'profile',
}

export interface INavLink {
	icon: ENavLink.Burger | ENavLink.List | ENavLink.Profile;
	text: string;
	isActive?: boolean;
}

export const navLinkPropTypes = {
	icon: PropTypes.oneOf(Object.values(ENavLink)).isRequired,
	text: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
};
