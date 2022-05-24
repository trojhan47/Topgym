export type userType = "Partner" | "Driver" | "Customer" | "Staff";

export interface IUser {
	// firstname: string;
	name: string;
	email: string;
	telephone?: string;
	subscriptionStatus: string;
	username: string;
	type: userType;
	googleRef?: string;
	avatar?: string;
	lastSeen?: Date;
	createdAt?: Date;
	active: boolean;
	isEmailVerified: boolean;
	isTelephoneVerified: boolean;
	deleted: boolean;
}

export default IUser;
