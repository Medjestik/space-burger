export interface IOrderData {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export interface ICreateOrderRequest {
	ingredients: string[];
}
