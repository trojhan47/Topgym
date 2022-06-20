import mongoose from "../providers/Database";
import ITransaction from "../interfaces/models/transaction";

export type TransactionDocument = mongoose.Document & ITransaction;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const TransactionSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User", required: true, unique: true },
	type: { type: String, enum: ["debit", "credit"], required: true },

	email: { type: String, required: true },
	ref: { type: String, required: true, unique: true },

	amount: { type: String, required: true },
	paystackRef: { type: String, required: true },
	meta: { type: mongoose.Schema.Types.Mixed },
	createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model<TransactionDocument>(
	"Transaction",
	TransactionSchema
);

export default Transaction;
