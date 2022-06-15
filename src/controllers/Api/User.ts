import { Request, Response } from "express";
import validator from "validator";

import mongoose from "../../providers/Database";

import User from "../../models/User";
import MediaDBQuery from "../../queries/Media";
import RoleDBQuery from "../../queries/Role";
import Log from "../../middlewares/Log";

const ObjectId = mongoose.Types.ObjectId;

class UserCtr {
	/**
	 * getAccount
	 */
	public static async getAccount(req: Request, res: Response) {
		const { userRef, userType } = res.locals.user;

		let userDoc: any;
		try {
			switch (userType) {
				case "Staff": {
					userDoc = await UserCtr.getStaffAccount(userRef);
					break;
				}
				case "Customer": {
					userDoc = await UserCtr.getCustomerAccount(userRef);
					break;
				}

				default:
					break;
			}
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}

		if (!userDoc) {
			return res.status(400).json({
				message: "No userDoc found",
			});
		}

		return res.status(200).json(userDoc);
	}

	/**
	 * Get Staff Data
	 * @param userRef
	 * @returns  userDoc/ error
	 */
	private static async getStaffAccount(userRef: any) {
		let userDoc: any;

		try {
			userDoc = await User.aggregate([
				{
					$match: { _id: new ObjectId(userRef) },
				},

				{ $project: { hash: 0, salt: 0 } },
				...MediaDBQuery.join("avatar", "avatar"),
				{
					$lookup: {
						from: "staff",
						let: { userRef: "$_id" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$user", "$$userRef"] },
								},
							},
						],

						as: "staff",
					},
				},
				{
					$unwind: {
						path: "$staff",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$addFields: {
						staffRef: "$staff._id",
						staffPublicRef: "$staff.ref",
						role: "$staff.role",
					},
				},

				{
					$project: { staff: 0 },
				},

				...RoleDBQuery.join(),
				{ $addFields: { role: "$role.name" } },
			]).exec();
		} catch (error: any) {
			return Promise.reject(error.message);
		}

		if (!userDoc) {
			return Promise.reject("No user Doc found");
		}

		return Promise.resolve(userDoc);
	}

	/**
	 * Get customer Data
	 * @param userRef
	 * @returns  userDoc/ error
	 */
	private static async getCustomerAccount(userRef: any) {
		let userDoc: any;

		try {
			userDoc = await User.aggregate([
				{
					$match: { _id: new ObjectId(userRef) },
				},

				{ $project: { hash: 0, salt: 0 } },
				...MediaDBQuery.join("avatar", "avatar"),
				{
					$lookup: {
						from: "customers",
						let: { userRef: "$_id" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$user", "$$userRef"] },
								},
							},
						],

						as: "customer",
					},
				},
				{
					$unwind: {
						path: "$customer",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$addFields: {
						customerRef: "$customer._id",
						customerPublicRef: "$customer.ref",
						role: "$customer.role",
					},
				},

				{
					$project: { customer: 0 },
				},

				...RoleDBQuery.join(),
				{ $addFields: { role: "$role.name" } },
			]).exec();
		} catch (error: any) {
			return Promise.reject(error.message);
		}

		if (!userDoc) {
			return Promise.reject("No user Doc found");
		}

		return Promise.resolve(userDoc);
	}
}

export default UserCtr;
