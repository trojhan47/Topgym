import mongoose from "../providers/Database";
import ITransaction from "../interfaces/models/transaction";

export type TransactionDocument = mongoose.Document & ITransaction;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const TransactionSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User", required: true, unique: true },

	email: { type: String, required: true },

	amount: { type: String, required: true },
	reference: { type: String, required: true },
});

const Transaction = mongoose.model<TransactionDocument>(
	"Transaction",
	TransactionSchema
);

export default Transaction;
