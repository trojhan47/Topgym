import IRole from "./role";
import IUser from "./user";
import IAddress from "./address";

export interface IStaff {
	user: string | IUser;
	ref: string;
	role: string | IRole;
	referrer?: string | IStaff;
	balance: number;
	pin?: string;
	billingAddress: IAddress;
	createdAt?: Date;
}

export default IStaff;
