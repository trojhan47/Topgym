/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc User login
   @access Public
 */

import validator from "validator";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import moment from "moment";

import mongoose from "../../../providers/Database";

import User from "../../../models/User";
import Log from "../../../middlewares/Log";
import Token from "../../../models/Token";
import Customer from "../../../models/Customer";
import Staff from "../../../models/Staff";
import Role from "../../../models/Role";

import Locals from "../../../providers/Locals";

import RedisService from "../../../services/Redis";
import Gen from "../../../utils/Gen";
import Check from "../../../utils/Check";

const ObjectId = mongoose.Types.ObjectId;
class Login {
	// public
	private static redisClient = RedisService.getInstance()
		.getBullOptions()
		.createClient();

	/**
   * Signin a Customer
   * @route POST /api/auth/signin-customer
   * customer
   */
	public static async customer(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		passport.authenticate("local", (err: any, user: any, info: any) => {
			if (err) {
				Log.error(err.message);
				return next(err);
			}
			if (!user) {
				return res.status(400).json({
					status: "Unauthorized",
					message: "Email or Password incorrect",
				});
			}

			req.login(user, async (err: any) => {
				let accessToken;
				let refreshToken;
				let customerDoc;
				let jwtPayload;
				let ipAddress;
				let device;
				let redisUser;
				let tokenDoc;
				let otpCode;

				if (err) {
					return res.status(400).json({
						message: err.message,
					});
				}

				try {
					customerDoc = await Customer.aggregate([
						{ $match: { user: new ObjectId(user._id) } },
						{
							$lookup: {
								from: "roles",
								localField: "role",
								foreignField: "_id",
								as: "role",
							},
						},
						{ $unwind: "$role" },
						{ $addFields: { role: "$role.name" } },
					]).exec();

					customerDoc = customerDoc[0];
				} catch (error: any) {
					return res.status(500).json({
						message: error.message,
					});
				}

				if (!customerDoc) {
					return res.status(400).json({
						message: "No such Customer",
					});
				}

				jwtPayload = {
					userRef: user._id,
					userType: user.type,
					role: customerDoc.role,
					customerRef: customerDoc._id,
				};

				refreshToken = jwt.sign(jwtPayload, Locals.config().jwtRefreshSecret, {
					expiresIn: Locals.config().refreshJwtExpiresIn,
				});

				accessToken = jwt.sign(
					Object.assign(jwtPayload, { refreshToken }),
					Locals.config().jwtAccessSecret,
					{
						expiresIn: Locals.config().accessJwtExpiresIn,
					}
				);

				ipAddress =
					((req.headers["x-forwarded-for"] as string) || "").split(",").pop() ||
					req.socket.remoteAddress ||
					"";

				device = req.headers["user-agent"] || "";

				try {
					redisUser = await Login.redisClient.get(user._id);

					if (redisUser && validator.isJSON(redisUser)) {
						redisUser = JSON.parse(redisUser);
					}
				} catch (error: any) {
					Log.error(`${error.message}`);

					return res.status(500).json({ message: error.message });
				}

				if (!Check.isNewLoginDevice(device, ipAddress, redisUser)) {
					try {
						await Login.redisClient.set(
							jwtPayload.userRef,
							JSON.stringify({
								refreshToken,
								knownClients: redisUser.knownClients,
								expiresAt: moment().add(30, "days").valueOf(),
							})
						);
					} catch (error: any) {
						Log.error(`${error.message}`);

						return res.status(500).json({ message: error.message });
					}

					return res.status(200).json({
						message: "successfully logged in",
						accessToken,
					});
				}

				//  start new device login verification
				otpCode = await Gen.generateOtpToken();

				try {
					tokenDoc = new Token({
						user: user._id,
						kind: "local",
						code: otpCode,
						expiresAt: moment().add(10, "minutes").valueOf(),
					});

					await tokenDoc.save();
				} catch (error: any) {
					Log.error(`${error.message}`);

					return res.status(500).json({ message: error.message });
				}

				// Prepare res.local variables
				res.locals.mwData = {
					userDoc: user,
					tokenDoc,
				};

				return res.status(200).json({
					message: "Please verify this device",
					status: "new_device_login_verification",
				});
			});
		})(req, res, next);
	}

	/**
   * Verify Token to prove user owns new device.
   * @route POST /api/auth/verify-signin-token/:code
   */
	public static async verifyNewDeviceLogin(req: Request, res: Response) {
		const { code = "" } = req.body;
		let tokenDoc;
		let userDoc;
		let accessToken;
		let refreshToken;
		let customerDoc;
		let staffDoc;
		let jwtPayload;
		let knownClients = [];
		let device;
		let ipAddress;
		let redisUser;

		try {
			tokenDoc = await Token.findOne({
				code,
				expiresAt: { $gt: new Date() },
			});

			if (!tokenDoc) {
				return res.status(400).json({ message: "Bad token" });
			}

			userDoc = await User.findOne({
				_id: tokenDoc.user,
			});

			if (!userDoc) {
				return res.status(400).json({ message: "Could not find account" });
			}

			// generate jwt tokens
			if (["Customer"].includes(userDoc.type)) {
				customerDoc = await Customer.aggregate([
					{ $match: { user: new ObjectId(userDoc._id) } },
					{
						$lookup: {
							from: "roles",
							localField: "role",
							foreignField: "_id",
							as: "role",
						},
					},
					{ $unwind: "$role" },
					{ $addFields: { role: "$role.name" } },
				]).exec();

				customerDoc = customerDoc[0];
			}

			if (["Staff"].includes(userDoc.type)) {
				staffDoc = await Staff.aggregate([
					{ $match: { user: new ObjectId(userDoc._id) } },
					{
						$lookup: {
							from: "roles",
							localField: "role",
							foreignField: "_id",
							as: "role",
						},
					},
					{ $unwind: "$role" },
					{ $addFields: { role: "$role.name" } },
				]).exec();

				staffDoc = staffDoc[0];
			}

			/*   if (["Partner"].includes(userDoc.type)) {
        partnerDoc = await Partner.aggregate([
          { $match: { user: new ObjectId(userDoc._id) } },
          {
            $lookup: {
              from: "roles",
              localField: "role",
              foreignField: "_id",
              as: "role",
            },
          },
          { $unwind: "$role" },
          { $addFields: { role: "$role.name" } },
        ]).exec();

        partnerDoc = partnerDoc[0];
      }

      if (["Driver"].includes(userDoc.type)) {
        driverDoc = await Driver.aggregate([
          { $match: { user: new ObjectId(userDoc._id) } },
          {
            $lookup: {
              from: "roles",
              localField: "role",
              foreignField: "_id",
              as: "role",
            },
          },
          { $unwind: "$role" },
          { $addFields: { role: "$role.name" } },
        ]).exec();

        driverDoc = driverDoc[0];
      }
      */

			jwtPayload = {
				count: 0,
				userRef: userDoc._id,
				userType: userDoc.type,
				role: ["Customer"].includes(userDoc.type)
					? customerDoc.role
					: /*					: ["Staff"].includes(userDoc.type)
					? staffDoc.role
          */
						staffDoc.role,
				customerRef: customerDoc ? customerDoc._id : undefined,
				// staffRef: staffDoc ? staffDoc._id : undefined,
			};

			refreshToken = jwt.sign(jwtPayload, Locals.config().jwtRefreshSecret, {
				expiresIn: Locals.config().refreshJwtExpiresIn,
			});

			accessToken = jwt.sign(
				Object.assign(jwtPayload, { refreshToken }),
				Locals.config().jwtAccessSecret,
				{
					expiresIn: Locals.config().accessJwtExpiresIn,
				}
			);

			ipAddress =
				((req.headers["x-forwarded-for"] as string) || "").split(",").pop() ||
				req.socket.remoteAddress ||
				"";

			device = req.headers["user-agent"] || "";

			redisUser = await Login.redisClient.get(userDoc._id);

			if (redisUser && validator.isJSON(redisUser)) {
				redisUser = JSON.parse(redisUser);
			}

			if (
				redisUser &&
				redisUser.knownClients &&
				Array.isArray(redisUser.knownClients) &&
				redisUser.knownClients.length > 0
			) {
				knownClients = redisUser.knownClients.push({ device, ip: ipAddress });
			} else {
				knownClients = [{ device, ip: ipAddress }];
			}

			await Login.redisClient.set(
				jwtPayload.userRef,
				JSON.stringify({
					refreshToken,
					knownClients,
					expiresAt: moment().add(30, "days").valueOf(),
				})
			);

			// delete tokenDoc
			await tokenDoc.remove();
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}

		return res.status(200).json({
			message: "successfully logged in",
			accessToken,
		});
	}
}

export default Login;
