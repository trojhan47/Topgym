/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc subscription pricing
 * @access Private
 *
 */

import { Request, Response } from "express";

import Sub from "../../models/Subscription";
import Log from "../../middlewares/Log";

class CustomerSub {
	/**
	 * getSubscriptionByType
	 */
	public static async getSubscriptionByType(req: Request, res: Response) {
		const type = req.body;
		const query = { type: `${type}` };

		try {
			const sub = Sub.find(query);
			if (sub) {
				res.status(200).json(sub);
			} else {
				res.send("unable fetch subscriptions");
			}
		} catch (error: any) {
			res.status(500).json(error.message);
		}
	}

	/**
	 * price
	 * @route GET /api/sub
	 */
	public static async price(req: Request, res: Response) {
		const { accountType, duration } = req.body;

		let singleDoc;
		let query;

		query = { name: "single" };
		singleDoc = await Sub.find(query).exec((err: any, res: any) => {
			if (err) {
				Log.error(err.message);
			}
			Log.info(res);
			return res;
		});

		if (!accountType) {
			return res.status(400).json({
				message: " Please select Account type",
			});
		}
		if (!duration) {
			return res.status(400).json({
				message: " Please select subscription duration",
			});
		}
	}
}

export default CustomerSub;
