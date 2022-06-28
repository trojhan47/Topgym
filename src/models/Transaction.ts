import mongoose from "../providers/Database";
import ITransaction from "../interfaces/models/transaction";

export type TTransactionDoc = mongoose.Document & ITransaction;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const TransactionSchema = new mongoose.Schema({
	ref: { type: String, required: true, unique: true },
	type: { type: String, enum: ["debit", "credit"], required: true },
	account: { type: ObjectId, refPath: "accountType", required: true },
	accountType: { type: String, required: true, enum: ["Customer", "credit"] },
	paystackRef: { type: String },
	amount: { type: Number, required: true }, // in Kobo
	meta: { type: mongoose.Schema.Types.Mixed },
	createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model<TTransactionDoc>(
	"Transaction",
	TransactionSchema
);

export default Transaction;
