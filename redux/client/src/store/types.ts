export interface RootState {
	cash: {
		cash: number;
	}
	customers: {
		customers: Customer[];
	} 
}

export interface Customer {
	id: number;
	name: string;
}