import { Request, Response, NextFunction } from "express";
import {
	S3,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import stream from "stream";
import multer from "multer";

import Locals from "../providers/Locals";
import Log from "../middlewares/Log";
import Gen from "../utils/Gen";

class MediaService {
	private client: S3;

	private endpoint = Locals.config().topgymBucketEndpoint;

	private topgymBucketEndpoint = Locals.config().topgymBucketEndpoint;

	private topgymBucketSubdomainEndpoint =
		Locals.config().topgymBucketSubdomainEndpoint;

	private region = Locals.config().bucketRegion;

	private accessKeyId = Locals.config().bucketKey;

	private secretAccessKey = Locals.config().bucketSecret;

	constructor() {
		this.client = new S3({
			endpoint: this.endpoint,
			region: this.region,
			credentials: {
				accessKeyId: this.accessKeyId,
				secretAccessKey: this.secretAccessKey,
			},
		});

		this.multerClient = this.multerClient.bind(this);
		this.parseRequest = this.parseRequest.bind(this);
		this.bufferToStream = this.bufferToStream.bind(this);
		this.upload = this.upload.bind(this);
		this.delete = this.delete.bind(this);
	}

	public multerClient = multer({
		storage: multer.memoryStorage(),
		limits: { fileSize: 2 * 1024 * 1024 }, // Default limit is 2mb
		fileFilter: (req, file, cb) => {
			if (
				["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(
					file.mimetype
				)
			) {
				cb(null, true);
			} else {
				cb(null, false);
				const err = new Error(
					"Only .png, .jpg, .jpeg and .pdf format allowed!"
				);
				err.name = "ExtensionError";

				return cb(err);
			}
		},
	}).any();

	public parseRequest(req: Request, res: Response, next: NextFunction) {
		this.multerClient(req, res, (err) => {
			if (err instanceof multer.MulterError) {
				Log.info(`<< Multer error while parsing request >>`);
				Log.error(`${err.message}`);
				return next(err);
			}

			if (err) {
				Log.info(`<< Unknown error while parsing request >>`);
				Log.error(`${err.message}`);
				return next(err);
			}

			return next();
		});
	}

	private bufferToStream(buffer: any) {
		const { Duplex } = stream;
		const duplexStream = new Duplex();
		duplexStream.push(buffer);
		duplexStream.push(null);
		return duplexStream;
	}

	public async upload(bucket: string, file: any) {
		try {
			const Key = await Gen.generateFileKey();

			await this.client.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key,
					Body: file.buffer,
					ACL: "public-read",
					ContentType: file.type || file.mimetype,
					// ContentDisposition: "attachment",
					ContentLength: file.size,
				})
			);

			Log.debug("file", {
				name: file.name || file.originalname,
				ContentType: file.type || file.mimetype,
				size: file.size,
			});

			const data = {
				url: `${this.topgymBucketEndpoint}/${Key}`,
				subDomainUrl: `${this.topgymBucketSubdomainEndpoint}/${Key}`,
				key: Key,
				/* name: file.originalname.replace(/\s+/g, "-").toLowerCase(),
				type: file.mimetype,
				size: file.size, */
			};

			return Promise.resolve(data);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async delete(bucket: string, key: string) {
		try {
			const data = await this.client.send(
				new DeleteObjectCommand({
					Bucket: bucket,
					Key: key,
				})
			);

			return Promise.resolve(data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

export default new MediaService();
