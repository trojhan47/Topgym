/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc subscription pricing
 * @access Public
 *
 */

import Locals from "../providers/Locals";
import axios, { AxiosInstance } from "axios";
import { Request, Response } from "express";
import Log from "../middlewares/Log";

class Paystack {
	private client: AxiosInstance | undefined;

	private static secretTestKey = Locals.config().paystackSecretKeyTest;
	private static url: "https://api.paystack.co/transaction/initialize";

	/**
	 * initializePayment
	 */
	public static async initializePayment(
		form: any,
		myCallback: any,
		req: Request,
		res: Response
	) {
		const { email = "", plan = "", type = "", amount = "" } = req.body;

		form = JSON.stringify({
			email,
			plan,
			type,
			amount,
		});
		const options = {
			headers: {
				authorization: this.secretTestKey,
				"content-type": "application/json",
				"cache-control": "no-cache",
			},
			form,
		};
		const callback = (error: any, res: Response, body: any) => {
			return myCallback(error, body);
		};
		// request.post(options,callback);

		axios.post(this.url, options /*callback()*/);
	}

	/**
	 *
	 * verifyPayment
	 */
	/*
	public static async verifyPayment(req: Request, res: Response) {
		const options = {
			hostname: "api.paystack.co",
			port: 443,
			path: "/transaction/verify/:reference",
			method: "GET",
			headers: {
				Authorization: "Bearer SECRET_KEY",
			},
		};
		https
			.request(options, (res: Request) => {
				let data = "";
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("end", () => {
					Log.info(data);
				});
			})
			.on("error", (error: any) => {
				Log.error(error.message);
			});
	}
	*/
}
