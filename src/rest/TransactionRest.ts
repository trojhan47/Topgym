import validator from "validator";

import ITransaction from "../interfaces/models/transaction";

import Transaction from "../models/Transaction";
import Customer from "../models/Customer";
// import Partner from "../models/Partner";

import Gen from "../utils/Gen";
import Log from "../middlewares/Log";

export default class TransactionRest {
	public static async createCredit({
		account,
		accountType,
		paystackRef,
		amount,
		meta,
	}: ITransaction) {
		let transactionDoc: any;
		const transactionObj: any = {};

		if (
			!paystackRef ||
			validator.isEmpty(paystackRef as string, { ignore_whitespace: true })
		) {
			return Promise.reject("paystackRef is required");
		}

		transactionObj.ref = await Gen.generateTransactionRef();
		transactionObj.account = account;
		transactionObj.accountType = accountType;
		transactionObj.type = "credit";
		transactionObj.paystackRef = paystackRef;
		transactionObj.amount = amount;

		if (meta) {
			transactionObj.meta = meta;
		}

		try {
			transactionDoc = new Transaction(transactionObj);

			await transactionDoc.save();

			// add value of transaction to accountType balance
			switch (accountType) {
				case "Customer": {
					await Customer.updateOne(
						{ _id: account },
						{ $inc: { balance: amount } }
					);
					break;
				}
				/*
				case "Partner": {
					await Partner.updateOne(
						{ _id: account },
						{ $inc: { balance: amount } }
					);
					break;
				}

        */

				default:
					break;
			}
		} catch (error: any) {
			return Promise.reject(error);
		}

		return Promise.resolve(transactionDoc);
	}

	public static async createDebit({
		account,
		accountType,
		amount,
		meta,
	}: ITransaction) {
		let transactionDoc: any;
		const transactionObj: any = {};

		transactionObj.ref = await Gen.generateTransactionRef();
		transactionObj.account = account;
		transactionObj.accountType = accountType;
		transactionObj.type = "debit";
		transactionObj.amount = amount;

		if (meta) {
			transactionObj.meta = meta;
		}

		try {
			transactionDoc = new Transaction(transactionObj);

			await transactionDoc.save();

			// add value of tranasaction to accountType balance
			switch (accountType) {
				case "Customer": {
					await Customer.updateOne(
						{ _id: account },
						{ $inc: { balance: -amount } }
					);
					break;
				}
				/*
				case "Partner": {
					await Partner.updateOne(
						{ _id: account },
						{ $inc: { balance: -amount } }
					);
					break;
				}
*/
				default:
					break;
			}
		} catch (error: any) {
			return Promise.reject(error);
		}

		return Promise.resolve(transactionDoc);
	}
}
