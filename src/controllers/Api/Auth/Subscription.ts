/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc subscription pricing
 * @access Private
 *
 */

import { Request, Response } from "express";

import Sub from "../../../models/Subscription";
import Log from "../../../middlewares/Log";

class Subscription {
	/**
   * price
   * @route GET /api/sub
   */
	public static async price(req: Request, res: Response) {
		const basePrice = Number(2500000);
		const { accountType, duration } = req.body;

		let singleDoc;
		let singlesDoc;
		let query;

		query = { name: "single" };
		singleDoc = await Sub.find(query).exec((err: any, res: any) => {
			if (err) {
				Log.error(err.message);
			}
			Log.info(res);
			return res;
		});

		const agg = [
			{
				$match: {
					name: "single",
				},
			},
			{
				$project: {
					_id: 0,
					__v: 0,
					createdAt: 0,
				},
			},
		];

		singlesDoc = await Sub.aggregate(agg);
		// Log.info(`${singlesDoc}`);

		// return res.send(`${singleDoc}`);
		res.status(200).json(singleDoc);

		const single = {
			basic: basePrice,
			standard: `${basePrice * 2}`,
			premium: `${basePrice * 3.6}`,
			unique: `${basePrice * 6}`,
		};

		const couple = {
			basic: `${basePrice * 1.8}`,
			standard: `${basePrice * 3.6}`,
			premium: `${basePrice * 6.4}`,
			unique: `${basePrice * 10.4}`,
		};

		const corporate = {
			basic: `${basePrice * 4}`,
			standard: `${basePrice * 10.4}`,
			premium: `${basePrice * 18}`,
			unique: `${basePrice * 32}`,
		};

		if (!accountType) {
			return res.status(400).json({
				message: " Please select Account type",
			});
		}
		if (!duration) {
			return res.status(400).json({
				message: " Please select Subscription duration",
			});
		}

		if (accountType === "single" && duration === "1 Month") {
			return res.status(200).json(single.basic);
		}
		if (accountType === "single" && duration === "3 Month") {
			return res.status(200).json(single.standard);
		}
		if (accountType === "single" && duration === "6 Month") {
			return res.status(200).json(single.premium);
		}
		if (accountType === "single" && duration === "12 Month") {
			return res.status(200).json(single.unique);
		}

		if (accountType === "couple" && duration === "1 Month") {
			return res.status(200).json(couple.basic);
		}
		if (accountType === "couple" && duration === "3 Month") {
			return res.status(200).json(couple.standard);
		}
		if (accountType === "couple" && duration === "6 Month") {
			return res.status(200).json(couple.premium);
		}
		if (accountType === "couple" && duration === "12 Month") {
			return res.status(200).json(couple.unique);
		}

		if (accountType === "corporate" && duration === "1 Month") {
			return res.status(200).json(corporate.basic);
		}
		if (accountType === "corporate" && duration === "3 Month") {
			return res.status(200).json(corporate.standard);
		}
		if (accountType === "corporate" && duration === "6 Month") {
			return res.status(200).json(corporate.premium);
		}
		if (accountType === "corporate" && duration === "12 Month") {
			return res.status(200).json(corporate.unique);
		}
	}

	/**
   * createSubscription
   */
	public static async createSubscription(req: Request, res: Response) {
		const { subType, amount, duration, sub } = req.body;

		try {
			const sue = await Sub.create({
				name: subType,
				amount,
				duration,
				sub,
			});

			if (sue) {
				res.status(200).json({ message: " Subscription created successfully" });
			} else {
				res.send("error");
			}
		} catch (error: any) {
			res.status(500).json(error.message);
		}
	}
}

export default Subscription;
