import ILocation from "../interfaces/models/location";
import mongoose from "../providers/Database";

export type TLocationDoc = mongoose.Document & ILocation;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const AddressSchema = new mongoose.Schema(
	{
		country: { type: String, required: true },
		state: { type: String, required: true },
		locality: { type: String },
		street: { type: String, required: true },
		suite: { type: String },
		zip: { type: String },
		landmark: { type: String },
	},
	{ _id: false }
);

export const GeolocationSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["Point", "Polygon"],
	},
	coordinates: { type: [Number] },
});

export const LocationSchema = new mongoose.Schema({
	geolocation: GeolocationSchema,
	address: AddressSchema,
	createdAt: { type: Date, default: Date.now },
});

LocationSchema.index({ geolocation: "2dsphere" });

const Location = mongoose.model<TLocationDoc>("Location", LocationSchema);

export default Location;
