import mongoose from "../providers/Database";
import ISubscription from "../interfaces/models/subscription";

export type SubscriptionDocument = mongoose.Document & ISubscription;

export const SubscriptionSchema = new mongoose.Schema({
	name: { type: String, required: true },
	amount: { type: Number, required: true },
	duration: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model<SubscriptionDocument>(
	"Subscription",
	SubscriptionSchema
);

export default Subscription;
