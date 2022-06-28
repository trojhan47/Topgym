import mongoose from "../providers/Database";
import ISubscription from "../interfaces/models/subscription";

export type SubscriptionDocument = mongoose.Document & ISubscription;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const SubscriptionSchema = new mongoose.Schema({
	name: { type: String, required: true },
	duration: { type: Number, required: true }, // Stored in days
	type: {
		type: String,
		enum: ["single", "couple", "corporate"],
		required: true,
	},
	amount: { type: String, required: true },
});

const Subscription = mongoose.model<SubscriptionDocument>(
	"Subscription",
	SubscriptionSchema
);

export default Subscription;
