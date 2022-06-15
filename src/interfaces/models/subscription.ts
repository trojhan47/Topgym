export interface ISubscription {
	name: string;
	type: string;
	amount: number;
	duration: string;
	createdAt?: Date;
}

export default ISubscription;
