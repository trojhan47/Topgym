/**
 * Define the Media Middlewares
 *
 *  @author Kennedy Oseni <kennyose01@gmail.com>
 */

import { Request, Response, NextFunction } from "express";
import validator from "validator";
import User from "../../models/User";

class MediaMw {
	public static async checkBadImageType(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const files = req.files;
		let uploadMimetypeError = false;
		let uploadSizeError = false;

		if (Array.isArray(files) && files.length > 0) {
			files.map((file) => {
				if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
					uploadMimetypeError = true;
				}

				if (file.size / 1024 / 1024 > 2) {
					uploadSizeError = true;
				}
			});
		}

		if (uploadMimetypeError) {
			return res.status(400).json({
				message:
					"one of the files uploaded has a bad mimetype. expected one of [png, jpg]",
			});
		}

		if (uploadSizeError) {
			return res.status(400).json({
				message:
					"one of the files uploaded has a size greater than the allowed size of 2mb",
			});
		}

		return next();
	}

	public static async checkBadFileType(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const files = req.files;
		let uploadMimetypeError = false;
		let uploadSizeError = false;

		if (Array.isArray(files) && files.length > 0) {
			files.map((file) => {
				if (
					!["image/jpeg", "image/png", "application/pdf"].includes(
						file.mimetype
					)
				) {
					uploadMimetypeError = true;
				}

				if (file.size / 1024 / 1024 > 2) {
					uploadSizeError = true;
				}
			});
		}

		if (uploadMimetypeError) {
			return res.status(400).json({
				message:
					"one of the files uploaded has a bad mimetype. expected one of [png, jpg, pdf]",
			});
		}

		if (uploadSizeError) {
			return res.status(400).json({
				message:
					"one of the files uploaded has a size greater than the allowed size of 2mb",
			});
		}

		return next();
	}
}

export default MediaMw;
