/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc subscription pricing
 * @access Public
 *
 */

import { Request, Response } from "express";

import Sub from "../../models/Subscription";
import Log from "../../middlewares/Log";
import { defaults } from "lodash";

class Staff {
	/**
	 * createSubscription
	 */
	public static async createSubscription(req: Request, res: Response) {
		const { name, amount, duration, type } = req.body;

		if (!name.startsWith(`${type}`)) {
			return res
				.status(300)
				.json({ message: "name must start with type of subscription" });
		}

		try {
			const sub = await Sub.create({
				name,
				amount,
				duration,
				type,
			});

			if (sub) {
				res.status(200).json({ message: " Subscription created successfully" });
			} else {
				res.status(400).json({ message: "Unable to create subscription" });
			}
		} catch (error: any) {
			res.status(500).json(error.message);
		}
	}

	/**
	 * listSubscriptions
	 */
	public static async listSubscriptions(req: Request, res: Response) {
		try {
			const sub = await Sub.find();
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
	 * getSubscriptionByType
	 */
	public static async getSubscriptionByType(req: Request, res: Response) {
		const { type = "" } = req.body;

		try {
			const sub = await Sub.find({
				type,
			});
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
	 * editSubscription
	 */
	public static async editSubscription(req: Request, res: Response) {
		/*	const name = req.params.name;
		const query = { type: `${name}` };
*/

		try {
			const subDoc = await Sub.findOne({
				_id: req.params.id,
			}).lean();
			if (subDoc) {
				res.status(200).json(subDoc);
			} else {
				res.send("unable fetch subscription");
			}
		} catch (error: any) {
			res.status(500).json(error.message);
		}
	}

	/**
	 * updateSubscription
	 */
	public static async updateSubscription(req: Request, res: Response) {
		try {
			let sub = await Sub.findById(req.params.id).lean();

			if (!sub) {
				res.status(400).json({ message: "subscription does not exist" });
			}

			sub = await Sub.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			});
			if (!sub) {
				res.status(400).json({ message: "Unable to update subscription" });
			}
			res.status(200).json({ message: "Subscription updated successfully" });
		} catch (error: any) {
			res.status(500).json(error.message);
		}
	}
}

// class Customer {
// 	/**
// 	 * getSubscriptionByType
// 	 */
// 	public static async getSubscriptionByType(req: Request, res: Response) {
// 		const type = req.body;
// 		const query = { type: `${type}` };

// 		try {
// 			const sub = Sub.find(query);
// 			if (sub) {
// 				res.status(200).json(sub);
// 			} else {
// 				res.send("unable fetch subscriptions");
// 			}
// 		} catch (error: any) {
// 			res.status(500).json(error.message);
// 		}
// 	}

// 	/**
// 	 * price
// 	 * @route GET /api/sub
// 	 */
// 	public static async price(req: Request, res: Response) {
// 		const { accountType, duration } = req.body;

// 		let singleDoc;
// 		let query;

// 		query = { name: "single" };
// 		singleDoc = await Sub.find(query).exec((err: any, res: any) => {
// 			if (err) {
// 				Log.error(err.message);
// 			}
// 			Log.info(res);
// 			return res;
// 		});

// 		if (!accountType) {
// 			return res.status(400).json({
// 				message: " Please select Account type",
// 			});
// 		}
// 		if (!duration) {
// 			return res.status(400).json({
// 				message: " Please select subscription duration",
// 			});
// 		}
// 	}
// }

export default Staff;
