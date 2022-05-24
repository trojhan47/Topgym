import IAddress from "./address";

type geolocationType = "Point" | "Polygon";

export interface IGeolocation {
	type: geolocationType;
	coordinates: number[]; // [longitude, latitude]
}

export interface ILocation {
	geolocation: IGeolocation;
	address: IAddress;
	createdAt?: Date;
}

export default ILocation;
