export interface ITransaction {
	// customer: string;
	// email: string;
	amount: number;
	// duration: string;
	// reference: string;
	type?: string; // debit or credit
	account: string;
	accountType: string; // customer or partner
	paystackRef?: string;
	meta?: any;
	createdAt?: Date;
}

export default ITransaction;
