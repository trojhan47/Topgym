import mongoose from "../providers/Database";
import IStaff from "../interfaces/models/Staff";
import { AddressSchema } from "./Location";

export type TStaffDoc = mongoose.Document & IStaff;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const StaffSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User", required: true, unique: true },
	ref: { type: String, required: true, unique: true },
	role: { type: ObjectId, ref: "Role", required: true },
	referrer: { type: ObjectId, ref: "Staff" },
	billingAddress: AddressSchema,
	createdAt: { type: Date, default: Date.now },
});

const Staff = mongoose.model<TStaffDoc>("Staff", StaffSchema);

export default Staff;
