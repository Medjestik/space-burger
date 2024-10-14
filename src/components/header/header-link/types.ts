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
