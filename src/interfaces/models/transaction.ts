export interface ITransaction {
	customer: string;
	email: string;
	amount: number;
	duration: string;
	reference: string;
	createdAt?: Date;
}

export default ITransaction;
