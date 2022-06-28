import { Request, Response } from "express";
import axios, { AxiosInstance } from "axios";
import Locals from "../providers/Locals";
import * as crypto from "crypto";

class Payment {
	private client: AxiosInstance;

	private secretKeyTest = Locals.config().paystackSecretKeyTest;
	private secretKeyLive = Locals.config().paystackSecretKeyLive;

	private baseUrl = "https://api.paystack.co";

	private getOptions() {
		if (process.env.NODE_ENV === "production") {
			return {
				baseUrl: this.baseUrl,
				headers: {
					authorization: `Bearer ${this.secretKeyLive}`,
					"Content-Type": "application/json",
				},
			};
		} else {
			return {
				baseUrl: this.baseUrl,
				headers: {
					authorization: `Bearer ${this.secretKeyTest}`,
					"Content-Type": "application/json",
				},
			};
		}
	}

	constructor() {
		this.client = axios.create(this.getOptions());
	}

	/**
	 * verifyTransaction
	 */
	public async verifyTransaction(ref: string) {
		let resData;

		try {
			resData = await this.client.post(`/transaction/verify/:${ref}`);
		} catch (error: any) {
			return Promise.reject(error);
		}
		return Promise.resolve(resData);
	}

	/**
	 * handleWebhook
	 */
	public handleWebhook(req: Request, res: Response) {
		const secret =
			process.env.NODE_ENV === "production"
				? this.secretKeyLive
				: this.secretKeyTest;

		// Validate event

		const hash = crypto
			.createHmac("sha512", secret)
			.update(JSON.stringify(req.body))
			.digest("hex");

		if (hash === req.headers["x-paystack-signature"]) {
			// handle webhook statuses useful to business logic
			const { event, data } = req.body;

			switch (event) {
				case "charge.success": {
					break;
				}
				default:
					break;
			}
		}

		res.send(200);
	}
}

export default new Payment();
