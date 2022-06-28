import mongoose from "../providers/Database";
import ICustomer from "../interfaces/models/customer";
import { AddressSchema } from "./Location";

export type TCustomerDoc = mongoose.Document & ICustomer;

const ObjectId = mongoose.Schema.Types.ObjectId;

const ActiveSubSchema = new mongoose.Schema({
	startDate: { type: Date },
	endDate: { type: Date },
	amount: { type: Number },
	transaction: { type: mongoose.Schema.Types.Mixed },
});

export const CustomerSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User", required: true, unique: true },
	ref: { type: String, required: true, unique: true },
	role: { type: ObjectId, ref: "Role", required: true },
	referrer: { type: ObjectId, ref: "Customer" },
	billingAddress: AddressSchema,
	subscription: ActiveSubSchema,
	createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model<TCustomerDoc>("Customer", CustomerSchema);

export default Customer;
