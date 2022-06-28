import Media from "../models/Media";
import MediaSrv from "../services/Media";
import Locals from "../providers/Locals";

export default class MediaUtil {
	/**
	 * createOne
	 */
	public static async createOne({
		file,
		ownerRef,
		ownerModel,
		category,
	}: {
		file: any;
		ownerRef: string;
		ownerModel: string;
		category: string;
	}) {
		let mediaDoc: any;
		let uploadResponse: any;
		const mediaObj: any = {};

		try {
			uploadResponse = await MediaSrv.upload("topgym-profile-avatars", file);
		} catch (error) {
			return Promise.reject(error);
		}

		if (!uploadResponse) {
			return Promise.reject(new Error("Could not upload Media"));
		}

		mediaObj.preview = uploadResponse.subDomainUrl;
		mediaObj.key = uploadResponse.key;
		(mediaObj.name = file.name.replace(/\s+/g, "-").toLowerCase()),
			(mediaObj.type = file.type);
		mediaObj.size = file.size;
		mediaObj.owner = ownerRef;
		mediaObj.ownerModel = ownerModel;
		mediaObj.category = category;

		try {
			mediaDoc = new Media(mediaObj);

			await mediaDoc.save();
		} catch (error: any) {
			return Promise.reject(error);
		}

		return Promise.resolve(mediaDoc);
	}
}
