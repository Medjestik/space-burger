import type { ReactNode, FormEventHandler } from 'react';

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
