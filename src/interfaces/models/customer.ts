import IRole from "./role";
import IUser from "./user";
import IAddress from "./address";

export interface ICustomer {
	user: string | IUser;
	ref: string;
	role: string | IRole;
	referrer?: string | ICustomer;
	balance: number;
	pin?: string;
	billingAddress: IAddress;
	createdAt?: Date;
}

export default ICustomer;
