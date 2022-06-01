/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc subscription pricing
 * @access Private
 *
 */

import { Request, Response } from "express";
import Log from "../../../middlewares/Log";

class Pricing {
	/**
   * price
   */
	public static async price(req: Request, res: Response) {
		const basePrice = Number(25000);
		const { accountType, duration } = req.body;

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
}

export default Pricing;
