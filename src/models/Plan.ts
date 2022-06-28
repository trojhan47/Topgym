import mongoose from "../providers/Database";
import IPlan from "../interfaces/models/plan";

export type PlanDocument = mongoose.Document & IPlan;

export const PlanSchema = new mongoose.Schema({
	name: { type: String, required: true },
	duration: { type: String, required: true }, // Stored in days
});

const Plan = mongoose.model<PlanDocument>("Plan", PlanSchema);

export default Plan;
