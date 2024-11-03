export enum EOrderStatus {
	DONE = 'done',
	PENDING = 'pending',
	CREATED = 'created',
}

export interface IOrder {
	ingredients: string[];
	name: string;
	_id: string;
	status: EOrderStatus;
	number: number;
	createdAt: string;
	updatedAt: string;
}

export interface IOrdersData {
	orders: IOrder[];
	total: number;
	totalToday: number;
}

export interface IOrdersProps {
	orders: IOrder[];
	isShowStatus?: boolean;
}

export interface IOrdersCardProps {
	order: IOrder;
	isShowStatus: boolean;
}

export interface IOrdersIngredientProps {
	id: string;
	isLast: boolean;
	hideIngredientsCount: number;
}

export interface IOrdersBoardProps {
	orders: IOrder[];
}

export interface IOrdersStatusProps {
	status: EOrderStatus;
}
