import { Request, Response } from "express";
import validator from "validator";
import moment from "moment";
import _ from "lodash";

import PaymentSrv from "../../services/Payment";

import mongoose from "../../providers/Database";
// import AccessControlProvider from "../../providers/AccessControl";

import Customer from "../../models/Customer";
import Transaction from "../../models/Transaction";

import UserDbQuery from "../../queries/User";

import Log from "../../middlewares/Log";

const ObjectId = mongoose.Types.ObjectId;

class PaymentCtr {
	/**
	 *
	 * verify a payment
	 * Expected to be called  by a customer
	 * @route POST /api/payment/verify/:paymentRef
	 */
	public static async verify(req: Request, res: Response) {
		const { paymentRef } = req.params;
		let paymentData: any;

		if (!["string"].includes(typeof paymentRef)) {
			return res.status(400).json({ message: "bad paymentRef" });
		}

		try {
			paymentData = await PaymentSrv.verifyTransaction(paymentRef);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		if (validator.isJSON(paymentData)) {
			paymentData = JSON.parse(paymentData);
		}

		if (!paymentData.status) {
			return res.status(400).json({
				message:
					paymentData.data.gateway_response || "transaction was not successful",
			});
		}

		res.locals.mwData = {
			paymentData: paymentData.data,
		};

		return res.status(200).json({
			message: "success",
		});
	}
}

export default PaymentCtr;
