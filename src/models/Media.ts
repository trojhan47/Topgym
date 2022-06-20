import mongoose from "../providers/Database";
import IMedia from "../interfaces/models/media";

export type MediaDocument = mongoose.Document & IMedia;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const MediaSchema = new mongoose.Schema({
	name: { type: String, required: true },
	key: { type: String, required: true },
	type: { type: String, required: true },
	size: { type: Number, required: true },
	preview: { type: String, required: true },
	category: { type: String },
	owner: { type: ObjectId, refPath: "ownerType", required: true },
	ownerModel: {
		type: String,
		required: true,
		default: "User",
	},

	createdAt: { type: Date, default: Date.now },
});

const Media = mongoose.model<MediaDocument>("Media", MediaSchema);

export default Media;
